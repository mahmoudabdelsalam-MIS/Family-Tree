import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock } from 'lucide-react';

import NavArrowButton from '../../shared/button/NavArrowButton';
import ExitButton from '../../shared/button/ExitButton';
import Skeleton from '../../shared/skeleton/Skeleton';
import { useBreadcrumbTitle } from '../../../context/breadcrumb/BreadCrumbContext';

// skeleton لصفحة الخبر: بينسخ نفس الـ layout (صور طايفة + تاريخ + عنوان + نص)
export function NewsDetailsSkeleton() {
  const textWidths = ['w-full', 'w-full', 'w-11/12', 'w-full', 'w-10/12', 'w-full', 'w-9/12', 'w-2/3'];

  return (
    <div
      dir="rtl"
      className="w-full max-w-7xl mx-auto flow-root my-10 px-4"
    >
      {/* الصور */}
      <div className="w-full lg:w-[45%] lg:float-right lg:ml-10 mb-6 flex flex-col gap-3">
        <Skeleton rounded="rounded-3xl" className="w-full h-[350px] sm:h-[400px]" />
        <div className="grid grid-cols-2 gap-3 w-full">
          <Skeleton rounded="rounded-3xl" className="w-full h-[200px] sm:h-[250px]" />
          <Skeleton rounded="rounded-3xl" className="w-full h-[200px] sm:h-[250px]" />
        </div>
      </div>

      {/* التاريخ والوقت */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Skeleton rounded="rounded-full" className="h-8 w-56" />
        <Skeleton rounded="rounded-full" className="h-8 w-20" />
      </div>

      {/* العنوان */}
      <Skeleton rounded="rounded-md" className="h-8 w-2/3 mb-6" />

      {/* النص */}
      <div className="flex flex-col gap-3">
        {textWidths.map((w, i) => (
          <Skeleton key={i} rounded="rounded-md" className={`h-4 ${w}`} />
        ))}
      </div>
    </div>
  );
}

export default function NewsDetails({
  images = [],
  title = '',
  date = '',
  time = '',
  content = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = useState(false);

  const totalImages = images.length;
  const mainImage = images[0];
  const smallImages = images.slice(1, 3);
  const extraCount = Math.max(0, totalImages - 3);
  useBreadcrumbTitle(title || 'تفاصيل الخبر');

  // التاريخ الهجري والميلادي من تاريخ الـ API (مثال: 2026-10-14)
  const dateObj = date ? new Date(date) : null;
  const hijriDate = dateObj
    ? new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dateObj)
    : '';
  const gregorianDate = dateObj
    ? new Intl.DateTimeFormat('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dateObj)
    : '';

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

  return (
    <div
      dir="rtl"
      className="font-secondary w-full max-w-7xl mx-auto flow-root text-right font-normal text-gray-600 my-10 px-4"
    >
      {/* الصور: بتطفو على اليمين في الشاشات الكبيرة والنص يلتف حواليها */}
      {totalImages > 0 && (
        <div className="w-full lg:w-[45%] lg:float-right lg:ml-10 mb-6 flex flex-col gap-3">
          {/* الصورة الرئيسية */}
          {mainImage && (
            <div
              onClick={() => openLightboxAt(0)}
              className="w-full h-[350px] sm:h-[400px] rounded-3xl overflow-hidden shadow-sm cursor-pointer group relative"
            >
              <img
                src={mainImage}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* الصورتين الفرعيتين */}
          {smallImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 w-full">
              {smallImages.map((src, i) => {
                const actualIndex = i + 1;
                const isLastWithExtra =
                  i === smallImages.length - 1 && extraCount > 0;

                return (
                  <div
                    key={i}
                    onClick={() => openLightboxAt(actualIndex)}
                    className="w-full h-[200px] sm:h-[250px] rounded-3xl overflow-hidden shadow-sm cursor-pointer group relative"
                  >
                    <img
                      src={src}
                      alt={`${title} ${i + 2}`}
                      className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                        isLastWithExtra ? 'blur-[2px]' : ''
                      }`}
                    />

                    {isLastWithExtra && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-3xl font-bold text-white backdrop-blur-[1px]">
                        +{extraCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* التاريخ والوقت */}
      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-black font-medium mb-4">
        {(hijriDate || gregorianDate) && (
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {hijriDate} - {gregorianDate}
            </span>
          </div>
        )}
        {time && (
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-primary" />
            <span>{time}</span>
          </div>
        )}
      </div>

      {/* العنوان */}
      <h1 className="text-2xl font-bold text-gray-900 font-primary leading-tight mb-4">
        {title}
      </h1>

      {/* النص (HTML جاي من الـ API) */}
      <div
        className="leading-8 text-[#777777] font-light text-base [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* نافذة الـ Lightbox */}
      {isOpenLightbox && (
        <div
          dir="ltr"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setIsOpenLightbox(false)}
        >
          <ExitButton onClick={exitPanal} />

          <span className="absolute left-6 top-6 text-sm font-bold text-white/80 select-none">
            {currentIndex + 1} / {totalImages}
          </span>

          <img
            src={images[currentIndex]}
            alt="Enlarged view"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl select-none"
          />

          {totalImages > 1 && (
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
        </div>
      )}
    </div>
  );
}