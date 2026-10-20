import React from 'react'

export default function SectionTitle({ 
  subtitle = "ما يميزنا", 
  title = "خصائص", 
  highlightedText = "",
  className = "",
  light = false // بروب جديد لتفعيل الثيم الأبيض
}) {
  return (
    <div dir='rtl' className={`flex flex-col gap-1  px-2 sm:px-4 items-start ${className}`}>
      {/* العنوان الفرعي مع النقطة */} 
      <div className='flex items-center gap-2'>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${light ? 'bg-white' : 'bg-primary'}`} />
        <p className={`text-sm sm:text-base font-medium ${light ? 'text-white' : 'text-[#3E3B36]'}`}>
          {subtitle}
        </p>
      </div>
      
      {/* العنوان الرئيسي مع شريط الخلفية */}
      <h2 className={`relative w-fit isolate text-[26px] sm:text-4xl md:text-5xl font-extrabold flex flex-wrap items-center gap-2 sm:gap-3 ${light ? 'text-white' : 'text-gray-800'}`}>
        <span>{title}</span>
        {highlightedText && (
          <span className={light ? 'text-white' : 'text-primary'}>{highlightedText}</span>
        )}
        
        {/* خلفية التحديد (متمركزة دائماً وآمنة عند التفاف النص) */}
        <span 
          aria-hidden='true' 
          className={`absolute bottom-1 sm:bottom-1.5 left-[47%] -translate-x-1/2 w-[105%] h-3 sm:h-3.5 lg:h-4 -z-10 ${
            light ? 'bg-white/20' : 'bg-[#0B985061]/40'
          }`} 
        />
      </h2>
    </div>
  )
}