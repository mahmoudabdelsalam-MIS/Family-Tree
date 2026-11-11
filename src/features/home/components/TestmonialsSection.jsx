import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

import TestimonialCard from '../../shared/cards/TestimonialCard';
import NavArrowButton from '../../shared/button/NavArrowButton';
import SectionTitle from '../../shared/headers/SectionTitle';

import { man1, backgroundNav } from '../../../assets/assets';

const logoPositions = [
  'top-20 right-46 w-30 h-30',
  'top-54 right-56 w-36 h-36',
  'top-10 right-95 w-36 h-36',
  'top-50 right-0 w-44 h-44',
  'bottom-0 right-40 w-30 h-30',
  'bottom-38 right-110 w-32 h-32',
  'bottom-8 right-95 w-28 h-28',
];

// مكان دايرة "باقي الشركاء" (المكان اللي متحدد على اليسار)، غيّر القيم لو عايز تحركها
const moreCirclePosition = 'top-[120px] left-0 w-20 h-20';

// تجهيز رابط الصورة (نفس المنطق القديم بس في مكان واحد عشان نستخدمه في الدواير والمودال)
const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http')
    ? image
    : `https://new.familiesapp.net${image.startsWith('/') ? '' : '/'}${image}`;
};

const getPartnerName = (company) =>
  company?.title || company?.ar_title || company?.name || 'شريك نجاح';

// الشركاء بيترتبوا حسب sortOrder (اللي ملوش sortOrder بيتحط في الآخر)
const sortPartners = (list) =>
  (Array.isArray(list) ? list.filter(Boolean) : [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));

