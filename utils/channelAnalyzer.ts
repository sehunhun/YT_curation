/**
 * 채널 분석 유틸리티
 */

import { ChannelInfo, YouTubeChannel, YouTubeVideo } from '../types/channel';
import { searchChannels, getChannelsDetails, getChannelVideos } from './youtubeApi';

const MIN_SUBSCRIBER_COUNT = 2000;

/**
 * 구독자 수가 기준 이상인 채널만 필터링
 */
function filterChannelsBySubscriberCount(
  channels: YouTubeChannel[],
  minCount: number = MIN_SUBSCRIBER_COUNT
): YouTubeChannel[] {
  return channels.filter((channel) => {
    const subscriberCount = parseInt(channel.statistics?.subscriberCount || '0', 10);
    return subscriberCount >= minCount;
  });
}

/**
 * 최근 동영상들의 평균 업로드 주기 계산 (일 단위)
 */
function calculateAverageUploadInterval(videos: YouTubeVideo[]): number | null {
  if (videos.length < 2) {
    return null;
  }

  // 날짜순으로 정렬 (최신순)
  const sortedVideos = [...videos].sort((a, b) => {
    const dateA = new Date(a.snippet.publishedAt).getTime();
    const dateB = new Date(b.snippet.publishedAt).getTime();
    return dateB - dateA;
  });

  // 인접한 동영상들 간의 간격 계산
  const intervals: number[] = [];
  for (let i = 0; i < sortedVideos.length - 1; i++) {
    const date1 = new Date(sortedVideos[i].snippet.publishedAt).getTime();
    const date2 = new Date(sortedVideos[i + 1].snippet.publishedAt).getTime();
    const intervalDays = (date1 - date2) / (1000 * 60 * 60 * 24);
    intervals.push(intervalDays);
  }

  // 평균 계산
  const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
  return Math.round(averageInterval * 10) / 10; // 소수점 첫째 자리까지
}

/**
 * 채널의 마지막 업로드일 조회
 */
function getLastUploadDate(videos: YouTubeVideo[]): string | null {
  if (videos.length === 0) {
    return null;
  }

  const sortedVideos = [...videos].sort((a, b) => {
    const dateA = new Date(a.snippet.publishedAt).getTime();
    const dateB = new Date(b.snippet.publishedAt).getTime();
    return dateB - dateA;
  });

  return sortedVideos[0].snippet.publishedAt;
}

/**
 * 채널 링크 생성
 */
function getChannelLink(channel: YouTubeChannel): string {
  const customUrl = channel.snippet?.customUrl;
  if (customUrl) {
    return `https://www.youtube.com/${customUrl}`;
  }
  return `https://www.youtube.com/channel/${channel.id}`;
}

/**
 * 채널 정보를 ChannelInfo 형식으로 변환
 */
async function convertToChannelInfo(channel: YouTubeChannel): Promise<ChannelInfo> {
  // 업로드된 동영상 목록 조회를 위해 contentDetails.relatedPlaylists.uploads 필요
  // 채널 상세 정보에서 가져와야 함
  const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

  let lastUploadDate: string | null = null;
  let averageUploadInterval: number | null = null;

  if (uploadsPlaylistId) {
    try {
      const videos = await getChannelVideos(uploadsPlaylistId, 10);
      lastUploadDate = getLastUploadDate(videos);
      averageUploadInterval = calculateAverageUploadInterval(videos);
    } catch (error) {
      console.error(`Failed to get videos for channel ${channel.id}:`, error);
    }
  }

  return {
    id: channel.id,
    title: channel.snippet.title,
    subscriberCount: parseInt(channel.statistics.subscriberCount || '0', 10),
    channelLink: getChannelLink(channel),
    lastUploadDate,
    averageUploadInterval,
  };
}

/**
 * 검색어로 채널을 검색하고 분석
 */
export async function analyzeChannelsBySearch(query: string): Promise<ChannelInfo[]> {
  try {
    // 1. 채널 검색
    console.log(`검색어 "${query}"로 채널 검색 중...`);
    const searchResults = await searchChannels(query, 50);
    const channelIds = searchResults.map((result) => result.id.channelId);

    if (channelIds.length === 0) {
      console.log('검색 결과가 없습니다.');
      return [];
    }

    console.log(`${channelIds.length}개의 채널을 찾았습니다.`);

    // 2. 채널 상세 정보 조회
    console.log('채널 상세 정보 조회 중...');
    const channels = await getChannelsDetails(channelIds);

    // 3. 구독자 수 필터링
    console.log(`구독자 수 ${MIN_SUBSCRIBER_COUNT} 이상인 채널 필터링 중...`);
    const filteredChannels = filterChannelsBySubscriberCount(channels, MIN_SUBSCRIBER_COUNT);
    console.log(`${filteredChannels.length}개의 채널이 기준을 만족합니다.`);

    // 4. 각 채널의 추가 정보 수집 (업로드 주기 등)
    console.log('채널별 상세 정보 수집 중...');
    const channelInfos: ChannelInfo[] = [];

    for (let i = 0; i < filteredChannels.length; i++) {
      const channel = filteredChannels[i];
      console.log(`[${i + 1}/${filteredChannels.length}] ${channel.snippet.title} 분석 중...`);
      
      try {
        const channelInfo = await convertToChannelInfo(channel);
        channelInfos.push(channelInfo);
      } catch (error) {
        console.error(`채널 ${channel.id} 분석 실패:`, error);
      }

      // API 할당량을 고려하여 약간의 지연 추가
      if (i < filteredChannels.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return channelInfos;
  } catch (error) {
    console.error('채널 분석 중 오류 발생:', error);
    throw error;
  }
}
