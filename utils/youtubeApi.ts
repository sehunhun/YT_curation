/**
 * Google API 클라이언트 초기화
 */
export function loadClient(apiKey?: string): Promise<void> {
  const key = apiKey || import.meta.env.VITE_YOUTUBE_API_KEY;
  
  if (!key) {
    return Promise.reject(new Error('YouTube API key is required'));
  }

  return new Promise((resolve, reject) => {
    (window as any).gapi.client.setApiKey(key);
    (window as any).gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then(
        () => {
          console.log('GAPI client loaded for API');
          resolve();
        },
        (err: any) => {
          console.error('Error loading GAPI client for API', err);
          reject(err);
        }
      );
  });
}

/**
 * YouTube 채널 정보 조회
 */
export function execute(channelId: string) {
  return (window as any).gapi.client.youtube.channels
    .list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: [channelId],
    })
    .then(
      (response: any) => {
        console.log('Response', response);
        return response;
      },
      (err: any) => {
        console.error('Execute error', err);
        throw err;
      }
    );
}

/**
 * 채널 검색
 */
export async function searchChannels(query: string, maxResults: number = 50): Promise<any[]> {
  const allResults: any[] = [];
  let nextPageToken: string | undefined;

  do {
    const response = await (window as any).gapi.client.youtube.search.list({
      part: ['snippet'],
      q: query,
      type: 'channel',
      maxResults: Math.min(maxResults - allResults.length, 50),
      pageToken: nextPageToken,
    });

    if (response.result.items) {
      allResults.push(...response.result.items);
    }

    nextPageToken = response.result.nextPageToken;
  } while (nextPageToken && allResults.length < maxResults);

  return allResults;
}

/**
 * 채널 상세 정보 조회 (여러 채널)
 */
export async function getChannelsDetails(channelIds: string[]): Promise<any[]> {
  const allChannels: any[] = [];
  const batchSize = 50; // YouTube API는 한 번에 최대 50개까지 조회 가능

  for (let i = 0; i < channelIds.length; i += batchSize) {
    const batch = channelIds.slice(i, i + batchSize);
    const response = await (window as any).gapi.client.youtube.channels.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: batch,
    });

    if (response.result.items) {
      allChannels.push(...response.result.items);
    }
  }

  return allChannels;
}

/**
 * 채널의 업로드된 동영상 목록 조회
 */
export async function getChannelVideos(
  uploadsPlaylistId: string,
  maxResults: number = 10
): Promise<any[]> {
  const response = await (window as any).gapi.client.youtube.playlistItems.list({
    part: ['snippet'],
    playlistId: uploadsPlaylistId,
    maxResults: maxResults,
  });

  return response.result.items || [];
}
