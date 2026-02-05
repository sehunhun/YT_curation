
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
        Revolutionizing the way you consume service.
        <br />
        <span className="font-bold text-primary inline-block">Tailored insights</span>,
        delivered daily.
        <br />
        <span className="block mt-2">
          Experience the minimalist approach to information.
        </span>
      </h1>

      <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
        Join <span className="text-white font-medium">50,000+ professionals</span> who start their day with a clear, concise, and focused perspective.
      </p>
      </div>
    </section>
  );
};

export default Hero;
