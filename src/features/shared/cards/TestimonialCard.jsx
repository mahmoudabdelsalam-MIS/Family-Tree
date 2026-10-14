// components/shared/cards/TestimonialCard.jsx
import React from 'react'
import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ name, avatar, rating = 5, text }) {
  return (
    <div className='relative bg-white rounded-2xl shadow-sm p-6 overflow-hidden border-2 border-white hover:border-primary transition-all duration-300 h-[210px] flex flex-col justify-between'>

      {/* أيقونة الاقتباس الباهتة في الخلفية */}
      <Quote
        size={90}
        className='absolute bottom-0 left-4 text-gray-100 pointer-events-none'
        fill='currentColor'
        strokeWidth={0}
      />

      {/* الهيدر (الصورة، الاسم، التقييم) */}
      <div className='relative bg-gray-100 py-3 px-4 rounded-2xl z-10 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'text-amber-400' : 'text-gray-200'}
              fill='currentColor'
            />
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <h4 className='font-bold text-secondary text-sm md:text-base'>{name}</h4>
          <img
            src={avatar}
            alt={name}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>

      {/* نص التقييم بثبات المساحة */}
      <div className='relative z-10 flex-1 flex items-center mt-3'>
        <p className='text-gray-500 text-sm leading-6 line-clamp-3 w-full'>
          {text}
        </p>
      </div>

    </div>
  )
}