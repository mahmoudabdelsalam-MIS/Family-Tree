import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {project1 , project2 , project3 , project4} from '../../../assets/assets'
import NavArrowButton from '../../shared/button/NavArrowButton'
import LineBreak from '../../shared/break/LineBreak'
import Button from '../../shared/button/Button'
import { useServiceCategories } from '../../../hooks/useHome'
import SectionTitle from '../../shared/headers/SectionTitle'

const CANVAS_H = 671
const SLOTS = [
  // الكرت النشط
  { left: 0, top: 0, width: 503, height: 671, radius: 40, border: 5, z: 40, overlay: '', enterX: 0, fallback: project4 },
  { left: 237, top: 83, width: 412.25, height: 508, radius: 33.25, border: 6, z: 30, overlay: 'bg-black/20', enterX: -40, fallback: project1 },
  { left: 432, top: 139, width: 321.36, height: 396, radius: 25.92, border: 6, z: 20, overlay: 'bg-black/30', enterX: -70, fallback: project2 },
  { left: 558, top: 181, width: 253.19, height: 312, radius: 20.42, border: 6, z: 10, overlay: 'bg-black/40', enterX: -100, fallback: project3 },
]

const pct = (value, total) => `${(value / total) * 100}%`
// بيحوّل px الديزاين لوحدة cqw (نسبة من عرض الـ canvas) عشان الـ border والـ radius يتصغروا مع الكروت
const cq = (value, canvasW) => `${(value / canvasW) * 100}cqw`

export default function ProjectsSection({data}) {  
  console.log(data);
  
  const { isLoading, error } = useServiceCategories()
  const projectsData = data || []

  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projectsData[activeIndex] || {}
  const otherProjects = projectsData.filter((_, index) => index !== activeIndex)

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, duration: 1.5 },
    },
  }

  const projectVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length)
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)
  }

  if (isLoading) {
    return (
      <div className='min-h-[880px] sm:min-h-[1100px] md:min-h-[1180px] lg:min-h-[800px] flex items-center justify-center text-gray-500'>
        جاري تحميل المشاريع والخدمات...
      </div>
    )
  }

  if (error || projectsData.length === 0) {
    return (
      <div className='min-h-[880px] sm:min-h-[1100px] md:min-h-[1180px] lg:min-h-[800px] flex items-center justify-center text-red-500'>
        عذراً، لا توجد مشاريع متاحة حالياً.
      </div>
    )
  }

  // الكرت النشط + لحد 3 كروت وراه (لو الباك رجّع أقل، بيتعرض أقل وعرض الـ canvas بيتظبط تلقائي)
  const cards = [activeProject, ...otherProjects].slice(0, SLOTS.length)
  const canvasW = Math.max(...cards.map((_, i) => SLOTS[i].left + SLOTS[i].width))

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='px-4 sm:px-6 md:px-12 xl:px-20 py-12 md:py-16'
      >
        <div className='grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-10 lg:gap-12 items-center mt-6'>

          {/* عمود الصور المتدرجة */}
          <div className='order-2 lg:order-0 min-w-0 flex flex-col items-center lg:items-start gap-6'>

            {/* الـ canvas: مقاس ثابت النسبة زي الديزاين، وكل كرت متحدد مكانه ومقاسه بالنسبة المئوية */}
            <div
              className='relative w-full mx-auto lg:mx-0'
              style={{
                maxWidth: canvasW,
                aspectRatio: `${canvasW} / ${CANVAS_H}`,
                containerType: 'inline-size',
              }}
            >
              {cards.map((project, i) => {
                const slot = SLOTS[i]
                const isActive = i === 0

                const entryProps = isActive
                  ? {}
                  : {
                      variants: projectVariants,
                      initial: { x: slot.enterX },
                      whileInView: 'visible',
                      viewport: { once: true },
                    }

                return (
                  <motion.div
                    key={i}
                    {...entryProps}
                    whileHover={{ y: -12 }}
                    onClick={
                      isActive
                        ? undefined
                        : () => setActiveIndex(projectsData.findIndex((p) => p.id === project.id))
                    }
                    className={`absolute overflow-hidden border-solid border-white bg-white group ${
                      isActive
                        ? 'shadow-[10px_14px_24px_rgba(0,0,0,0.25)]'
                        : 'cursor-pointer shadow-[8px_10px_18px_rgba(0,0,0,0.22)]'
                    }`}
                    style={{
                      left: pct(slot.left, canvasW),
                      top: pct(slot.top, CANVAS_H),
                      width: pct(slot.width, canvasW),
                      height: pct(slot.height, CANVAS_H),
                      zIndex: slot.z,
                      borderWidth: cq(slot.border, canvasW),
                      borderRadius: cq(slot.radius, canvasW),
                    }}
                  >
                    <img
                      src={project.imageUrl || slot.fallback}
                      alt={project.title}
                      draggable='false'
                      className='absolute inset-0 w-full h-full object-cover select-none'
                    />
                    {!isActive && (
                      <div
                        className={`absolute inset-0 ${slot.overlay} group-hover:bg-black/10 transition-colors duration-200 pointer-events-none`}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* أزرار التنقل */}
            {projectsData.length > 1 && (
              <div className='flex items-center gap-3 justify-center lg:justify-start w-full'>
                <NavArrowButton type='prev' onClick={goToPrev} />
                <NavArrowButton type='next' onClick={goToNext} />
              </div>
            )}
          </div>

          {/* العمود اليمين: العنوان + النص والخلفية */}
          <div className='min-w-0 flex flex-col gap-6'>

          {/* عنوان السكشن */}
          <SectionTitle
            subtitle="ما تود طلبه" 
            title="منتجاتنا" 
            highlightedText="وخدماتنا" 
          />

          {/* عمود النص والخلفية */}
          <div className='relative w-full min-h-[380px] sm:min-h-[440px] lg:h-[483px] flex flex-col justify-center items-center p-6 sm:p-8 text-right dir-rtl'>
            <svg
              className='absolute inset-0 m-auto w-full h-full -z-10 pointer-events-none'
              viewBox='0 0 415 483'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
            >
              <path
                d='M0 103.077C0 83.8394 13.6943 67.3265 32.5999 63.7675L367.6 0.702747C392.225 -3.93295 415 14.9549 415 40.0123V442.388C415 467.826 391.569 486.801 366.687 481.515L31.6872 410.342C13.2119 406.417 0 390.103 0 371.215V103.077Z'
                fill='url(#paint0_linear_1_876)'
                fillOpacity='0.04'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1_876'
                  x1='415'
                  y1='241.78'
                  x2='0'
                  y2='241.78'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#97C528' />
                  <stop offset='1' stopColor='white' />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='z-10 text-center lg:text-right w-full max-w-lg'
            >
              <h3 className='text-xl sm:text-2xl font-bold mb-3 text-gray-800'>{activeProject.title}</h3>
              <p dir='rtl' className='text-gray-600 text-xs sm:text-sm leading-6 sm:leading-7'
              dangerouslySetInnerHTML={{ __html: activeProject.description }}/>

              <div className='flex justify-center lg:justify-end'>
                <Link to={activeProject.linkUrl}>
                  <Button variants='primary' className='mt-6 px-15'>المزيد</Button>
                </Link>
              </div>
            </motion.div>
          </div>

          </div>
        </div>
      </motion.div>

      <LineBreak />
    </>
  )
}