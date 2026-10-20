import React from 'react';
import Skeleton from './Skeleton';

// نسخة skeleton من كارت المقال/البودكاست (SingleProductCard)
// بتنسخ نفس الـ padding والـ aspect والحواف عشان الارتفاع يطابق الكارت الحقيقي
export default function CardSkeleton({ className = '' }) {
  return (
    <div className={`rounded-[40px] bg-white p-3 pb-6 ${className}`}>
      {/* الصورة */}
      <Skeleton className="aspect-[3/2] w-full" rounded="rounded-[30px]" />

      {/* التاريخ والوقت */}
      <div className="mt-4 flex items-center justify-between gap-2 px-1">
        <Skeleton className="h-4 w-28" rounded="rounded-md" />
        <Skeleton className="h-4 w-14" rounded="rounded-md" />
      </div>

      {/* العنوان (سطرين) */}
      <div className="mt-3 flex flex-col gap-2 px-1">
        <Skeleton className="h-5 w-full" rounded="rounded-md" />
        <Skeleton className="h-5 w-2/3" rounded="rounded-md" />
      </div>
    </div>
  );
}