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
