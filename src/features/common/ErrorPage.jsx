import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ServerCrash, Home, RefreshCcw } from 'lucide-react'
import Button from '../shared/button/Button'

export default function ErrorPage() {
  const navigate = useNavigate()

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <section className='min-h-[80vh] flex items-center'>
      <div className="py-5 px-3 w-full">

        <div className='flex justify-center items-center py-6'>
          <div className='relative text-primary w-56 h-32 rounded-2xl bg-linear-to-tl from-primary/5 to-primary/10 shadow-md border border-primary/20 flex justify-center items-center'>
            <ServerCrash size={64} strokeWidth={1.5} />
            <span className='absolute -top-3 -left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full'>
              500
            </span>
          </div>
        </div>

        <div className='bg-white rounded-3xl flex flex-col items-center justify-center gap-2 max-w-xl mx-auto text-center px-4 py-2'>
          <p className='text-4xl sm:text-5xl font-extrabold py-2'>عذراً، حدث خطأ غير متوقع!</p>
          <p className='text-lg sm:text-xl font-medium text-gray-400'>
يبدو أن هناك مشكلة تقنية من جانبنا. فريقنا يعمل على إصلاحها الآن، يمكنك تجربة إعادة تحميل الصفحة أو العودة للصفحة الرئيسية.            </p>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4 py-8'>

          <Button 
          variant={"secondary"}
          onClick={reloadPage}
          rounded={"xl"}
          className='flex items-center gap-2 py-3 px-8'
          >
            <RefreshCcw size={18}/>
            اعادة المحاولة
          </Button>
        </div>

      </div>
    </section>
  )
}