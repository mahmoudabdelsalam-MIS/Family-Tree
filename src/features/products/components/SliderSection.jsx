import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavArrowButton from '../../shared/button/NavArrowButton';

// الميديا فيديو لو الباك بعت mediaType = video، أو لو الرابط نفسه بينتهي بامتداد فيديو (احتياطي)
const isVideoSlide = (slide) =>
  slide?.mediaType === 'video' || /\.(mp4|webm|mov)(\?.*)?$/i.test(slide?.mediaUrl || '');

export default function ImageBannerSlider({ heroSlides = [] }) {
  const swiperRef = useRef(null);

  // لو مفيش بيانات، منع_render_ عشان متظهرش مساحة فاضية
  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  const hasMultipleSlides = heroSlides.length > 1;

  // بيظبط الـ autoplay حسب السلايد الحالي:
  // - صورة: الـ autoplay شغال وبيقلب بعد 4 ثواني
  // - فيديو: الـ autoplay بيقف، الفيديو بيشتغل من الأول، ولما يخلص بينقل للي بعده
  const syncAutoplay = (swiper) => {
    if (!swiper || swiper.destroyed || !hasMultipleSlides) return;

    const activeEl = swiper.slides[swiper.activeIndex];

    // إيقاف أي فيديو تاني مش هو السلايد الحالي
    swiper.slides.forEach((el) => {
      const v = el.querySelector('video');
      if (v && el !== activeEl) v.pause();
    });

    const activeVideo = activeEl?.querySelector('video');

    if (activeVideo) {
      swiper.autoplay.stop();
      activeVideo.currentTime = 0;
      const playPromise = activeVideo.play();
      // لو المتصفح منع التشغيل التلقائي، منسيبش السلايدر واقف
      if (playPromise?.catch) {
        playPromise.catch(() => swiper.autoplay.start());
      }
    } else {
      swiper.autoplay.start();
    }
  };

  const goNext = () => swiperRef.current?.slideNext();

  return (
    <div dir="rtl" className="relative w-full max-w-7xl mx-auto my-6 px-4 md:px-8">
      {/* حاوية السلايدر */}
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={hasMultipleSlides} // الـ loop يشتغل بس لو فيه أكتر من سلايد
        autoplay={hasMultipleSlides ? { delay: 4000, disableOnInteraction: false } : false}
        navigation={hasMultipleSlides ? {
          nextEl: '.swiper-button-next-banner',
          prevEl: '.swiper-button-prev-banner',
        } : false}
        pagination={hasMultipleSlides ? { clickable: true } : false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // بعد ما السلايدر يجهز، نظبط الـ autoplay لو أول سلايد فيديو
          setTimeout(() => syncAutoplay(swiper), 0);
        }}
        onSlideChange={syncAutoplay}
        className="rounded-3xl md:rounded-4xl overflow-hidden shadow-lg w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id ?? index}>
            {/* حاوية الميديا: relative عشان نقدر نحط النص فوقها لو احتجنا */}
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-3xl bg-gray-100">

              {/* 1. التحقق لو الميديا فيديو */}
              {isVideoSlide(slide) ? (
                <video
                  src={slide.mediaUrl}
                  poster={slide.posterUrl || ''}
                  muted
                  playsInline
                  preload="auto"
                  // سلايد واحد: الفيديو يلف لوحده. أكتر من سلايد: يخلص وينقل للي بعده
                  autoPlay={!hasMultipleSlides}
                  loop={!hasMultipleSlides}
                  onEnded={hasMultipleSlides ? goNext : undefined}
                  // لو الفيديو فشل يتحمل منسيبش السلايدر واقف عليه
                  onError={hasMultipleSlides ? goNext : undefined}
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