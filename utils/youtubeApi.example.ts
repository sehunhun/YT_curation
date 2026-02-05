/**
 * YouTube API 사용 예시
 * 참고: index.html에 <script src="https://apis.google.com/js/api.js"></script> 추가 필요
 * .env 파일에 VITE_YOUTUBE_API_KEY 설정 필요
 */

import { loadClient, execute } from './youtubeApi';

// Google API 클라이언트 로드 및 초기화
// 환경 변수에서 자동으로 API 키를 읽어옴 (.env의 VITE_YOUTUBE_API_KEY)
(window as any).gapi.load('client', async () => {
  await loadClient();
});

// 채널 정보 조회
async function getChannel() {
  const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
  const response = await execute(channelId);
  console.log('Response', response.result);
}
