import React from 'react';

/**
 * بقعة توهج واحدة (blurred spot).
 * className: للتموضع والحجم واللون، مثال:
 *   <GlowSpot className="top-40 left-[15%] w-10 h-10 bg-primary/40" blur="blur-xl" />
 */
export function GlowSpot({ className = '', blur = 'blur-xl' }) {
  return (
    <span aria-hidden="true" className={`absolute rounded-full ${blur} ${className}`}/>
  );
}

//  شريط مائل باهت .

function Beam({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute origin-top w-48 md:w-12 h-95 
        bg-slate-300/50
        [mask-image:linear-gradient(to_bottom,black_50%,transparent)]
        ${className}`}
    />
  );
}

/**
 * طبقة الخلفية الكاملة. حطها كأول عنصر جوه السكشن.
 *
 * <section className="relative overflow-hidden bg-[#f5f5f5]">
 *   <GlowBackground />
 *   <div className="relative z-10"> ...المحتوى... </div>
 * </section>
 */
export default function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden w-full max-w-full">
      {/* تم تصغير حجم الـ Beam على الشاشات الصغيرة لتفادي الخروج عن الشاشة */}
      <Beam className="-top-24 -left-32 md:-left-22 -rotate-45deg" />
      <Beam className="-top-24 -right-32 md:-right-22 rotate-45" />

      {/* بقع التوهج */}
      <GlowSpot className="top-[38%] left-[16%] w-10 h-10 bg-primaryGlow/70" blur="blur-md" />
      <GlowSpot className="top-[52%] right-[4%] w-12 h-12 bg-primaryGlow/70" blur="blur-md" />
    </div>
  );
}