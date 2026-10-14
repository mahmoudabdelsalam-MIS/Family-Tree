import React from 'react';
import { MoveLeft } from 'lucide-react';

export default function ContactOption({ 
  title, 
  subtitle, 
  icon: Icon, 
  bgColor, 
  textColor = 'text-white',
  iconBgColor,
  onClick,
  className = ''
}) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative w-full max-w-3xl mx-auto 
        ${bgColor} 
        rounded-2xl p-6 md:p-8 
        flex items-center justify-between
        cursor-pointer hover:shadow-lg transition-all duration-300
        ${className}
      `}
      dir="rtl"
    >
    {/* الأيقونة */}
      <div 
        className={`
          w-14 h-14 rounded-full 
          flex items-center justify-center
          ${iconBgColor || 'bg-white/20'}
        `}
      >
        <div className={textColor}>
          {Icon && <Icon size={28} />}
        </div>
      </div>


    {/* النص */}
      <div className="flex-1 text-right mx-4">
        <h3 className={`${textColor} text-xl md:text-2xl font-bold mb-1`}>
          {title}
        </h3>
        <p className={`${textColor} opacity-80 text-sm md:text-base`}>
          {subtitle}
        </p>
      </div>
    {/* السهم */}
      <div className={`${textColor} opacity-70`}>
        <MoveLeft/>
      </div>
    </div>
  );
}