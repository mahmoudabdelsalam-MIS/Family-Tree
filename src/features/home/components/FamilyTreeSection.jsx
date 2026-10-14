import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';

// استبدل هذا بمسار الصورة الكبيرة الكاملة التي تجمع خلفية المخطط والعائلة
import heroBgImage from '../../../assets/familytreeBg.jpg'; 

export default function AboutUsSection() {
  const features = [
    { badge: 'رؤيتنا', text: 'مجتمع عائلي مترابط، يحافظ على تاريخه وقيمه وينقلها للأجيال القادمة بكل فخر.' },
    { badge: 'رسالتنا', text: 'تمكين العائلات من توثيق معلوماتها وبناء جسور تواصل حديثة وآمنة بينهم.' },
    { badge: 'قيمنا', text: 'الترابط الأسري – الخصوصية – المصداقية والحفاظ على التراث بهوية عصريّة.' },
    { badge: 'هدفنا', text: 'أن نكون المنصة الأولى لتوثيق تاريخ العائلات وتعزيز تواصلهم بأسلوب بسيط وحديث.' },
    { badge: 'ما نؤمن به', text: 'العائلة هي الأساس... وتوثيق روابطها استثمار لمستقبل أكثر ترابطاً.' },
  ];

  return (
    <div className='bg-[#f5f5f5]'>
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 text-secondary ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
{/* ------------ 1. الجانب الأيسر (صورة خلفية + الكارتين فوقها) ------------ */}
<div className="lg:col-span-6 relative w-full  bg-[#f5f5f5] p-2 md:p-3 rounded-[2.5rem]">
  {/* الصورة الكبيرة الموحدة في الخلفية مع حواف دائرية */}
  <div className="w-full h-full rounded-4xl overflow-hidden">
    <img 
      src={heroBgImage} 
      alt="شجرة العائلة والأنشطة" 
      className="w-full h-full object-cover object-center "
    />
  </div>

  {/* الكارت الأول: أعلى اليسار (يغطي ربع المساحة مع إطار أبيض يفصله عن الصورة) */}
  <div className="absolute top-0 left-0 w-[45%] h-[50%] bg-[#f5f5f5] p-2 md:p-4 rounded-[2.5rem]">
    <div className="w-full h-full bg-primary rounded-[2rem] p-4 md:p-6 flex flex-col items-center justify-center text-center text-white shadow-sm">
      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/30 flex items-center justify-center mb-3 backdrop-blur-sm shrink-0">
        <Users className="w-7 h-7 md:w-9 md:h-9 text-white" />
      </div>
      <p className="text-xs md:text-sm font-semibold leading-relaxed">
        هنا تروى الحكاية... حيث تبدأ الجذور وتنمو المحبة جيلاً بعد جيل.
      </p>
    </div>
  </div>

  {/* الكارت الثاني: أسفل اليمين (يغطي ربع المساحة مع إطار أبيض يفصله عن الصورة) */}
  <div className="absolute bottom-0 right-0 w-[45%] h-[50%] bg-[#f5f5f5] p-2 md:p-4 rounded-[2.5rem]">
    <div className="w-full h-full bg-primary rounded-[2rem] p-4 md:p-6 flex flex-col items-center justify-center text-center text-white shadow-sm">
      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/30 flex items-center justify-center mb-3 backdrop-blur-sm shrink-0">
        <ShieldCheck className="w-7 h-7 md:w-9 md:h-9 text-white" />
      </div>
      <p className="text-xs md:text-sm font-semibold leading-relaxed">
        نحافظ على بيانات عائلتك بأعلى معايير الحماية والسرية.
      </p>
    </div>
  </div>

</div>

        {/* ------------ 2. الجانب الايمن (النصوص والقيم) ------------ */}
        <div dir='rtl' className="lg:col-span-6 flex flex-col items-start gap-4">
          
          {/* البادج العلوي */}
          <span className="px-5 py-1.5 rounded-full bg-primary text-gray-100 text-xs md:text-sm font-semibold">
            مرحباً بك في شجرة العائلة
          </span>

          {/* العنوان الرئيسي */}
          <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight mt-1">
            نوثّق جذورنا... <br />
            لنرسم مستقبل أجيالنا
          </h2>

          {/* الفقرة التعريفية */}
          <p className="text-gray-500 text-xs md:text-sm font-semibold leading-relaxed mt-2 text-justify">
            نحن في شجرة العائلة نهدف إلى تعزيز الترابط العائلي وتوثيق المعلومات لتثري الأجيال القادمة، 
            وذلك من خلال مجموعة من المنتجات والخدمات المختلفة. حيث أن تصميم الشجرة العائلية يساعد 
            على الحفاظ على تراث العائلة وتاريخها ونسبها. أما الخدمات اللوجستية فتساعد على تعزيز الترابط والتآلف داخل العائلة.
          </p>

          {/* قائمة نقدم لك */}
          <div className="w-full mt-4 flex flex-col gap-3">
            <h3 className="text-secondary text-md font-bold mb-1">نُقدّم لك</h3>
            
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="shrink-0 w-20 text-center py-0.5 rounded-full bg-primary text-white text-sm font-bold">
                  {item.badge}
                </span>
                <p className="text-xs md:text-sm font-medium text-gray-600 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
    </div>
  );
}