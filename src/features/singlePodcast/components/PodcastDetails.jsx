import React from 'react'
import Skeleton from '../../shared/skeleton/Skeleton'

// skeleton لصفحة البودكاست: كارت المشغل + النص والصورة
// (بيتحط جوه نفس الـ wrapper بتاع SinglePodcast، فبيرجع Fragment)
export function PodcastPageSkeleton() {
  const textWidths = ['w-full', 'w-full', 'w-11/12', 'w-full', 'w-10/12', 'w-full', 'w-2/3'];

  return (
    <>
      {/* كارت المشغل */}
      <Skeleton rounded="rounded-[2.5rem]" className="w-full h-80 md:h-72" />

      {/* النص والصورة */}
      <div className='w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 my-10'>
        <div className='flex-1 w-full flex flex-col gap-3'>
          {textWidths.map((w, i) => (
            <Skeleton key={i} rounded="rounded-md" className={`h-4 ${w}`} />
          ))}
        </div>
        <Skeleton rounded="rounded-3xl" className='flex-1 w-full h-[400px] md:h-[450px]' />
      </div>
    </>
  )
}

export default function PodcastDetails({ content, image }) {
  return (
    <div className='font-secondary w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 text-lg text-right font-light text-[#777777] my-10'>
      <div dir='rtl' className='flex-1 text-right leading-8'
      dangerouslySetInnerHTML={{ __html: content }}/>

    {image && (
      <div className='flex-1 w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm shrink-0'>
        <img
          src={image}
          alt="Podcast Details"
          className='w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105'
        />
      </div>
      )}
    </div>
  )
}