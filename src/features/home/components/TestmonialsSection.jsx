// components/sections/TestimonialsSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// استيراد ملفات الستايل الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/navigation';

import TestimonialCard from '../../shared/cards/TestimonialCard';
import NavArrowButton from '../../shared/button/NavArrowButton';

import man1 from '../../../assets/man1.png';
import backgroundNav from '../../../assets/backgroundNav.png';

import logo1 from '../../../assets/logotest1.png';
import logo2 from '../../../assets/logotest2.png';
import logo3 from '../../../assets/logotest3.png';
import logo4 from '../../../assets/logotest4.png';
import logo5 from '../../../assets/logotest5.png';
import logo6 from '../../../assets/logotest6.png';
import logo7 from '../../../assets/logo7.png';

const testimonialsData = [
  {
    id: 1,
    name: 'عميل 1',
    avatar: man1,
    rating: 3,
    text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الاخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية.',
  },
  {
    id: 2,
    name: 'عميل 2',
    avatar: man1,
    rating: 4,
    text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الاخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية.',
  },
  {
    id: 3,
    name: 'عميل 3',
    avatar: man1,
    rating: 2,
    text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الاخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية.',
  },
  {
    id: 4,
    name: 'عميل 4',
    avatar: man1,
    rating: 5,
    text: 'تجربة رائعة جدًا مع الفريق، الخدمة كانت احترافية والتواصل سلس من أول خطوة لحد التسليم. بالتأكيد هنكرر التعامل معاهم في مشاريع تانية قريبًا.',
  },
];

const companiesData = [
  { id: 1, logo: logo1, name: 'أسرة آل التميمي' },
  { id: 2, logo: logo2, name: 'أبو عباة' },
  { id: 3, logo: logo3, name: 'الشويمي' },
  { id: 4, logo: logo4, name: 'أواصر' },
  { id: 5, logo: logo5, name: 'عائلة الجربوع' },
  { id: 6, logo: logo6, name: 'صايم' },
  { id: 7, logo: logo7, name: 'عائله الجربوع' },
];


const logoPositions = [
  'top-20 right-46 w-30 h-30',
  'top-54 right-56 w-36 h-36',
  'top-10 right-95 w-36 h-36',
  'top-50 right-0 w-44 h-44',
  'bottom-0 right-40 w-30 h-30',
  'bottom-38 right-110 w-32 h-32',
  'bottom-8 right-95 w-28 h-28',
];

export default function TestimonialsSection() {
  return (
    <section className='bg-secondaryBgColor py-16 px-6 md:px-20 relative overflow-hidden' dir='rtl'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

        {/* عمود اللوجوهات المبعثرة */}
        <div className='relative hidden lg:block w-full h-[480px]'>
          <div
            className='absolute inset-0 opacity-30 pointer-events-none bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${backgroundNav})` }}
          />

          {companiesData.map((company, index) => (
            <div
              key={company.id}
              className={`absolute ${logoPositions[index]} rounded-full bg-white shadow-md flex items-center justify-center p-4`}
            >
              <img
                src={company.logo}
                alt={company.name}
                className='w-full h-full object-contain rounded-full'
              />
            </div>
          ))}
        </div>

        {/* عمود النصوص والكروت باستخدام Swiper */}
        <div className='flex flex-col gap-6'>
          
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-primary' />
              <p className='text-gray-500 text-sm font-medium'>قالوا عنا</p>
            </div>
            <h2 className='text-3xl sm:text-5xl font-bold text-gray-800'>
              <span className='text-primary'>آراء</span> عملائنا
            </h2>
          </div>

          {/* سلايدر الاراء */}
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
            {/* نقوم بتقسيم البيانات إلى مجموعات من كارتين لكل شريحة Slide */}
            {Array.from({ length: Math.ceil(testimonialsData.length / 2) }).map((_, slideIndex) => {
              const firstItem = testimonialsData[slideIndex * 2];
              const secondItem = testimonialsData[slideIndex * 2 + 1];

              return (
                <SwiperSlide key={slideIndex}>
                  <div className='flex flex-col gap-4'>
                    <TestimonialCard
                      name={firstItem.name}
                      avatar={firstItem.avatar}
                      rating={firstItem.rating}
                      text={firstItem.text}
                    />
                    {secondItem && (
                      <TestimonialCard
                        name={secondItem.name}
                        avatar={secondItem.avatar}
                        rating={secondItem.rating}
                        text={secondItem.text}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

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