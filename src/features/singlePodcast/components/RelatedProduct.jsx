import React from 'react';
import SingleProductCard from '../../shared/cards/SingleProductCard';

const mockPodcasts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800",
    title: "تأثير الذكاء الاصطناعي على حياتنا اليومية وتطوير بيئة العمل",
    hijriDate: "10 شوال 1445",
    gregorianDate: "18 أبريل 2024",
    time: "15 دقيقة",
    isMedia: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800",
    title: "كيف نحافظ على التراث العائلي وننقله للأجيال القادمة؟",
    hijriDate: "15 محرم 1446",
    gregorianDate: "21 يوليو 2024",
    time: "25 دقيقة",
    isMedia: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    title: "دليل توثيق بيانات الأفراد والروابط الأسرية في منصة شجرة العائلة",
    hijriDate: "01 صفر 1446",
    gregorianDate: "06 أغسطس 2024",
    time: "20 دقيقة",
    isMedia: true,
  },
];

export default function RelatedProduct() {
  return (
    <div dir="rtl" className='flex flex-col justify-center items-start font-bold text-black gap-8 w-full max-w-7xl mx-auto px-4 py-8'>
      <h3 className="text-xl md:text-3xl font-bold">
        المزيد من <span className='text-primary'>البودكاست</span>
      </h3>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full'>
        {mockPodcasts.map((podcast) => (
          <SingleProductCard
            key={podcast.id}
            image={podcast.image}
            title={podcast.title}
            hijriDate={podcast.hijriDate}
            gregorianDate={podcast.gregorianDate}
            time={podcast.time}
            isMedia={podcast.isMedia}
            href={`/podcasts/${podcast.id}`}
          />
        ))}
      </div>
    </div>
  );
}