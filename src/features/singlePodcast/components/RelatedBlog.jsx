import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SingleProductCard from '../../shared/cards/SingleProductCard';
import NavArrowButton from '../../shared/button/NavArrowButton';
import Skeleton from '../../shared/skeleton/Skeleton';
import CardSkeleton from '../../shared/skeleton/CardSkeleton';

// skeleton لقسم "المزيد من..." (العنوان + 3 كروت، وبيقل العدد على الشاشات الصغيرة زي السلايدر)
export function RelatedPostsSkeleton() {
  return (
    <div dir="rtl" className='flex flex-col items-start gap-8 w-full max-w-7xl mx-auto px-4 py-8'>
      <Skeleton rounded="rounded-md" className="h-9 w-56" />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full'>
        <CardSkeleton />
        <CardSkeleton className="hidden sm:block" />
        <CardSkeleton className="hidden md:block" />
      </div>
    </div>
  );
}

export default function RelatedPosts({ posts = [], title = "" }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!posts || posts.length === 0) return null;

  const showArrows = posts.length > 3;

  const syncEdges = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div dir="rtl" className='flex flex-col justify-center items-start font-bold text-black gap-8 w-full max-w-7xl mx-auto px-4 py-8'>
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl md:text-3xl font-bold">
          المزيد من <span className='text-primary'>{title}</span>
        </h3>

        {showArrows && (
          <div dir="ltr" className="flex items-center gap-2">
            <div className={isEnd ? 'opacity-40 pointer-events-none' : ''}>
              <NavArrowButton type="prev" onClick={() => swiperRef.current?.slideNext()} />
            </div>
            <div className={isBeginning ? 'opacity-40 pointer-events-none' : ''}>
              <NavArrowButton type="next" onClick={() => swiperRef.current?.slidePrev()} />
            </div>
          </div>
        )}
      </div>

      <Swiper
        dir="rtl"
        onSwiper={(swiper) => { swiperRef.current = swiper; syncEdges(swiper); }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {posts.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto">
            <SingleProductCard
              image={item.imageUrl || ''}
              title={item.title}
              date={item.date}
              time={item.publishedTime || ''}
              isMedia={item.hasVideo}
              href={item.postType === 'podcast' ? `/podcast/${item.id}` : `/news/${item.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}