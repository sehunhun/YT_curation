/**
 * YouTube API로 video 검색하여 carousel 테이블에 삽입하는 스크립트
 * 
 * 사용법:
 *   npm run populate-carousel
 * 
 * 또는:
 *   npx tsx scripts/populate-carousel.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 환경 변수 로드 (ESM 방식)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv() {
  try {
    const envFile = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const envVars: Record<string, string> = {};
    envFile.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    return envVars;
  } catch (error) {
    return {};
  }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_PROJECT_URL || process.env.VITE_SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.');
  console.error('   .env 파일에 VITE_SUPABASE_PROJECT_URL과 VITE_SUPABASE_ANON_KEY를 설정해주세요.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const YOUTUBE_API_KEY = env.VITE_YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;
const SEARCH_QUERY = '부업';
const MAX_RESULTS = 50;

interface YouTubeVideoSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
      default: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

/**
 * YouTube API로 video 검색
 */
async function searchVideos(query: string, maxResults: number = 50): Promise<YouTubeVideoSearchResult[]> {
  const allResults: YouTubeVideoSearchResult[] = [];
  let nextPageToken: string | undefined;

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', query);
    url.searchParams.set('type', 'video');
    url.searchParams.set('order', 'relevance');
    url.searchParams.set('maxResults', Math.min(maxResults - allResults.length, 50).toString());
    url.searchParams.set('key', YOUTUBE_API_KEY!);
    if (nextPageToken) {
      url.searchParams.set('pageToken', nextPageToken);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`YouTube API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    if (data.items) {
      allResults.push(...data.items);
    }

    nextPageToken = data.nextPageToken;
  } while (nextPageToken && allResults.length < maxResults);

  return allResults.slice(0, maxResults);
}

/**
 * ISO 8601 duration 형식을 초 단위로 변환 (예: PT1M30S -> 90)
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

interface VideoDetail {
  hasCaptions: boolean;
  duration: number; // 초 단위
}

/**
 * YouTube API로 video 상세 정보 조회 (자막 정보 및 duration 포함)
 */
async function getVideoDetails(videoIds: string[]): Promise<Record<string, VideoDetail>> {
  const videoDetailsMap: Record<string, VideoDetail> = {};
  const batchSize = 50; // YouTube API는 한 번에 최대 50개까지 조회 가능

  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'contentDetails');
    url.searchParams.set('id', batch.join(','));
    url.searchParams.set('key', YOUTUBE_API_KEY!);

    const response = await fetch(url.toString());
    if (!response.ok) {
      const error = await response.json();
      console.warn(`⚠️ Video 상세 정보 조회 실패: ${JSON.stringify(error)}`);
      continue;
    }

    const data = await response.json();
    if (data.items) {
      data.items.forEach((item: any) => {
        const duration = parseDuration(item.contentDetails?.duration || 'PT0S');
        videoDetailsMap[item.id] = {
          hasCaptions: item.contentDetails?.caption === 'true',
          duration: duration,
        };
      });
    }
  }

  return videoDetailsMap;
}

/**
 * Supabase에 carousel 데이터 삽입
 */
async function insertCarouselItems(videos: YouTubeVideoSearchResult[]): Promise<void> {
  // 자막 정보 및 duration 가져오기
  console.log('📹 Video 상세 정보 조회 중 (자막 정보 및 duration 포함)...');
  const videoIds = videos.map((v) => v.id.videoId);
  const videoDetailsMap = await getVideoDetails(videoIds);

  // 3분(180초) 이하인 영상 필터링 (Shorts 제외)
  const MAX_DURATION_SECONDS = 180; // 3분
  const filteredVideos = videos.filter((video) => {
    const details = videoDetailsMap[video.id.videoId];
    if (!details) {
      // duration 정보를 가져오지 못한 경우 포함하지 않음
      return false;
    }
    return details.duration > MAX_DURATION_SECONDS;
  });

  console.log(`📊 ${videos.length}개 중 ${filteredVideos.length}개 영상이 3분 초과 (Shorts 제외됨: ${videos.length - filteredVideos.length}개)`);

  const carouselData = filteredVideos.map((video) => ({
    video_id: video.id.videoId,
    thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
    title: video.snippet.title,
    channel_name: video.snippet.channelTitle,
    published_at: video.snippet.publishedAt.split('T')[0], // YYYY-MM-DD 형식으로 변환
    has_captions: videoDetailsMap[video.id.videoId]?.hasCaptions || false, // 자막 유무
  }));

  // 중복 체크를 위해 기존 video_id 조회
  const existingVideoIds = await supabase
    .from('carousel')
    .select('video_id')
    .in('video_id', carouselData.map((item) => item.video_id));

  const existingIdsSet = new Set(
    existingVideoIds.data?.map((item) => item.video_id) || []
  );

  // 중복되지 않는 항목만 필터링
  const newItems = carouselData.filter((item) => !existingIdsSet.has(item.video_id));

  if (newItems.length === 0) {
    console.log('✅ 모든 항목이 이미 데이터베이스에 존재합니다.');
    return;
  }

  // 배치로 삽입 (Supabase는 한 번에 최대 1000개까지 삽입 가능)
  const batchSize = 50;
  for (let i = 0; i < newItems.length; i += batchSize) {
    const batch = newItems.slice(i, i + batchSize);
    const { data, error } = await supabase.from('carousel').insert(batch).select();

    if (error) {
      console.error(`❌ 배치 ${Math.floor(i / batchSize) + 1} 삽입 실패:`, error);
    } else {
      console.log(`✅ 배치 ${Math.floor(i / batchSize) + 1}: ${batch.length}개 항목 삽입 완료`);
    }
  }

  console.log(`\n✅ 총 ${newItems.length}개의 새로운 항목이 carousel 테이블에 삽입되었습니다.`);
}

/**
 * 메인 함수
 */
async function main() {
  if (!YOUTUBE_API_KEY) {
    console.error('❌ YouTube API Key가 설정되지 않았습니다.');
    console.error('   .env 파일에 VITE_YOUTUBE_API_KEY 또는 YOUTUBE_API_KEY를 설정해주세요.');
    process.exit(1);
  }

  console.log(`🔍 검색어 "${SEARCH_QUERY}"로 YouTube video 검색 중... (최대 ${MAX_RESULTS}개)`);
  
  try {
    const videos = await searchVideos(SEARCH_QUERY, MAX_RESULTS);
    console.log(`✅ ${videos.length}개의 video를 찾았습니다.`);

    console.log('\n📝 carousel 테이블에 데이터 삽입 중...');
    await insertCarouselItems(videos);

    console.log('\n✨ 작업 완료!');
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

main();
