import React from 'react';
import StarsPattern from '../../AboutUs/components/StarsPattern';

export default function AboutUsCard({ icon: Icon, title, description, size = 'normal' }) {
  const isLarge = size === 'large';

  return (
    <div dir="rtl" className={`relative overflow-hidden rounded-4xl bg-linear-to-b from-[#589E0842] to-[#376700] text-white/85 p-6 sm:p-8 flex flex-col items-center text-center shadow-3xl transition-all duration-300 ${
        isLarge ? 'w-full min-w-[457px] min-h-[350px] sm:min-h-[370px]' : 'w-full min-w-[374px] min-h-[270px] sm:min-h-[330px]'}`}>
    
    {/* نجوم الخلفية الزخرفية في الأعلى */}
      <StarsPattern className="absolute top-4 left-0 w-full px-4 opacity-80 pointer-events-none" />

      {/* دائرة الأيقونة المنتصفة */}
      <div
        className={`relative z-10 my-auto rounded-full bg-[#528C14] border-4 border-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 ${
          isLarge ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20 sm:w-22 sm:h-22'
        }`}
      >
        {Icon && <Icon className={`text-white ${isLarge ? 'w-12 h-12' : 'w-9 h-9'}`} />}
      </div>

      {/* المحتوى النصي */}
      <div className="relative z-10 mt-auto flex flex-col gap-2">
        <h3 className={`font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
          {title}
        </h3>
        <p className={`leading-relaxed text-lime-100 font-medium ${isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
          {description}
        </p>
      </div>
    </div>
  );
}