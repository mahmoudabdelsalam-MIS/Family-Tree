import React from 'react';
import Skeleton from '../../shared/skeleton/Skeleton';

// skeleton لأول سكشن في صفحة المشروع (MainApp): عنوان + جملة + أزرار المتاجر + الدايرة
export default function MainAppSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="جاري تحميل المشروع"
      className='relative flex flex-col justify-center items-center py-10 md:py-15 px-4 md:px-8 gap-6 md:gap-10 overflow-hidden'
    >
      {/* العنوان الكبير (سطرين) */}
      <div className='w-full max-w-2xl flex flex-col items-center gap-3 px-2'>
        <Skeleton rounded='rounded-xl' className='h-7 sm:h-8 md:h-9 w-full' />
        <Skeleton rounded='rounded-xl' className='h-7 sm:h-8 md:h-9 w-3/4' />
      </div>

      {/* الجملة تحت العنوان */}
      <Skeleton rounded='rounded-lg' className='h-5 sm:h-6 w-72 max-w-full' />

      {/* أزرار المتاجر */}
      <div className='flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2'>
        <Skeleton rounded='rounded-xl' className='h-[52px] w-[160px]' />
        <Skeleton rounded='rounded-xl' className='h-[52px] w-[160px]' />
      </div>

      {/* الدايرة (نفس مقاساتها الحقيقية) */}
      <Skeleton
        rounded='rounded-full'
        className='mt-4 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[65vh] lg:h-[65vh]'
      />
    </div>
  );
}