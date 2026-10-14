import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import bg from '../../../assets/img10.jpg';
import firstNewImg from '../../../assets/firstNewImg.jpg';
import secoundNewImg from '../../../assets/secoundNewImg.png';
import thirdNewImg from '../../../assets/thirdNewImg.png';

import NavArrowButton from '../../shared/button/NavArrowButton'
import ExitButton from '../../shared/button/ExitButton';

export default function PodcastDetails({ 
  images = [firstNewImg, secoundNewImg, thirdNewImg, bg, bg, bg, bg, bg, bg, bg] 
}) {
  const [currentIndex, setCurrentIndex] = useState(0); //الصوره الحاليه الي ضغطت عليها
  const [isOpenLightbox, setIsOpenLightbox] = useState(false); //اللايت بوكس افتحه و اقفله

  //بيحسب الاعداد تخص الصور
  const totalImages = images.length;
  const mainImage = images[0];
  const smallImages = images.slice(1, 3);
  const extraCount = totalImages - 3;

  //لوجيك الازرار بتوع اللايت بوكس
  const goToPrev = useCallback((e) => {
    if (e) e.stopPropagation(); 
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goToNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

    const exitPanal = useCallback((e) => {
    if (e) e.stopPropagation(); 
    setIsOpenLightbox(false)
  }, [totalImages]);

  //يفتح علي الصوره الي دوست عليها
  const openLightboxAt = (index) => {
    setCurrentIndex(index);
    setIsOpenLightbox(true);
  };

  useEffect(() => {
    if (!isOpenLightbox) return; //لو اللايت بوكس مقفول متكملش اللوجيك

    const handleKeyDown = (e) => {  //ازرار الكمبيوتر
      if (e.key === "Escape") setIsOpenLightbox(false);
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpenLightbox, goToNext, goToPrev]);

  return (
    <div dir="rtl" className='w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 text-md text-right font-normal text-gray-600 my-10'>
      {/* 1. قسم معرض الصور */}
      <div className='flex-1 w-full flex flex-col gap-3 shrink-0'>
        {/* الصورة الرئيسية الكبيرة */}
        {mainImage && (
          <div 
            onClick={() => openLightboxAt(0)}
            className='w-full h-[400px] rounded-3xl overflow-hidden shadow-sm cursor-pointer group relative'
          >
            <img 
              src={mainImage} 
              alt="Main Podcast" 
              className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
            />
          </div>
        )}

        {/* الصورتين الفرعيتين */}
        <div className='grid grid-cols-2 gap-3 w-full'>
          {smallImages.map((src, i) => {
            const actualIndex = i + 1;
            const isLastWithExtra = i === smallImages.length - 1 && extraCount > 0;

            return (
              <div 
                key={i}
                onClick={() => openLightboxAt(actualIndex)}
                className='w-full h-[250px] rounded-3xl overflow-hidden shadow-sm cursor-pointer group relative'
              >
                <img 
                  src={src} 
                  alt={`Podcast sub ${i}`} 
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

      </div>

      {/* 2. قسم النص */}
      <div className='flex-1 text-right leading-8'>
        <p>
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
          توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى
          إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح
          لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، 
          مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان 
          أن يطلع على صورة حقيقية لتصميم الموقع.ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم
          ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا 
          علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.هذا النص يمكن أن يتم تركيبه على أي تصميم
          دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
          هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
        </p>
      </div>

      {/* 3. نافذة الـ Lightbox */}
      {isOpenLightbox && (
        <div
          dir="ltr"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setIsOpenLightbox(false)}
        >
          {/* زر الإغلاق */}
          <ExitButton onClick={exitPanal}/>

          {/* العداد العلوي */}
          <span className="absolute left-6 top-6 text-sm font-bold text-white/80 select-none">{currentIndex + 1} / {totalImages}</span>

          {/* الصورة المكبرة */}
          <img
            src={images[currentIndex]}
            alt="Enlarged view"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl select-none"
          />

          {/* أزرار التنقل مع استخدام stopPropagation عشان لما تدوس ع الصوره ميطلعش من اللايت بوكس*/}
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