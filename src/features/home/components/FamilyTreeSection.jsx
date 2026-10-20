import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import ShapedImage from './ShapedImage';

export default function AboutUsSection({data}) {
  return (
    <div className='bg-[#f5f5f5]'>
    <section className="max-w-7xl mx-auto px-4 md:px-2 pb-10 md:py-15 text-secondary ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
{/* ------------ 1. الجانب الأيسر (صورة خلفية + الكارتين فوقها) ------------ */}
<div className="order-2 md:order-1 lg:col-span-6 relative w-full bg-[#f5f5f5] p-2 md:p-3 rounded-[2.5rem]">
  {/* الصورة الكبيرة الموحدة في الخلفية (نأخذ أول صورة متاحة) */}
  {(data?.tiles?.[1]?.imageUrl || data?.tiles?.[2]?.imageUrl) && (
    <div className="w-full h-full overflow-hidden">
      <ShapedImage 
        src={data?.tiles?.[1]?.imageUrl || data?.tiles?.[2]?.imageUrl} 
        alt={data?.header?.title || "صورة قسم شجرة العائلة"} 
        className="w-full h-full object-cover" 
      />
    </div>
  )}

  {/* الكارت الأول: أعلى اليسار - Family Card */}
  {data?.tiles?.[0]?.tileType === 'text_card' && data?.tiles?.[0]?.icon === 'family' && (
    <div className="absolute top-0 left-0 w-[42.5%] h-[52%] p-2 md:p-4 rounded-[2.5rem]">
      <div className="w-full h-full bg-primary rounded-[2rem] p-4 md:p-6 flex flex-col items-center justify-center text-center text-white shadow-sm">
        <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/52 flex items-center justify-center mb-3 backdrop-blur-sm shrink-0">
          <Users className="w-7 h-7 md:w-9 md:h-9 text-white" />
        </div>
        <p className="text-xs md:text-sm font-bold leading-relaxed">
          {data?.tiles[0].body}
        </p>
      </div>
    </div>
  )}

  {/* الكارت الثاني: أسفل اليمين - Shield Card */}
  {data?.tiles?.[3]?.tileType === 'text_card' && data?.tiles?.[3]?.icon === 'shield-check' && (
    <div className="absolute bottom-0 right-0 w-[42.5%] h-[52%] p-2 md:p-4 rounded-[2.5rem]">
      <div className="w-full h-full bg-primary rounded-[2rem] p-4 md:p-6 flex flex-col items-center justify-center text-center text-white shadow-sm">
        <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/52 flex items-center justify-center mb-3 backdrop-blur-sm shrink-0">
          <ShieldCheck className="w-7 h-7 md:w-9 md:h-9 text-white" />
        </div>
        <p className="text-xs md:text-sm font-bold leading-relaxed">
          {data.tiles[3].body}
        </p>
      </div>
    </div>
  )}

</div>

        {/* ------------ 2. الجانب الايمن (النصوص والقيم) ------------ */}
        <div dir='rtl' className="order-1 md:order-2 lg:col-span-6 flex flex-col items-start gap-4 mt-3">
          
          {/* البادج العلوي */}
          <span className="px-5 py-2 rounded-full bg-primary text-gray-100 text-xs md:text-sm font-normal">
            {data?.header?.badge}
          </span>

          {/* العنوان الرئيسي */}
          <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight mt-1">
            {data?.header?.title}
          </h2>

          {/* الفقرة التعريفية */}
          <p className="text-gray-500 text-xs md:text-sm font-normal leading-relaxed mt-2 text-justify">
            {data?.header?.intro}
          </p>

          {/* قائمة نقدم لك */}
          <div className="w-full mt-4 flex flex-col gap-3">
            <h3 className="text-[#00457B] text-md font-bold mb-1">نُقدّم لك</h3>
            
            {data?.valuePoints?.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="shrink-0 w-20 text-center py-0.5 rounded-full bg-primary text-white text-sm font-bold">
                  {item?.label}
                </span>
                <p className="text-xs md:text-sm font-normal text-[#6A6A6A] leading-snug" 
                dangerouslySetInnerHTML={{ __html: item?.body} }/>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
    </div>
  );
}