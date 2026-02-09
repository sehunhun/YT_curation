
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen max-w-5xl mx-auto">
      {/* Hero 섹션 전용 오버레이 - 텍스트 가독성 향상 (투명도 감소) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/15 to-transparent pointer-events-none" />
      
      {/* 콘텐츠를 오버레이 위에 배치 */}
      <div className="relative z-10 w-full flex flex-col items-center">
      {/* Label and Input */}
      <div className="w-full max-w-xl mb-16 space-y-6">
        <h5 className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">
          Curated Daily
        </h5>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all shadow-2xl">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-6 py-3 text-lg font-light"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/30 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] mb-8 tracking-tight text-white/90">
        You don't need more time.
        <br />
        You need better information.
        <br />
        <span className="font-bold text-primary inline-block">선별된 부업 강의 영상</span>을 매일 받아보세요. 더 빠르게 배우고, 더 빨리 수익화 하세요.
      </h1>

      {/* 통계 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
        {/* 보유 채널 수 */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
            <div className="text-sm md:text-base text-gray-400 font-light">보유 채널 수</div>
          </div>
        </div>

        {/* 시간 절약 */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">10시간</div>
            <div className="text-sm md:text-base text-gray-400 font-light">주당 절약 시간</div>
          </div>
        </div>

        {/* 매주 요약되는 영상 수 */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
            <div className="text-sm md:text-base text-gray-400 font-light">매주 요약 영상</div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
