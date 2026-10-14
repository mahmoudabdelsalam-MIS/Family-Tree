import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../../../assets/bannerBg.jpg';
import NavArrowButton from '../../shared/button/NavArrowButton';

export default function ImageBannerSlider() {
  const banners = [
    { id: 1, image: banner1, alt: "بانر اليوم الوطني" },
    { id: 2, image: banner1, alt: "بانر عرض العائلة" },
    { id: 3, image: banner1, alt: "بانر الإنجازات" },
  ];

  return (
    <div dir="rtl" className="relative w-full max-w-7xl mx-auto my-6 px-4 md:px-8">
      {/* حاوية السلايدر */}
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next-banner',
          prevEl: '.swiper-button-prev-banner',
        }}
        pagination={{ clickable: true }}
        className="rounded-3xl md:rounded-4xl overflow-hidden shadow-lg w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* ارتفاع متجاوب للبانر: صغير في الموبايل، ومتوسط في التابلت، وكبير في الديسك توب */}
            <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-3xl">
              <img 
                src={banner.image} 
                alt={banner.alt} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زر التنقل الأيمن (التالي) - متجاوب (داخل البانر بالموبايل، وخارجه بالديسك توب) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:-right-6 z-20 cursor-pointer swiper-button-next-banner">
        <NavArrowButton type={"next"} />
      </div>

      {/* زر التنقل الأيسر (السابق) - متجاوب (داخل البانر بالموبايل، وخارجه بالديسك توب) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:-left-6 z-20 cursor-pointer swiper-button-prev-banner">
        <NavArrowButton type={"prev"} />
      </div>
    </div>
  );
}