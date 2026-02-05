
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteCarousel from './components/InfiniteCarousel';
import Footer from './components/Footer';
import { loadClient, execute } from './utils/youtubeApi';

const App: React.FC = () => {
  useEffect(() => {
    // Google API 클라이언트 로드 및 초기화
    (window as any).gapi?.load('client', async () => {
      try {
        await loadClient();
        
        // 채널 정보 조회 테스트
        const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
        const response = await execute(channelId);
        console.log('Response', response.result);
      } catch (error) {
        console.error('YouTube API Error:', error);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-white">
      {/* 배경 이미지 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* 어두운 오버레이 - 전체 배경을 약간 어둡게 */}
        <div className="absolute inset-0 bg-background/70" />
        
        {/* 그라데이션 오버레이 - 상단과 하단을 더 어둡게 */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
        
        {/* 중앙 영역 보호 - 텍스트가 배치될 영역을 더 어둡게 */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <InfiniteCarousel />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
