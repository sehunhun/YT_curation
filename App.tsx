
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
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <InfiniteCarousel />
      </main>

      <Footer />
    </div>
  );
};

export default App;
