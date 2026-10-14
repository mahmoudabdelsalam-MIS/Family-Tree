import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Users } from 'lucide-react';
import bgcardhero from '../../../assets/bgcardhero.jpg';
import bgcard2 from '../../../assets/bgcard2.png';
import logoCom1 from '../../../assets/logoCom1.png';
import logoCom2 from '../../../assets/logoCom2.png';
import logoCom3 from '../../../assets/logoCom3.png';
import breakSection from '../../../assets/breakSection.png';
import Card from '../../shared/cards/HeroSectionCard';
import LineBreak from '../../shared/break/LineBreak';
import Button from '../../shared/button/Button';

export default function HeroSectionContent() {
  // لوجوهات الشركاء (غيّرها بصورك)
  const partnerLogos = [logoCom1, logoCom2, logoCom3];

  return (
    <section dir="rtl" className="relative w-full max-w-full overflow-x-clip overflow-y-visible pt-25 pb-12">
      {/* النصوص */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5 text-secondary">
        <p className="text-gray-700 text-base font-semibold md:text-xl">بمناسبة اليوم الوطني السعودي 96</p>

        <h1 className="text-3xl md:text-6xl font-extrabold text-secondary leading-tight">
          احتفل بهويتك وخلد <span className="text-primary">شجرة عائلتك</span>
        </h1>

        <p className="text-lg md:text-3xl font-bold text-gray-700">
          خصم 25 % على تصميم المشجرات وتطبيقات العائلة لفترة محدودة
        </p>
        <Link to={"/products"}>
        <Button variant="primary" icon={ShoppingBag}>تسوق الأن</Button>
        </Link>
      </div>

      {/* الكروت (مرتبة من اليمين للشمال زي الصورة) */}
      <div className="max-w-6xl mx-auto mt-14 flex flex-wrap lg:flex-nowrap justify-center items-end gap-4 md:gap-5 mb-10 px-4 lg:px-12 ">
        {/* 1) كارت التطبيق (lg + صورة) */}
        <Card size="lg" variant="image" image={bgcardhero}>
          <div className="m-3 p-3 rounded-2xl border border-gray-300 bg-white/25 backdrop-blur-sm text-white">
            <h3 className="text-sm font-bold mb-1">استكشف تطبيق شجرة العائلة</h3>
            <p className="text-[11px] leading-5 font-semibold">
              كل عائلتك في مكان واحد ، توثيق الانساب ، مشاركة الذكريات ، تعزيز التواصل العائلي بسهولة .
            </p>
          </div>
        </Card>

        {/* 2) الكارت الأزرق (md) */}
        <Card size="md" variant="blue">
          <div className="h-full flex flex-col items-center justify-between text-center p-5">
            <div>
              <p dir='ltr' className="font-bold text-lg">+ 10 k</p>
              <p className="text-sm">شجرة عائلة موثوقة</p>
            </div>
            <Users size={56} strokeWidth={1.2} />
            <p className="text-[11px] leading-5">
              الاف العائلات وثقت تاريخها معنا وبدأت رحلة الحفاظ على ارثها
            </p>
          </div>
        </Card>

        {/* 3) الكارت الأبيض (sm) */}
        <Card size="sm" variant="white" className="self-end">
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <div className="flex -space-x-2 space-x-reverse">
              {partnerLogos.map((logo, i) => (
                <span  key={i} className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white overflow-hidden">
                  {logo && <img src={logo} alt="" className="w-full h-full object-cover" />}
                </span>
              ))}
              <span className="w-9 h-9 rounded-full bg-sky-100 border-2 border-white text-[10px] font-bold flex items-center justify-center">
                +100
              </span>
            </div>
            <p className="text-2xl font-extrabold">+ 100</p>
            <p className="text-sm font-semibold">شريك نجاح</p>
          </div>
        </Card>

        {/* 4) كارت الشجرة (md + صورة) */}
        <Card size="md" variant="image" image={bgcard2} />

        {/* 5) الكارت الأخضر (lg) */}
        <Card size="lg" variant="green">
          <div className="h-full flex flex-col items-start justify-between p-5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < 4 ? 'fill-white' : ''} />
              ))}
            </div>
            
              <div className='flex flex-col items-start justify-center'>
              <p className="text-2xl font-bold ">100 +</p>
              <p className="text-xs text-gray-100 mb-6">تقييم</p>
              </div>
              <p className="text-sm font-light leading-6 w-50">
                تقييمات حقيقية من مستخدمين  وثّقوا تاريخ عائلاتهم واستمتعوا بتجربة سلسة وآمنة
              </p>
            
          </div>
        </Card>

      </div>
      {/* الفاصل السفلي */}
              <LineBreak/>
    </section>
  );
}