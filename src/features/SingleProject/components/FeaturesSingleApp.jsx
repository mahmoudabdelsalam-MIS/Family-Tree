import React from 'react'
import { Check, Heart, Bookmark, ShieldCheck, Star, Users, Globe } from 'lucide-react';

import SingleFeatureProject from './SingleFeatureProject'

// أسماء الأيقونات اللي بيبعتها الباك إند -> أيقونات lucide
// لو جه اسم مش موجود هنا بيستخدم Check. ضيف أيقونات جديدة هنا لما تحتاج.
const ICONS = {
  'check': Check,
  'check-circle': Check,
  'heart': Heart,
  'bookmark': Bookmark,
  'shield-check': ShieldCheck,
  'star': Star,
  'users': Users,
  'globe': Globe,
}

const getIcon = (name) =>
  (typeof name === 'string' && ICONS[name.trim().toLowerCase()]) || Check

export default function FeaturesSingleApp({ features, subtitle }) {
  // أي عنصر من غير عنوان ولا وصف بيتشال، ولو features مش مصفوفة بتتعامل كفاضية
  const items = (Array.isArray(features) ? features : []).filter(
    (f) => f && (f.title || f.body)
  )

  // مفيش مميزات: منعرضش السكشن خالص
  if (items.length === 0) return null

  return (
    <div dir="rtl" className='flex flex-wrap justify-center items-center gap-8 mx-auto px-10 py-5'>

      {/* قسم العنوان في الأعلى بالكامل */}
      <div className='w-full flex flex-col items-center justify-center text-center gap-2 mb-6'>
        <h2 className='font-extrabold text-2xl sm:text-3xl md:text-5xl max-w-2xl leading-tight text-gray-900'>
          ما يميز تطبيقنا...
        </h2>

        {subtitle && (
          <p className='font-bold text-sm sm:text-base md:text-lg text-gray-600'>
            {subtitle}
          </p>
        )}
      </div>

      {/* الكروت والفواصل في الأسفل (الفاصل بين الكروت بس، مش بعد آخر كارت) */}
      <div className='flex flex-wrap justify-center items-center gap-5 w-full'>
        {items.map((feature, index) => (
          <React.Fragment key={feature.id ?? index}>
            <SingleFeatureProject
              icon={getIcon(feature.icon)}
              title={feature.title || ''}
              desc={feature.body || ''}
            />
            {index < items.length - 1 && (
              <div className='hidden md:block w-0.5 h-30 bg-gray-300'/>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  )
}