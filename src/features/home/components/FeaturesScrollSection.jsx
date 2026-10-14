import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import feature1 from '../../../assets/feature1.jpg'
import feature2 from '../../../assets/feature2.png'
import feature3 from '../../../assets/feature3.png'
import feature4 from '../../../assets/feature4.jpg'
import LineBreak from '../../shared/break/LineBreak'

gsap.registerPlugin(ScrollTrigger)

const featuresData = [
  {
    id: 1,
    number: '01',
    title: 'الخبرة',
    text: 'نتمتع بخبرة واسعة وعميقة في هذا المجال تراكمت نتيجة تجارب متعددة وعمل متميز وابتكار مستمر، حيث أن فريق عملنا قادر على تقديم حلول متطورة وموثوقة تلبي احتياجات عملائنا بكفاءة عالية.',
    imageLeft: feature1,
    imageRight: feature2,
  },
  {
    id: 2,
    number: '02',
    title: 'الملكية',
    text: 'في شجرة العائلة، نمنحك إمكانية تملّك منتجاتنا من خلال شراء التطبيق ليحمل اسم عائلتك، هذا يتيح لك وللأفراد المُخوّلين في عائلتك النفاذ إلى كامل مميزات التطبيق باستخدام لوحة التحكم.',
    imageLeft: feature3,
    imageRight: feature4,
  },
  {
    id: 3,
    number: '03',
    title: 'الأمان',
    text: 'نولي أهمية قصوى لحماية بياناتك وخصوصية عائلتك، من خلال اعتماد أحدث معايير التشفير والحماية، لضمان بقاء معلوماتكم العائلية في أمان تام بعيدًا عن أي اختراق أو استخدام غير مصرح به.',
    imageLeft: feature2,
    imageRight: feature1,
  },
  {
    id: 4,
    number: '04',
    title: 'الثقه',
    text: 'نولي أهمية قصوى لحماية بياناتك وخصوصية عائلتك، من خلال اعتماد أحدث معايير التشفير والحماية، لضمان بقاء معلوماتكم العائلية في أمان تام بعيدًا عن أي اختراق أو استخدام غير مصرح به.',
    imageLeft: feature2,
    imageRight: feature1,
  },
  {
    id: 5,
    number: '05',
    title: 'النخوه',
    text: 'نولي أهمية قصوى لحماية بياناتك وخصوصية عائلتك، من خلال اعتماد أحدث معايير التشفير والحماية، لضمان بقاء معلوماتكم العائلية في أمان تام بعيدًا عن أي اختراق أو استخدام غير مصرح به.',
    imageLeft: feature2,
    imageRight: feature1,
  },
]

export default function FeaturesScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const panelsRef = useRef([])
  const imagesLeftRef = useRef([])
  const imagesRightRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current
      const imagesLeft = imagesLeftRef.current
      const imagesRight = imagesRightRef.current

      panels.forEach((panel, i) => {
        gsap.set(panel, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 })
      })
      imagesLeft.forEach((img) => gsap.set(img, { opacity: 0, x: -60, rotate: -8 }))
      imagesRight.forEach((img) => gsap.set(img, { opacity: 0, x: 60, rotate: 8 }))

      gsap.set(imagesLeft[0], { opacity: 1, x: 0, rotate: -6 })
      gsap.to(imagesRight[0], { opacity: 1, x: 0, rotate: 6, delay: 0.1 })

      const totalSections = featuresData.length

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalSections * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (totalSections - 1),
          duration: 0.5,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress * (totalSections - 1)
          const currentIndex = Math.round(progress)
          setActiveIndex(currentIndex)

          panels.forEach((panel, i) => {
            const isActive = i === currentIndex
            gsap.to(panel, {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 30,
              duration: 0.3,
              overwrite: 'auto',
            })
          })

          imagesLeft.forEach((img, i) => {
            const isActive = i === currentIndex
            gsap.to(img, {
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -60,
              rotate: isActive ? -6 : -8,
              duration: 0.4,
              overwrite: 'auto',
            })
          })

          imagesRight.forEach((img, i) => {
            const isActive = i === currentIndex
            gsap.to(img, {
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
              rotate: isActive ? 6 : 8,
              duration: 0.4,
              delay: isActive ? 0.15 : 0,
              overwrite: 'auto',
            })
          })
        },
      })

      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section dir='rtl' ref={sectionRef} className="relative w-full h-screen bg-[#F7F7F5] overflow-hidden">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12">

        {/* عمود النصوص (يمين) - يغطي 5 أعمدة */}
        <div className="relative flex flex-col gap-2 lg:col-span-5">
          <div className="flex flex-col gap-1 mb-10">
            <div className="flex items-center gap-2 justify-start">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-gray-500 text-sm font-medium">ما يميزنا</p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 text-right">
              خصائص <span className="text-primary">تميزنا</span>
            </h2>
          </div>

          <div className="relative h-[220px]">
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => (panelsRef.current[index] = el)}
                className="absolute inset-0 flex flex-col gap-4 text-right"
              >
                <span className="text-gray-300 text-sm font-semibold">{feature.number}</span>
                <h3 className="text-3xl font-bold text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-semibold leading-8 max-w-md mr-0 ml-auto">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* مؤشر الأرقام الجانبي */}
          <div className="flex gap-2 justify-start mt-6">
            {featuresData.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={feature.id}
                  className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive ? 'w-10 bg-primary' : 'w-4 bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* عمود فاصل فارغ (عمود واحد) */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* عمود الصور (يسار) - يغطي 6 أعمدة ومزاح لليسار */}
        <div className="relative h-[420px] w-full lg:col-span-6 flex justify-end">
          {featuresData.map((feature, index) => (
            <React.Fragment key={feature.id}>
              <div
                ref={(el) => (imagesLeftRef.current[index] = el)}
                className="absolute left-12 md:left-24 top-0 w-60 md:w-68 h-68 md:h-76 rounded-2xl overflow-hidden border-2 border-lime-400 shadow-lg z-10"
              >
                <img
                  src={feature.imageLeft}
                  alt={`${feature.title} 1`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                ref={(el) => (imagesRightRef.current[index] = el)}
                className="absolute left-0 top-28 md:top-32 w-60 md:w-68 h-68 md:h-76 rounded-2xl overflow-hidden shadow-xl z-20"
              >
                <img
                  src={feature.imageRight}
                  alt={`${feature.title} 2`}
                  className="w-full h-full object-cover"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
        <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
            <LineBreak />
        </div>
    </section>
  )
}