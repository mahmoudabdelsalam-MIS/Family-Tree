import React from 'react';
import Skeleton from '../../shared/skeleton/Skeleton';

// skeleton لقسم FamilyTreeSection: صورة بكارتين فوقها (يسار) + بادج وعنوان وفقرة وقايمة قيم (يمين)
export default function FamilyTreeSkeleton() {
  return (
    <div className="bg-[#f5f5f5]" aria-busy="true" aria-label="جاري تحميل القسم">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* الصورة + الكارتين فوقها */}
          <div className="lg:col-span-6 relative w-full p-2 md:p-3">
            <Skeleton rounded="rounded-[2.5rem]" className="w-full aspect-[4/3]" />

            {/* الكارت الأول: أعلى اليسار */}
            <div className="absolute top-0 left-0 w-[42.5%] h-[52%] p-2 md:p-4">
              <div className="w-full h-full rounded-[2rem] bg-gray-300 animate-pulse motion-reduce:animate-none" />
            </div>

            {/* الكارت الثاني: أسفل اليمين */}
            <div className="absolute bottom-0 right-0 w-[42.5%] h-[52%] p-2 md:p-4">
              <div className="w-full h-full rounded-[2rem] bg-gray-300 animate-pulse motion-reduce:animate-none" />
            </div>
          </div>

          {/* النصوص والقيم */}
          <div dir="rtl" className="lg:col-span-6 flex flex-col items-start gap-4">
            <Skeleton rounded="rounded-full" className="h-9 w-52" />

            <Skeleton rounded="rounded-xl" className="mt-1 h-10 md:h-14 w-3/4" />
            <Skeleton rounded="rounded-xl" className="h-10 md:h-14 w-1/2" />

            <div className="w-full mt-2 flex flex-col gap-2">
              <Skeleton rounded="rounded-md" className="h-3 w-full" />
              <Skeleton rounded="rounded-md" className="h-3 w-full" />
              <Skeleton rounded="rounded-md" className="h-3 w-11/12" />
              <Skeleton rounded="rounded-md" className="h-3 w-2/3" />
            </div>

            <div className="w-full mt-4 flex flex-col gap-3">
              <Skeleton rounded="rounded-md" className="h-5 w-24 mb-1" />
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton rounded="rounded-full" className="shrink-0 w-20 h-6" />
                  <Skeleton rounded="rounded-md" className="h-3 w-full" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}