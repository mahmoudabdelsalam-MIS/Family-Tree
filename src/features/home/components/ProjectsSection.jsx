import React, { useState } from 'react'
import { PanelsTopLeft, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

import project1 from '../../../assets/project1.png'
import project2 from '../../../assets/project2.jpg'
import project3 from '../../../assets/project3.png'
import project4 from '../../../assets/project4.jpg'
import { Link } from 'react-router-dom';
import NavArrowButton from '../../shared/button/NavArrowButton';
import LineBreak from '../../shared/break/LineBreak';
import Button from '../../shared/button/Button';

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, duration: 1.5 }
    }
  }

  const projectVariants = {
    visible: {
      opacity: 1, x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const projectsData = [
    {
      id: 1,
      title: "تطبيق صلة",
      description: "منصة رقمية مبتكرة تُعيد إحياء مفهوم صلة الرحم وتعزيز الترابط العائلي بأسلوب عصري؛ يوفر التطبيق تذكيرات ذكية للمناسبات والزيارات، ويُسهل التواصل التفاعلي بين الأقارب للحد من الجفاء الاجتماعي وتعميق الأواصر الأسرية.",
      image: project1,
      link: "/singleProject"
    },
    {
      id: 2,
      title: "منصة شجرة العائلة",
      description: "حل رقمي متكامل لتوثيق الأنساب والتاريخ العائلي وتتبع شجرات العائلات عبر الأجيال، يُتيح للمستخدمين حفظ الصور والوثائق التاريخية والقصص المأثورة ضمن بيئة تفاعلية وآمنة تضمن صون التراث الهوياتي للأسر.",
      image: project2,
      link: "/singleProject"
    },
    {
      id: 3,
      title: "تطبيق تواصل أسر آل محمد",
      description: "مجتمع رقمي خاص ومُغلق يُسهل التواصل اليومي بين أفراد العائلة، يشتمل على مفكرة لمتابعة الأخبار والفعاليات الأسرية، ونظام لتنظيم اللقاءات والمناسبات، مع مساحة للمشاركة المجتمعية والدعم المتبادل بين الأقارب.",
      image: project3,
      link: "/singleProject"
    },
    {
      id: 4,
      title: "هوية Valens البصرية والبراندينج",
      description: "مشروع بناء هوية متكامل يعكس قيم علامة Valens ورؤيتها؛ شمل تصميم الشعار ونظام الألوان والهوية البصرية، بالإضافة إلى تطبيقات المطبوعات الرسمية، أدوات المكتب، والملفات التعريفية للشركة لتعزيز حضورها الاحترافي في السوق.",
      image: project4,
      link: "/singleProject"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projectsData[activeIndex];
  const otherProjects = projectsData.filter(proj => proj.id !== activeProject.id);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className='px-4 sm:px-6 md:px-20 py-12 md:py-16'
    >

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-6'>

        {/* عمود الصور المتدرجة */}
        <div className='flex flex-col items-center lg:items-start gap-6'>

          {/* تم تعديل الارتفاع والعرض ليكون متجاوباً تماماً في الموبايل والديسك توب */}
          <div className='relative w-full h-[280px] sm:h-[360px] md:h-[420px] max-w-xl mx-auto lg:mx-0'>

            {otherProjects[2] && (
              <motion.div
                variants={projectVariants}
                initial={{ x: -100 }}
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => setActiveIndex(projectsData.findIndex(p => p.id === otherProjects[2].id))}
                className='absolute right-[5%] top-[22%] w-[32%] h-[62%] z-6 hover:-translate-y-3 transition-all duration-200 cursor-pointer group'
              >
                <img
                  src={otherProjects[2].image}
                  alt={otherProjects[2].title}
                  draggable='false'
                  className='w-full h-full rounded-2xl md:rounded-3xl object-cover border-2 sm:border-4 border-white shadow-md select-none'
                />
                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/20 rounded-2xl md:rounded-3xl transition-colors duration-200 pointer-events-none'></div>
              </motion.div>
            )}

            {otherProjects[1] && (
              <motion.div
                variants={projectVariants}
                initial={{ x: -70 }}
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => setActiveIndex(projectsData.findIndex(p => p.id === otherProjects[1].id))}
                className='absolute right-[15%] top-[14%] w-[38%] h-[72%] z-7 hover:-translate-y-3 transition-all duration-200 cursor-pointer group'
              >
                <img
                  src={otherProjects[1].image}
                  alt={otherProjects[1].title}
                  draggable='false'
                  className='w-full h-full rounded-2xl md:rounded-3xl object-cover border-2 sm:border-4 border-white shadow-lg select-none'
                />
                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/20 rounded-2xl md:rounded-3xl transition-colors duration-200 pointer-events-none'></div>
              </motion.div>
            )}

            {otherProjects[0] && (
              <motion.div
                variants={projectVariants}
                initial={{ x: -40 }}
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => setActiveIndex(projectsData.findIndex(p => p.id === otherProjects[0].id))}
                className='absolute right-[25%] top-[6%] w-[42%] h-[85%] z-8 hover:-translate-y-2 transition-all duration-300 cursor-pointer group'
              >
                <img
                  src={otherProjects[0].image}
                  alt={otherProjects[0].title}
                  draggable='false'
                  className='w-full h-full rounded-2xl md:rounded-3xl object-cover border-2 sm:border-4 border-white shadow-xl select-none'
                />
                <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 rounded-2xl md:rounded-3xl transition-colors duration-200 pointer-events-none'></div>
              </motion.div>
            )}

            <div className='absolute left-0 top-0 w-[58%] h-full z-9 hover:-translate-y-3 transition-all duration-200 cursor-pointer'>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                draggable='false'
                className='w-full h-full rounded-2xl sm:rounded-3xl object-cover border-4 sm:border-6 border-white shadow-2xl select-none'
              />
            </div>

          </div>

          {/* أزرار التنقل */}
          <div className='flex items-center gap-3 justify-center lg:justify-start w-full'>
            <NavArrowButton type="prev" onClick={goToPrev} />
            <NavArrowButton type="next" onClick={goToNext} />
          </div>

        </div>

        {/* عمود النص والخلفية */}
        <div className="relative w-full min-h-[380px] sm:min-h-[440px] lg:h-[483px] flex flex-col justify-center items-center p-6 sm:p-8 text-right dir-rtl">
          <svg
            className="absolute inset-0 m-auto lg:ml-20 w-full h-full -z-10 pointer-events-none"
            viewBox="0 0 415 483"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 103.077C0 83.8394 13.6943 67.3265 32.5999 63.7675L367.6 0.702747C392.225 -3.93295 415 14.9549 415 40.0123V442.388C415 467.826 391.569 486.801 366.687 481.515L31.6872 410.342C13.2119 406.417 0 390.103 0 371.215V103.077Z"
              fill="url(#paint0_linear_1_876)"
              fillOpacity="0.04"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_876"
                x1="415"
                y1="241.78"
                x2="0"
                y2="241.78"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#97C528" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="z-10 text-center lg:text-right w-full max-w-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">{activeProject.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-6 sm:leading-7">
              {activeProject.description}
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link to={activeProject.link}>
                <Button variants="primary" className="mt-6">المزيد</Button>
              </Link>
            </div>
          </motion.div>
        </div>        
      </div>

    </motion.div>
    
    <LineBreak />
    </>
  )
}