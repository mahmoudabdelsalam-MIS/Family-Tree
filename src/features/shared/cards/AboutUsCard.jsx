import React from 'react';
import StarsPattern from '../../aboutUs/components/StarsPattern';

export default function AboutUsCard({ icon: Icon, title, description, size = 'normal' }) {
  const isLarge = size === 'large';

  return (
    <div
      dir="rtl"
      className={`relative overflow-hidden min-w-0 rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#589E0842] to-[#376700] text-white/85 p-5 sm:p-8 flex flex-col items-center text-center shadow-3xl transition-all duration-300 ${
        isLarge
          // الكارت الكبير: تحت lg بياخد عرض كامل بحد أقصى، وفي lg بياخد نصيب أكبر من الصف (1.22) من غير min-w
          ? 'w-full max-w-md mx-auto scale-[1.03] sm:scale-100 lg:max-w-none lg:mx-0 lg:flex-[1.22_1_0%] min-h-[280px] sm:min-h-[350px] lg:min-h-[370px] z-10'
          // الكروت العادية: أصغر قليلاً بالموبايل، وفي lg بتتقاسم الصف بالتساوي
          : 'w-[92%] sm:w-full max-w-md mx-auto lg:max-w-none lg:mx-0 lg:flex-[1_1_0%] min-h-[250px] sm:min-h-[290px] lg:min-h-[330px]'
      }`}
    >

      {/* نجوم الخلفية الزخرفية في الأعلى */}
      <StarsPattern className="absolute top-4 left-0 w-full px-4 opacity-80 pointer-events-none" />

      {/* دائرة الأيقونة المنتصفة */}
      <div
        className={`relative z-10 my-auto rounded-full bg-[#528C14] border-4 border-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 ${
          isLarge ? 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28' : 'w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22'
        }`}
      >
        {Icon && <Icon className={`text-white ${isLarge ? 'w-10 h-10 lg:w-12 lg:h-12' : 'w-8 h-8 lg:w-9 lg:h-9'}`} />}
      </div>

      {/* المحتوى النصي */}
      <div className="relative z-10 flex flex-col gap-5 w-full">
        <h3 className={`font-black text-white ${isLarge ? 'text-xl' : 'text-lg'}`}>
          {title}
        </h3>
        <p className={`leading-relaxed text-lime-100 font-normal ${isLarge ? 'text-xs sm:text-base' : 'text-xs sm:text-sm'}`}>
          {description}
        </p>
      </div>
    </div>
  );
}