import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function NavArrowButton({ type = 'next', onClick }) {
  const isPrev = type === 'prev'

  return (
    <button
      onClick={onClick}
      aria-label={isPrev ? 'المشروع السابق' : 'المشروع التالي'}
      className={`w-11 h-11 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
        isPrev
          ? 'bg-primary hover:bg-primary/90 text-white'
          : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm'
      }`}
    >
      {isPrev ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
    </button>
  )
}   