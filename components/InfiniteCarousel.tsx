import React, { useEffect, useState } from 'react';
import { supabase, CarouselRow } from '../utils/supabase';
import { CarouselItem } from '../types';

const InfiniteCarousel: React.FC = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('Error fetching carousel items:', error);
          return;
        }

        if (data) {
          const carouselItems: CarouselItem[] = data.map((row: CarouselRow) => ({
            id: row.id.toString(),
            video_id: row.video_id,
            thumbnail: row.thumbnail,
            title: row.title,
            channel_name: row.channel_name,
            published_at: row.published_at,
          }));
          setItems(carouselItems);
        }
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Triple the items to ensure seamless scrolling on large screens
  const tripledItems = [...items, ...items, ...items];

  if (loading) {
    return (
      <section className="w-full py-16 overflow-hidden">
        <div className="flex flex-col items-center mb-12">
          <span className="bg-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase py-1 px-4 rounded-full border border-primary/20 mb-4">
            Explore the Archive
          </span>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="w-full py-16 overflow-hidden">
        <div className="flex flex-col items-center mb-12">
          <span className="bg-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase py-1 px-4 rounded-full border border-primary/20 mb-4">
            Explore the Archive
          </span>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-400">표시할 항목이 없습니다.</p>
        </div>
      </section>
    );
  }

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
          {tripledItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] md:w-[380px] group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-card border border-white/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30 shadow-xl group-hover:shadow-primary/20">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="px-1">
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{item.channel_name}</span>
                  <span>{formatDate(item.published_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteCarousel;
