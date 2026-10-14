import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import screenshot1 from '../../../assets/screenshot1.png'
import screenshot2 from '../../../assets/screenshot2.png'
import screenshot3 from '../../../assets/screenshot3.png'
import screenshot4 from '../../../assets/screenshot4.png'
import screenshot5 from '../../../assets/screenshot5.png'
import mainScreenshot from '../../../assets/mainScreenshot.png'

const testmonials = [
  { img: screenshot1 },
  { img: screenshot2 },
  { img: mainScreenshot },
  { img: screenshot4 },
  { img: screenshot5 },
]

export default function ScreenShotsApp() {
  const middleIndex = Math.floor(testmonials.length / 2);
  return (
    <div className='w-full min-h-[90vh] flex flex-col justify-center items-center gap-5 pt-20 overflow-hidden'>
      <div dir='rtl' className='flex justify-center items-center gap-2 text-3xl py-5'>
        <h2 className='text-gray-500 mt-2 text-lg font-semibold'>بعض لقطات شاشه</h2>
        <span className='relative text-black font-bold'>
          من صلة
          <svg className='absolute -bottom-5 left-0 w-full h-3 text-primary pointer-events-none'
          width="109" height="12" viewBox="0 0 109 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.00098 9C17.9737 4.47226 59.5356 -1.86658 106.001 9" stroke-width="6" stroke-linecap="round" stroke="#589E08"/>
          </svg>
        </span>
      </div>

      <div className='w-full' dir='ltr'>
        <Swiper
          key="screenshots-swiper-v1" // يجبر Swiper يترندر صح مع الـ Loop
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          autoFocus={true}
          initialSlide={middleIndex}
          onSwiper={(swiper) => {
            swiper.slideToLoop(middleIndex, 0);
          }}
          slidesPerView="auto"
          // 💡 الإعدادات الخاصة بـ Coverflow للموبايل والشاشات الكبيرة:
          coverflowEffect={{
            rotate: 0,
            stretch: -10, // للموبايل: قيمة بالموجب تجعل الكروت متقاربة أو متداخلة
            depth: 300,
            modifier: 1.2,
            slideShadows: false,
          }}
          breakpoints={{
            768: {
              coverflowEffect: {
                rotate: 0,
                stretch: 60, // للشاشات الكبيرة: قيمة بالسالب لتباعد الكروت عن بعضها
                depth: 300,
                modifier: 1.2,
                slideShadows: false,
              }
            }
          }}
          pagination={{
            clickable: true,
            el: ".testimonials-pagination",
            renderBullet: (index, className) =>
            `<span class="${className} inline-block w-2 h-2 rounded-full bg-black opacity-100 transition-all duration-300 cursor-pointer [&.swiper-pagination-bullet-active]:w-6 [&.swiper-pagination-bullet-active]:rounded [&.swiper-pagination-bullet-active]:bg-primary!"></span>`,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className='overflow-visible!'
        >
          {testmonials.map((item, index) => (
            <SwiperSlide
              key={index}
              className='w-70! sm:w-[320px]! md:w-90! py-10'
            >
              <img src={item.img} draggable='false' alt="Screenshot" className='w-[30vh] h-auto mx-auto shadow-2xl rounded-3xl object-contain select-none' />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='testimonials-pagination flex justify-center gap-2 mt-6' />
      </div>
    </div>
  )
}