import React from 'react'
import { useLocation } from 'react-router-dom'
import breadCrumbBg from '../../../assets/breadCrumbBg.png'

const routeLabels = {
  "": "الرئيسية",
  "aboutUs": "عن الموقع",
  "products": "الخدمات والمنتجات",
  "contactUs": "تواصل معنا",
  "projects": "مشاريعنا",
  "blog": "المدونة",
  "shop": "المتجر الالكتروني",
  "singleProject": "اسم المشروع",
  "singlePodcast": "عنوان البودكاست",
  "singleNew": "عنوان الخبر",
  "terms": "الشروط و الاحكام",
};

const getLabel = (segment) => {
  return routeLabels[segment] || segment.replace(/-/g, ' ');
};

export default function BreadCrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // جلب اسم الصفحة الحالية فقط للعرض في المنتصف
  const currentSegment = pathSegments[pathSegments.length - 1] || "";
  const pageTitle = getLabel(currentSegment);

  return (
    <div dir='rtl' className='max-w-8xl mx-auto px-4 sm:px-6 my-4'>
      {/* الكارت الرئيسي بالحواف الدائرية والبوردر والارتفاع المضبوط */}
      <div className='relative h-44 sm:h-52 md:h-60 w-full rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm flex items-center justify-center'>
        
        {/* صورة الخلفية الخضراء */}
        <img 
          src={breadCrumbBg} 
          alt="Banner Background" 
          className='absolute inset-0 w-full h-full object-cover'
        />

        {/* النص في المنتصف مع الشرطات الزخرفية فوق الحرف الأول */}
        <div className='relative z-10 flex items-center justify-center text-center'>
          <div className='relative inline-block'>
            {/* الشرطات الزخرفية باللون الأبيض أعلى يسار/يمين النص المطابقة للصورة */}
              <svg className='absolute -left-12 -top-10' width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_2651)">
              <path d="M47.8998 31.388C48.8462 31.2661 48.506 29.1014 46.479 22.1585C44.3285 14.8104 43.5868 13.2678 42.5691 13.7924C41.1785 14.5312 46.364 31.5456 47.8998 31.388Z" fill="white"/>
              <path d="M16.3251 43.4689C16.8906 46.2679 17.4431 46.5308 23.9565 47.1154C30.6832 47.7263 31.9337 47.5984 32.1526 46.3473C32.5401 44.0771 30.8107 43.3445 22.5281 42.174C16.4169 41.3139 15.9077 41.403 16.3251 43.4689Z" fill="white"/>
              <path d="M22.8217 26.0502C23.2017 28.0681 23.7497 28.7204 26.6148 30.6109C35.1354 36.1864 40.7793 40.8449 39.961 36.9317C39.6378 35.3323 38.1607 34.1324 28.411 27.2793C23.0034 23.5164 22.3311 23.347 22.8217 26.0502Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_1_2651">
              <rect width="45.6083" height="45.6083" fill="white" transform="translate(28.0713 64.0175) rotate(-127.987)"/>
              </clipPath>
              </defs>
              </svg>
            <h1 className='font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide'>
              {pageTitle}
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
}