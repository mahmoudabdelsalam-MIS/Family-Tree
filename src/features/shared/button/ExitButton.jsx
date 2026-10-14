import { X } from 'lucide-react'
import React from 'react'

export default function ExitButton({ type = 'button', arialabel = 'اغلاق', size = 'md', onClick }) {
  
  const sizes = {
    sm: {
      icon: "w-4 h-4",
      button: "w-8 h-8" 
    },
    md: {
      icon: "w-5 h-5",
      button: "w-10 h-10"
    },
    lg: {
      icon: "w-6 h-6",
      button: "w-12 h-12"
    }
  }

  const currentSize = sizes[size] || sizes.md

  return (
    <button
      type={type}
      aria-label={arialabel}
      onClick={onClick}
      className={`absolute right-6 top-6 rounded-full bg-primary text-white transition hover:bg-primary/80 cursor-pointer flex items-center justify-center shrink-0 ${currentSize.button}`}
    >
      <X className={currentSize.icon} />
    </button>
  )
}