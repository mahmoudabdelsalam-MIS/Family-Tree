import React, { useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import LineBreak from '../../shared/break/LineBreak'
import SectionTitle from '../../shared/headers/SectionTitle'

// كل عنصر ممكن يجي بصورة واحدة أو صورتين (بحد أقصى 2).
// لو الباك إند بيبعت الصورة التانية باسم مختلف، ضيفه هنا بس.
const getImages = (item) => {
  const list = [
    item?.imageUrl,
    ...(Array.isArray(item?.imageUrls) ? item.imageUrls : []),
    ...(Array.isArray(item?.galleryUrls) ? item.galleryUrls : []),
  ]
  const valid = list.filter((src) => typeof src === 'string' && src.trim() !== '')
  return [...new Set(valid)].slice(0, 2)
}

// مكان الصورة الأمامية: لما معاها صورة خلفية، ولما تبقى لوحدها
const FRONT_WITH_BACK =
  'fs-right absolute ml-16 sm:ml-20 lg:ml-0 left-5 lg:left-0 top-20 sm:top-28 md:top-32 w-52 sm:w-60 md:w-68 h-52 sm:h-60 md:h-76 rounded-2xl overflow-hidden shadow-xl z-20'
const FRONT_ALONE =
  'fs-right absolute ml-16 sm:ml-20 lg:ml-0 left-5 lg:left-6 top-10 sm:top-14 md:top-16 w-52 sm:w-60 md:w-68 h-52 sm:h-60 md:h-76 rounded-2xl overflow-hidden shadow-xl z-20'

export default function FeaturesScrollSection({ highlights }) {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // تنضيف الداتا: أي عنصر من غير عنوان ولا وصف بيتشال، وكل حاجة ليها قيمة افتراضية
  const items = useMemo(
    () =>
      (Array.isArray(highlights) ? highlights : [])
        .filter((h) => h && (h.title || h.description))
        .map((h, index) => ({
          id: h.id ?? index,
          number: String(index + 1).padStart(2, '0'),
          title: h.title || '',
          text: h.description || '',
          images: getImages(h),
        })),
    [highlights]
  )

  const total = items.length

  // مفيش مميزات جاية من الـ API: منعرضش السكشن خالص
  if (total === 0) return null

  return (
    <>
    <section dir='rtl' className="relative w-full bg-[#F7F7F5] overflow-hidden py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-6">

        {/* عنوان السكشن */}
        <SectionTitle
          subtitle="ما يميزنا"
          title="خصائص"
          highlightedText="تميزنا"
        />

        <Swiper
          dir="rtl"
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={500}
          rewind
          allowTouchMove={total > 1}
          autoplay={
            total > 1
              ? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full"
        >
          {items.map((feature) => {
            const [first, second] = feature.images
            const front = second || first       // الصورة الأمامية
            const back = second ? first : null  // الخلفية: بس لو في صورتين

            return (
              <SwiperSlide key={feature.id} className="feature-slide">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">

                  {/* النص (يمين) - يغطي 5 أعمدة */}
                  <div className="fs-text flex flex-col gap-4 text-right min-h-[220px] lg:col-span-5">
                    <span className="text-gray-300 text-sm font-semibold">{feature.number}</span>
                    <h3 className="text-3xl font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-500 text-sm font-semibold leading-8 max-w-md mr-0 ml-auto">
                      {feature.text}
                    </p>
                  </div>

                  {/* عمود فاصل فارغ (عمود واحد) */}
                  <div className="hidden lg:block lg:col-span-1"></div>

                  {/* الصور: صورة أو صورتين */}
                  <div className="relative h-[320px] sm:h-[420px] w-full lg:col-span-6 flex justify-center lg:justify-end items-center">
                    {back && (
                      <div className="fs-left absolute -ml-16 sm:-ml-20 lg:ml-0 left-45 lg:left-12 md:left-10 top-0 w-52 sm:w-60 md:w-68 h-52 sm:h-60 md:h-76 rounded-2xl overflow-hidden border-2 border-lime-400 shadow-lg z-10">
                        <img
                          src={back}
                          alt={`${feature.title} 1`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {front && (
                      <div className={back ? FRONT_WITH_BACK : FRONT_ALONE}>
                        <img
                          src={front}
                          alt={back ? `${feature.title} 2` : feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {total > 1 && (
          <div className="flex gap-2 justify-start">
            {items.map((feature, index) => (
              <button
                key={feature.id}
                type="button"
                aria-label={feature.title}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'w-10 bg-primary' : 'w-4 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .feature-slide .fs-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .feature-slide.swiper-slide-active .fs-text {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-slide .fs-left {
          opacity: 0;
          transform: translateX(-60px) rotate(-8deg);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .feature-slide.swiper-slide-active .fs-left {
          opacity: 1;
          transform: translateX(0) rotate(-6deg);
        }

        .feature-slide .fs-right {
          opacity: 0;
          transform: translateX(60px) rotate(8deg);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .feature-slide.swiper-slide-active .fs-right {
          opacity: 1;
          transform: translateX(0) rotate(6deg);
          transition-delay: 0.15s;
        }

        @media (prefers-reduced-motion: reduce) {
          .feature-slide .fs-text,
          .feature-slide .fs-left,
          .feature-slide .fs-right {
            transition: none;
          }
        }
      `}</style>
    </section>
    <LineBreak/>
    </>
  )
}