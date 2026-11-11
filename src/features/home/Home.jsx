import React from 'react';
import HeaderSection from './components/HeaderSection';
import FamilyTreeSection from './components/FamilyTreeSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestmonialsSection'; 
import FaqSection from './components/FaqSection';
import FeaturesScrollSection from './components/FeaturesScrollSection';
import BookingFlow from '../booking/BookingFlow';
import { useHomeData } from '../../hooks/useHome';

export default function Home() {
  const { data: response, isLoading, error } = useHomeData();

  const pageData = response?.data || {};
  const legacyData = pageData.legacy || {};
  const statsData = pageData.stats || {};

  const headerData = {
    stats: statsData,
    heroSlides: pageData.heroSlides || [],
    heroCards: pageData.heroCards || [], // الكروت الخمسة أصبحت تأتي مباشرة من هنا
    heroPromo: pageData.heroPromo || {}, // البانر الرئيسي / العنوان الرئيسي الجديد
  };

  const aboutData = pageData.aboutSection || {};
  const faqsData = pageData.faqs || [];
  const reviewsData = pageData.clientReviews || [];
  const projectsData = pageData.projects || [];
  const featuresData = pageData.highlights || [];
  const familyIdeasPlatform = pageData.familyIdeasPlatform || [];  
  // الشركاء: المميزين (الدواير) وباقي الشركاء (المودال)
  const featuredPartners = pageData.featuredPartners || legacyData.featuredPartners || [];
  const morePartners = pageData.morePartners || legacyData.morePartners || [];


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
        familyIdeasPlatform={familyIdeasPlatform}
      /> 
      <FamilyTreeSection data={aboutData} />
      <TestimonialsSection clientReviews={reviewsData} featuredPartners={featuredPartners} morePartners={morePartners} />
      <ProjectsSection data={projectsData} />
      <FaqSection faqs={faqsData} />
      <FeaturesScrollSection highlights={featuresData} />
      <BookingFlow />
    </div>
  );
}