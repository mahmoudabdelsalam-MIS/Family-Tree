import React, { useState } from 'react';
import { puzzle } from '../../../assets/assets';

export default function FloatingActionBadge({ familyIdeasPlatform, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const text = familyIdeasPlatform?.text || "اكتشف عائلتك معنا";
  const externalUrl = familyIdeasPlatform?.url || "https://example.com";
  
  return (
    <div
      dir="ltr"
      className={`relative inline-flex items-center cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(externalUrl, '_blank', 'noopener,noreferrer')}
    >
      {/* المستطيل اللي بيظهر عند الـ Hover */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-14 bg-[#00457B] text-white rounded-full flex items-center shadow-lg transition-all duration-400 ease-in-out whitespace-nowrap overflow-hidden z-10 border-2 border-white/20 ${
          isHovered 
            ? 'w-fit opacity-100 pl-24 pr-6 translate-x-0' 
            : 'max-w-0 opacity-0 pl-0 pr-0 pointer-events-none'
        }`}
      >
        <span dir="rtl" className="text-xs font-bold">
          {text}
        </span>
      </div>

      {/* الدائرة الأساسية للزر */}
      <div
        className="relative z-20 w-20 h-20 rounded-full bg-[#00457B] border-[2px] border-white overflow-hidden flex items-center justify-center text-white shadow-[0px_4px_14px_0px_#005E78EB] transition-transform duration-300 hover:scale-105 shrink-0"
      >
        <img src={puzzle} alt={text} className="w-10 h-10 object-cover" draggable="false" />
      </div>
    </div>
  );
}