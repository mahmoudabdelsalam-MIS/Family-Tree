import React from 'react';
import AboutUsCard from '../../shared/cards/AboutUsCard';
import { MessageSquare, Eye, Target } from 'lucide-react'; 
import { useAboutPage } from '../../../hooks/useAboutCardsPage';

// دالة مساعدة لربط نص الأيقونة القادم من الـ API بمكونات Lucide icons
const getIconComponent = (iconName) => {
  switch (iconName?.toLowerCase()) {
    case 'message':
    case 'messagesquare':
      return MessageSquare;
    case 'eye':
      return Eye;
    case 'target':
      return Target;
    default:
      return MessageSquare;
  }
};

export default function CardsSection() {
  const { data: response, isLoading, isError } = useAboutPage();
  console.log("response" , response);
  

  // استخراج مصفوفة الـ pillars من استجابة الـ API
  const pillars = response?.data?.pillars || [];

  if (isLoading) {
    return (
      <div className="w-full py-12 text-center text-gray-500">
        جاري تحميل محتوى القسم...
      </div>
    );
  }

  if (isError || pillars.length === 0) {
    return null; // أو عرض حالة خطأ بسيطة حسب رغبتك
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 flex flex-col lg:flex-row items-center justify-center gap-6 dir-rtl">
      {pillars.map((card, index) => {
        // تحديد الحجم بناءً على الترتيب أو الـ key تماماً مثل التصميم الأصلي (الكارت الأوسط "رؤيتنا" غالباً يكون بحجم large)
        const cardSize = card.key === 'vision' ? 'large' : 'normal';

        // إزالة وسوم الـ HTML الطارئة لو الكارت يتطلب نصاً عادياً أو تمريرها كـ HTML حسب الحاجة
        // هنا نقوم بتمرير الوصف مع الحفاظ على التنسيق
        const cleanDescription = card.descriptionHtml 
          ? card.descriptionHtml.replace(/<[^>]*>?/gm, '') // إزالة وسوم الـ HTML لعرض نص نظيف إذا تطلب الكارت ذلك، أو اتركها إذا كان الـ Card يدعم HTML
          : '';

        return (
          <AboutUsCard
            key={card.key || index}
            title={card.title}
            description={cleanDescription}
            icon={getIconComponent(card.icon)}
            size={cardSize}
          />
        );
      })}
    </div>
  );
}