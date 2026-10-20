import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SliderSection from './components/SliderSection';
import WorksSection from './components/WorksSection';
import { useServicesCatalog } from '../../hooks/useServicesCatalog'; // تأكد من صحة المسار

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('category');

  const { data: catalogResponse, isLoading, isError } = useServicesCatalog(categoryIdFromUrl);
  const catalogData = catalogResponse?.data || {};
  const heroSlides = catalogData.heroSlides || [];

  // نحتفظ بمعالجة الخطأ فقط في المستوى الأعلى
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        عذراً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.
      </div>
    );
  }

  return (
    <>
      {/* السلايدر يظهر دائماً (حتى لو فارغاً أو يحمل بيانات) */}
      <SliderSection heroSlides={heroSlides} />
      
      {/* نمرر حالة التحميل والبيانات لـ WorksSection */}
      <WorksSection 
        initialData={catalogData} 
        categoryIdFromUrl={categoryIdFromUrl}
        isLoading={isLoading}
      />
    </>
  );
}