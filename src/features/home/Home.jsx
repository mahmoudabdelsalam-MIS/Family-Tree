import React from 'react';
import HeaderSection from './components/HeaderSection';
import FamilyTreeSection from './components/FamilyTreeSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestmonialsSection'; // تم تصحيح الاسم (كان TestmonialsSection)
import FaqSection from './components/FaqSection';
import FeaturesScrollSection from './components/FeaturesScrollSection';
import BookingFlow from '../booking/BookingFlow';
import { useHomeData } from '../../hooks/useHome';

export default function Home() {
  const { data: response, isLoading, error } = useHomeData();

  // 1. استخراج البيانات بشكل آمن لتجنب أخطاء undefined
  const pageData = response?.data || {};
  const legacyData = pageData.legacy || {};
  const statsData = pageData.stats || {};

  // 2. تجهيز البيانات لكل كومبوننت حسب طلبك
  const headerData = {
    stats: statsData,
    heroSlides: pageData.heroSlides || [],
    heroCards: pageData.heroCards || [],
    heroPromo: pageData.heroPromo || {}, // أضفتها لأنها جزء من الهيرو ومفيدة للـ CTA
  };

  const aboutData = pageData.aboutSection || {};
  const faqsData = pageData.faqs || [];
  const reviewsData = pageData.clientReviews || [];
  const projectsData = pageData.projects || [];
  const featuresData = pageData.highlights || []; // الأنسب لقسم المميزات
  const partnersData = legacyData.partners || [];
  const servicesData = legacyData.services || []; // احتياطي لو احتجته أي كومبوننت

  // 3. حالات التحميل والخطأ (Best Practice)
if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]">
        <span className="text-xl text-gray-500 animate-pulse font-semibold">...جاري تحميل بيانات الصفحة الرئيسية</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <p className="text-red-500 text-xl font-bold mb-2">عذراً، حدث خطأ أثناء تحميل البيانات.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <HeaderSection 
        stats={headerData.stats} 
        heroSlides={headerData.heroSlides} 
        heroCards={headerData.heroCards}
        heroPromo={headerData.heroPromo}
      /> 
      <FamilyTreeSection 
        data={aboutData} 
      />
      <TestimonialsSection 
        clientReviews={reviewsData}
        partners={partnersData} 
      />
      <ProjectsSection data={projectsData} />
      <FaqSection faqs={faqsData} />
      <FeaturesScrollSection highlights={featuresData} />
      <BookingFlow />
    </div>
  );
}