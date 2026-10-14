import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PackageSearch, Home, ArrowLeft } from 'lucide-react'
import Button from '../shared/button/Button'

export default function NotFound() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <section className='min-h-[80vh] flex items-center'>
      <div className="py-5 px-3 w-full">

        <div className='flex justify-center items-center py-6'>
          <div className='relative text-primary w-56 h-32 rounded-2xl bg-linear-to-tl from-primary/5 to-primary/10 shadow-md border border-primary/20 flex justify-center items-center'>
            <PackageSearch size={64} strokeWidth={1.5} />
            <span className='absolute -top-3 -left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full'>
              404
            </span>
          </div>
        </div>

        <div className='bg-white rounded-3xl flex flex-col items-center justify-center gap-2 max-w-xl mx-auto text-center px-4 py-2'>
          <p className='text-4xl sm:text-5xl font-extrabold py-2'>للاسف ! لا شيئ هنا</p>
          <p className='text-lg sm:text-xl font-medium text-gray-400'>
            عذراً، هذه الصفحة غير موجودة! لكن لا تقلق، هناك الكثير من المحتوى المميز بانتظارك.
          </p>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4 py-8'>
          <Link to={"/"}>
          <Button
          rounded={"xl"}
          variant={"primary"}
          className='flex items-center gap-2 py-3 px-8'>

            <Home size={18}/>
            الصفحة الرئيسية
          </Button>
          </Link>

          <Button 
          variant={"secondary"}
          onClick={goBack}
          rounded={"xl"}
          className='flex items-center gap-2 py-3 px-8'
          >
            <ArrowLeft size={18}/>
            الصفحه السابقه
          </Button>
        </div>

      </div>
    </section>
  )
}