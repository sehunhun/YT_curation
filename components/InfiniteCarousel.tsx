
import React from 'react';
import { CAROUSEL_ITEMS } from '../constants';

const InfiniteCarousel: React.FC = () => {
  // Triple the items to ensure seamless scrolling on large screens
  const items = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="flex flex-col items-center mb-12">
        <span className="bg-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase py-1 px-4 rounded-full border border-primary/20 mb-4">
          Explore the Archive
        </span>
      </div>

      <div className="relative w-full">
        {/* Gradients for soft edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 hidden lg:block" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 hidden lg:block" />

        <div className="flex animate-infinite-scroll w-max gap-6 px-6">
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] md:w-[380px] group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-card border border-white/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30 shadow-xl group-hover:shadow-primary/20">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="px-1">
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteCarousel;
