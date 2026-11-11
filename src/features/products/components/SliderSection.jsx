import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavArrowButton from '../../shared/button/NavArrowButton';

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?.*)?$/i;

// تحديد نوع ميديا السلايد: صورة (وده بيشمل الـ GIF المتحرك) أو فيديو
// الأولوية لامتداد الرابط (لأنه أدق)، وبعدها mediaType اللي جاي من الباك
// ولو مفيش رابط ميديا (زي فيديو لسه ما اترفعش) بنستخدم posterUrl كصورة
const resolveSlideMedia = (slide) => {
  const url = slide?.mediaUrl;

  if (url) {
    if (VIDEO_EXT.test(url)) return { type: 'video', src: url, poster: slide.posterUrl || '' };
    if (IMAGE_EXT.test(url)) return { type: 'image', src: url };
    if (slide?.mediaType === 'video') return { type: 'video', src: url, poster: slide.posterUrl || '' };
    return { type: 'image', src: url };
  }

  if (slide?.posterUrl) return { type: 'image', src: slide.posterUrl };
  return null;
};

export default function ImageBannerSlider({ heroSlides = [] }) {
  const swiperRef = useRef(null);

  // السلايدات اللي ليها ميديا فعلاً (صورة أو gif أو فيديو)
  const slides = (Array.isArray(heroSlides) ? heroSlides : [])
    .filter(Boolean)
    .map((slide) => ({ slide, media: resolveSlideMedia(slide) }))
    .filter((item) => item.media);

  // لو مفيش بيانات، منع_render_ عشان متظهرش مساحة فاضية
  if (slides.length === 0) {
    return null;
  }

  const hasMultipleSlides = slides.length > 1;

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
        {slides.map(({ slide, media }, index) => (
          <SwiperSlide key={slide.id ?? index}>
            {/* حاوية الميديا: relative عشان نقدر نحط النص فوقها لو احتجنا */}
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-3xl bg-gray-100">

              {/* 1. التحقق لو الميديا فيديو */}
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  poster={media.poster}
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
                /* 2. الافتراضي: صورة (والـ GIF بيتحرك لوحده لأنه <img>) */
                <img
                  src={media.src}
                  alt={slide.title || 'Banner slide'}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* النص فوق الميديا (title / subtitle / caption): بيظهر بس لو الباك بعت أي حاجة منهم
                  ومعاه ظل من تحت لفوق عشان النص يبان، ولو مفيش نص مفيش ظل */}
              {(slide.title || slide.subtitle || slide.caption) && (
                <>
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  <div className={`absolute inset-x-0 bottom-0 z-10 px-5 md:px-8 pt-6 text-right text-white pointer-events-none ${hasMultipleSlides ? 'pb-10 md:pb-12' : 'pb-5 md:pb-8'}`}>
                    {slide.title && (
                      <h2 className="text-xl md:text-3xl font-bold leading-tight">{slide.title}</h2>
                    )}
                    {slide.subtitle && (
                      <p className="mt-1 text-sm md:text-lg font-medium text-white/90">{slide.subtitle}</p>
                    )}
                    {slide.caption && (
                      <p className="mt-1 text-xs md:text-base font-light text-white/80">{slide.caption}</p>
                    )}
                  </div>
                </>
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