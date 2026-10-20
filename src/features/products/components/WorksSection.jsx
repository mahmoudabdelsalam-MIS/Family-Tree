import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectsGrid from './ProjectsGrid';
import ProductCard from '../../shared/cards/ServicesCard';
import { PenTool } from 'lucide-react';
import SectionTitle from '../../shared/headers/SectionTitle';

import Skeleton from '../../shared/skeleton/Skeleton';
import CardSkeleton from '../../shared/skeleton/CardSkeleton';

import { useServicesCatalog } from '../../../hooks/useServicesCatalog';

export default function WorksSection({ initialData, categoryIdFromUrl: propCategoryId, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIdFromUrl = propCategoryId || searchParams.get('category');

  // نستخدم الـ Hook كخطة احتياطية، لكن نعطي الأولوية للبيانات القادمة من الأب
  const { data: catalogResponse } = useServicesCatalog(categoryIdFromUrl);
  const catalogData = initialData || catalogResponse?.data || {};
  
  const categories = catalogData.categories || [];
  const services = catalogData.services || [];
  const showcase = catalogData.showcase || {};
  const activeCategoryId = categoryIdFromUrl || catalogData.activeCategoryId || categories[0]?.id;

  // تحويل showcase.imageUrls إلى الصيغة التي يفهمها ProjectsGrid
  const showcaseProjects = (showcase.imageUrls || []).map((url, index) => ({
    id: `showcase-${index}`,
    title: showcase.title || 'من أعمالنا',
    image: url,
  }));

  const handleTabChange = (catId) => {
    setSearchParams({ category: catId }, { preventScrollReset: true });
  };

  return (
    <section className="py-16 px-4 md:px-6" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* 1. تبويبات التصنيفات (Tabs) */}
        <div className="w-full max-w-xl mx-auto bg-white p-2 rounded-4xl lg:rounded-full shadow-sm flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
          {isLoading ? (
            // Skeleton للتبويبات
            <>
              <Skeleton className="flex-1 min-w-[130px] h-11" rounded="rounded-full" />
              <Skeleton className="flex-1 min-w-[130px] h-11" rounded="rounded-full" />
              <Skeleton className="flex-1 min-w-[130px] h-11" rounded="rounded-full" />
            </>
          ) : (
            categories.map((tab) => {
              const isActive = activeCategoryId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 min-w-[130px] text-center py-3 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive ? 'bg-[#65A30D] text-white shadow-md' : 'text-gray-600 hover:text-gray-900 bg-transparent'
                  }`}
                >
                  {tab.title}
                </button>
              );
            })
          )}
        </div>

        {/* 2. المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* عمود الخدمات (Services) */}
          <div className="lg:col-span-5 flex flex-wrap justify-center items-start gap-4 w-full">
            {isLoading ? (
              // استخدام CardSkeleton لمطابقة شكل الكارت الحقيقي تماماً
              <>
                <CardSkeleton className="w-full sm:w-[calc(50%-8px)] lg:w-full" />
                <CardSkeleton className="w-full sm:w-[calc(50%-8px)] lg:w-full" />
                <CardSkeleton className="w-full sm:w-[calc(50%-8px)] lg:w-full" />
              </>
            ) : services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="flex justify-center flex-wrap w-full sm:w-auto">
                  <ProductCard
                    icon={<PenTool className="w-10 h-10" />}
                    title={service.title}
                    price={service.price}
                    currency={service.currency}
                    sallaUrl={service.sallaUrl}
                    onSeeMore={() => console.log(`تمت إضافة ${service.title}`)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10 w-full">لا توجد خدمات متاحة في هذا القسم حالياً.</p>
            )}
          </div>

          {/* عمود المشاريع (Showcase Grid) */}
          <div className="lg:col-span-7 w-full lg:border-r-2 lg:pr-10 lg:border-gray-300">
            <div className="mb-10">
              <SectionTitle
              subtitle="ما تود طلبه" 
              title="من" 
              highlightedText="اعمالنا"
              />
            </div>
            
            {isLoading ? (
              // Skeleton لشبكة المشاريع (بنفس أبعاد ProjectsGrid)
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
                <Skeleton className="aspect-[4/3] w-full" rounded="rounded-2xl" />
              </div>
            ) : showcaseProjects.length > 0 ? (
              <ProjectsGrid projects={showcaseProjects} />
            ) : (
              <p className="text-gray-500 text-center py-10">لا توجد مشاريع متاحة حالياً.</p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}