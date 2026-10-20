import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import TestimonialCard from '../../shared/cards/TestimonialCard';
import NavArrowButton from '../../shared/button/NavArrowButton';
import SectionTitle from '../../shared/headers/SectionTitle';

import {man1 , backgroundNav} from '../../../assets/assets'



const logoPositions = [
  'top-20 right-46 w-30 h-30',
  'top-54 right-56 w-36 h-36',
  'top-10 right-95 w-36 h-36',
  'top-50 right-0 w-44 h-44',
  'bottom-0 right-40 w-30 h-30',
  'bottom-38 right-110 w-32 h-32',
  'bottom-8 right-95 w-28 h-28',
];

// الداتا كلها جاية من Home: آراء العملاء (clientReviews) والشركاء (partners)
export default function TestimonialsSection({ clientReviews = [], partners = [] }) {
  const testimonialsData = clientReviews || [];  

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

          {partners?.map((company, index) => (
            <div
              key={company.id}
              className={`absolute ${logoPositions[index]} rounded-full bg-white shadow-md flex items-center justify-center p-4`}
            >
            <img
                src={company.image?.startsWith('http') ? company.image : `https://new.familiesapp.net${company.image?.startsWith('/') ? '' : '/'}${company.image}`}
                alt={company.title}
                className='w-full h-full object-contain rounded-full'
              />
            </div>
          ))}
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
            /* سلايدر الاراء */
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
                        name={firstItem.name}
                        // استخدام الـ avatarUrl القادم من الـ API، ولو مش موجود بنسيب الـ fallback (man1)
                        avatar={firstItem.avatarUrl || man1}
                        rating={firstItem.rating}
                        text={firstItem.body}
                      />
                      {secondItem && (
                        <TestimonialCard
                          name={secondItem.name}
                          avatar={secondItem.avatarUrl || man1}
                          rating={secondItem.rating}
                          text={secondItem.body}
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
    </section>
  );
}