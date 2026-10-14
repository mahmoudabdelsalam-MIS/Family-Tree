import React, { useEffect, useState } from 'react'
import Button from './Button'
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible , setIsVisible] = useState(false)
    // لاظهار الزر بعد 300 بكسل سكرول
    useEffect(()=>{
        const toogleVisible = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            }else{
                setIsVisible(false)
            }
        }
        // كل ما المستخدم يحرك السكرول لأعلى أو لأسفل، نفّذ الدالة toogleVisible فوراً
    window.addEventListener("scroll" , toogleVisible);
    return() => {
        // وظيفتها حذف مستمع الأحداث (EventListener) لما المكون يختفي من الصفحة (Unmount)
        // لمنع التسريب في الذاكرة (Memory Leak)، لأن لو ما مسحتهاش، المتصفح هيفضل يشغل الدالة دي في الخلفية حتى لو خرجت من الصفحة.
        window.removeEventListener("scroll" , toogleVisible);
    }
    }, [])
    // بترجعه لفوق بطريقه سموز
    const ScrollToTop = () =>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    
  return (
    <div className='fixed bottom-6 right-6 z-50'>
      {isVisible && (
        <button 
            onClick={ScrollToTop}
            className="p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex justify-center items-center cursor-pointer"
            aria-label="Scroll to top"
            >
                <ChevronUp size={24}/>
        </button>
      )}
    </div>
  )
}
