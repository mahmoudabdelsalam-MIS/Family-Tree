import React, { useState } from 'react'
import { BarChart3 } from 'lucide-react'

export default function FaqSection({faqs}) {  
  const [activeId, setActiveId] = useState(faqs[0].id)
  const activeFaq = faqs.find((item) => item.id === activeId)

  return (
    <section className="py-6 md:py-16 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto bg-[#E9F1EB] rounded-3xl sm:rounded-4xl p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* عمود الأسئلة (يمين، خلفية خضراء) */}
          <div className="bg-primary rounded-2xl p-5 sm:p-8 flex flex-col h-[320px] lg:h-[420px]">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 shrink-0">بعض الأسئلة الشائعة</h3>

            <div className="flex flex-col gap-2 overflow-y-auto pl-2 faq-scroll flex-1">
              {faqs.map((item) => {
                const isActive = item.id === activeId
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`text-right px-4 py-3 rounded-xl font-semibold text-xs sm:text-base transition-colors shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#ECE9E980] text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.question}
                  </button>
                )
              })}
            </div>
          </div>
            
          {/* عمود الإجابة (يسار) */}
          <div className="flex flex-col gap-4 px-2 sm:px-5 py-2">
            <h3 className="text-lg sm:text-xl font-bold text-secondary px-2">الإجابة</h3>
            
            <div className='py-1'>
              {/* تم جعل الارتفاع تلقائياً (h-auto) مع min-h لضمان التمدد بسلاسة حسب طول النص */}
              <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 h-auto min-h-[140px] flex items-center">
                <p className="text-gray-600 text-xs sm:text-sm leading-7 sm:leading-8 font-semibold w-full">
                  {activeFaq.answer}
                </p>
              </div>
            </div>

            <button
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center text-white cursor-pointer"
              aria-label="المزيد"
            >
              <BarChart3 size={18} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .faq-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .faq-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .faq-scroll::-webkit-scrollbar-thumb {
          background: white;
          border-radius: 10px;
        }
        .faq-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.85);
        }
      `}</style>
    </section>
  )
}