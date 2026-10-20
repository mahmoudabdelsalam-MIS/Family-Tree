import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavArrowButton from '../../shared/button/NavArrowButton';

export default function ImageBannerSlider({ heroSlides = [] }) {
  // لو مفيش بيانات، منع_render_ عشان متظهرش مساحة فاضية
  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  const hasMultipleSlides = heroSlides.length > 1;

  return (
    <div dir="rtl" className="relative w-full max-w-7xl mx-auto my-6 px-4 md:px-8">
      {/* حاوية السلايدر */}
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={hasMultipleSlides} // الـ loop يشتغل بس لو فيه أكتر من سلايد
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={hasMultipleSlides ? {
          nextEl: '.swiper-button-next-banner',
          prevEl: '.swiper-button-prev-banner',
        } : false}
        pagination={hasMultipleSlides ? { clickable: true } : false}
        className="rounded-3xl md:rounded-4xl overflow-hidden shadow-lg w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* حاوية الميديا: relative عشان نقدر نحط النص فوقها لو احتجنا */}
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-3xl bg-gray-100">
              
              {/* 1. التحقق لو الميديا فيديو */}
              {slide.mediaType === 'video' ? (
                <video
                  src={slide.mediaUrl}
                  poster={slide.posterUrl || ''}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                /* 2. الافتراضي: صورة */
                <img 
                  src={slide.mediaUrl} 
                  alt={slide.title || 'Banner slide'} 
                  className="w-full h-full object-cover object-center"
                />
              )}

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار التنقل: تظهر فقط لو فيه أكتر من سلايد واحد */}
      {hasMultipleSlides && (
        <>
          {/* زر التالي (اليمين في RTL) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-6 md:-right-6 z-20 cursor-pointer swiper-button-next-banner">
            <NavArrowButton type="next" />
          </div>

          {/* زر السابق (اليسار في RTL) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-6 md:-left-6 z-20 cursor-pointer swiper-button-prev-banner">
            <NavArrowButton type="prev" />
          </div>
        </>
      )}
    </div>
  );
}