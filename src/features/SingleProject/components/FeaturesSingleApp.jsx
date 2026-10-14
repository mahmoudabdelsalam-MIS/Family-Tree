import React from 'react'
import { Check , Heart ,Bookmark } from 'lucide-react';

import SingleFeatureProject from './SingleFeatureProject'

export default function FeaturesSingleApp() {
  return (
    <div className='flex flex-wrap justify-center items-center gap-5 mx-auto px-10'>
      <SingleFeatureProject icon={Check} title={"استخدام Core PHP"} desc={"إنشاء نوافذ منبثقة مخصّصة وعرض الرسالة المناسبة في الوقت المناسب"}/>
      <div className='hidden md:block w-0.5 h-30 bg-gray-300'/>
      <SingleFeatureProject icon={Bookmark} title={"قابل للتخصيص"} desc={"يمكن إعادة تصميم التطبيق أو تعديل أي جزء منه بسهولة لتحديث الميزات "}/>
      <div className='hidden md:block w-0.5 h-30 bg-gray-300'/>
      <SingleFeatureProject icon={Heart} title={"الدعم السريع"} desc={"دعم سريع من الفريق المطوّر أو الشركة لضمان سير العمل دون توقف"}/>
    </div>
  )
}
