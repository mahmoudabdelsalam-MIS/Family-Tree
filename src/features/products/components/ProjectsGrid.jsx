import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import NavArrowButton from '../../shared/button/NavArrowButton';
import ExitButton from '../../shared/button/ExitButton';

// نفس الاسم والـ props القديمة (projects)، بس الشكل بقى سلايدر مربع كبير بدل الجريد
export default function ProjectsGrid({ projects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = useState(false);

  const items = Array.isArray(projects) ? projects.filter((p) => p?.image) : [];
  const totalImages = items.length;
  const hasMultiple = totalImages > 1;

  const goToPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    },
    [totalImages]
  );

  const goToNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    },
    [totalImages]
  );

  const exitPanal = useCallback((e) => {
    if (e) e.stopPropagation();
    setIsOpenLightbox(false);
  }, []);

  const openLightboxAt = (index) => {
    setCurrentIndex(index);
    setIsOpenLightbox(true);
  };

  // إغلاق بـ Esc، تنقل بالأسهم، وقفل سكرول الصفحة وقت فتح المودال
  useEffect(() => {
    if (!isOpenLightbox) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpenLightbox(false);
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpenLightbox, goToNext, goToPrev]);

  if (totalImages === 0) return null;

  return (
    <div dir="rtl" className="relative w-full max-w-xl mx-auto">
      {/* السلايدر: مربع كبير، بيدعم السحب والنقط والأسهم */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        loop={hasMultiple}
        grabCursor
        navigation={hasMultiple ? {
          nextEl: '.swiper-button-next-showcase',
          prevEl: '.swiper-button-prev-showcase',
        } : false}
        pagination={hasMultiple ? { clickable: true } : false}
        className="rounded-3xl overflow-hidden shadow-lg w-full"
      >
        {items.map((project, index) => (
          <SwiperSlide key={project.id || index}>
            <div
              onClick={() => openLightboxAt(index)}
              className="relative w-full aspect-square overflow-hidden rounded-3xl bg-gray-100 cursor-pointer group"
            >
              <img
                src={project.image}
                alt={project.title || `صورة ${index + 1}`}
                draggable="false"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار التنقل: تظهر فقط لو فيه أكتر من صورة */}
      {hasMultiple && (
        <>
          {/* زر التالي (اليمين في RTL) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20 cursor-pointer swiper-button-prev-showcase">
            <NavArrowButton type="next" />
          </div>

          {/* زر السابق (اليسار في RTL) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20 cursor-pointer swiper-button-next-showcase">
            <NavArrowButton type="prev" />
          </div>
        </>
      )}

      {/* نافذة الـ Lightbox (زي newsDetails) بتتعرض على body عشان متتحجبش ورا الهيدر */}
      {isOpenLightbox &&
        createPortal(
          <div
            dir="ltr"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setIsOpenLightbox(false)}
          >
            <ExitButton onClick={exitPanal} />

            <span className="absolute left-6 top-6 text-sm font-bold text-white/80 select-none">
              {currentIndex + 1} / {totalImages}
            </span>

            <img
              src={items[currentIndex]?.image}
              alt={items[currentIndex]?.title || 'Enlarged view'}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl select-none"
            />

            {hasMultiple && (
              <div
                className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pointer-events-auto">
                  <NavArrowButton type="prev" onClick={goToPrev} />
                </div>
                <div className="pointer-events-auto">
                  <NavArrowButton type="next" onClick={goToNext} />
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}