export default function TestimonialsSection({ clientReviews = [], featuredPartners = [], morePartners = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testimonialsData = clientReviews || [];

  // الشركاء المميزين (featuredPartners): بيتعرضوا في الدواير المبعثرة، بحد أقصى عدد الأماكن المتاحة في logoPositions
  const sortedFeatured = sortPartners(featuredPartners);
  const activePartners = sortedFeatured.slice(0, logoPositions.length);

  // باقي الشركاء (morePartners): بيتعرضوا في المودال
  // ولو المميزين زادوا عن الأماكن المتاحة، الزيادة بتروح المودال برضه عشان محدش يختفي
  const remainingPartners = [...sortedFeatured.slice(logoPositions.length), ...sortPartners(morePartners)];

  // قفل سكرول الصفحة + إغلاق المودال بزر Esc
  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className='bg-secondaryBgColor py-16 px-6 md:px-20 relative overflow-hidden' dir='rtl'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

        {/* عمود اللوجوهات المبعثرة */}
        <div className='relative hidden lg:block w-full h-[480px]'>
          <img
            src={backgroundNav}
            alt=""
            aria-hidden="true"
            draggable="false"
            className='absolute inset-0 w-full h-full object-cover object-center contrast-150 pointer-events-none select-none'
          />

          {activePartners.map((company, index) => {
            const imageUrl = getImageUrl(company?.imageUrl || company?.image);

            return (
              <div
                key={company?.id || index}
                className={`absolute ${logoPositions[index]} rounded-full bg-white shadow-md flex items-center justify-center p-4`}
              >
                <img
                  src={imageUrl}
                  alt={getPartnerName(company)}
                  className='w-full h-full object-contain rounded-full'
                />
              </div>
            );
          })}

          {/* دايرة باقي الشركاء: بتظهر بس لو في شركاء زيادة */}
          {remainingPartners.length > 0 && (
            <button
              type='button'
              onClick={() => setIsModalOpen(true)}
              aria-label={`عرض باقي الشركاء (${remainingPartners.length})`}
              className={`absolute ${moreCirclePosition} rounded-full bg-primary text-white shadow-md flex items-center justify-center text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300`}
            >
              <span dir='ltr'>+{remainingPartners.length}</span>
            </button>
          )}
        </div>

        {/* عمود النصوص والكروت باستخدام Swiper */}
        <div className='flex flex-col gap-6'>

          <SectionTitle
            subtitle="قالو عنا"
            title="اراء"
            highlightedText="عملائنا"
          />

          <div className='min-h-[392px]'>
          {testimonialsData.length === 0 ? (
            <div className='py-8 text-center text-gray-500'>لا توجد آراء متاحة حالياً.</div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                nextEl: '.swiper-testimonials-next',
                prevEl: '.swiper-testimonials-prev',
              }}
              className='w-full pb-2'
            >
              {Array.from({ length: Math.ceil(testimonialsData.length / 2) }).map((_, slideIndex) => {
                const firstItem = testimonialsData[slideIndex * 2];
                const secondItem = testimonialsData[slideIndex * 2 + 1];

                return (
                  <SwiperSlide key={slideIndex}>
                    <div className='flex flex-col gap-4'>
                      <TestimonialCard
                        name={firstItem?.name}
                        avatar={firstItem?.avatarUrl || man1}
                        rating={firstItem?.rating}
                        text={firstItem?.body}
                      />
                      {secondItem && (
                        <TestimonialCard
                          name={secondItem?.name}
                          avatar={secondItem?.avatarUrl || man1}
                          rating={secondItem?.rating}
                          text={secondItem?.body}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          </div>

          {/* أزرار التنقل المخصصة */}
          <div className='flex items-center justify-end gap-3 mt-2'>
            <div className='swiper-testimonials-prev cursor-pointer'>
              <NavArrowButton type='next' />
            </div>
            <div className='swiper-testimonials-next cursor-pointer'>
              <NavArrowButton type='prev' />
            </div> 
          </div>

        </div>

      </div>

      {/* مودال باقي الشركاء (بيتعرض على body عشان overflow-hidden بتاع السكشن ميقصوش) */}
      {isModalOpen &&
        createPortal(
          <div
            className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4'
            dir='rtl'
            onClick={() => setIsModalOpen(false)}
            role='dialog'
            aria-modal='true'
            aria-label='باقي الشركاء'
          >
            <div
              className='bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              {/* رأس المودال */}
              <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  aria-label='إغلاق'
                  className='w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-600 cursor-pointer'
                >
                  <X size={18} />
                </button>
                <h3 className='text-lg font-bold text-secondary'>باقي الشركاء</h3>
              </div>

              {/* قايمة الشركاء: اللوجو على اليمين واسم الشركة جنبه */}
              <ul className='flex flex-col gap-3 p-4 pl-2 ml-3 my-3 overflow-y-auto partners-scroll'>
                {remainingPartners.map((company, index) => (
                  <li
                    key={company?.id || index}
                    className='flex items-center gap-4 bg-gray-50 rounded-2xl p-3'
                  >
                    <div className='w-16 h-16 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center p-2'>
                      <img
                        src={getImageUrl(company?.imageUrl || company?.image)}
                        alt={getPartnerName(company)}
                        className='w-full h-full object-contain rounded-full'
                      />
                    </div>
                    <span className='font-semibold text-sm sm:text-base text-gray-700'>
                      {getPartnerName(company)}
                    </span>
                  </li>
                ))}
              </ul>

<style>{`
                /* 1. إخفاء أسهم الـ Scrollbar تماماً */
                .partners-scroll::-webkit-scrollbar-button {
                  display: none !important;
                  width: 0;
                  height: 0;
                }

                .partners-scroll::-webkit-scrollbar {
                  width: 6px;
                }

                .partners-scroll::-webkit-scrollbar-track {
                  background: transparent; /* خلفية شفافة لعدم التشويش */
                  border-radius: 10px;
                }

                .partners-scroll::-webkit-scrollbar-thumb {
                  background: #d1d5db; /* gray-300 (أغمق سيكا) */
                  border-radius: 10px;
                  border: 2px solid transparent;
                  background-clip: padding-box;
                }

                .partners-scroll::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af; /* gray-400 (أغمق عند التمرير) */
                  background-clip: padding-box;
                }

                /* دعم متصفح فايرفوكس */
                .partners-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #d1d5db transparent;
                }
              `}</style>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}