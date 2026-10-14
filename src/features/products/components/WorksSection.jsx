import React, { useState } from 'react';
import ProjectsGrid from './ProjectsGrid';
import ProductCard from '../../shared/cards/ServicesCard';

import project1 from '../../../assets/project1.png';
import project2 from '../../../assets/project2.jpg';
import project3 from '../../../assets/project3.png';
import { PenTool, Users } from 'lucide-react';

export default function WorksSection() {

  const [activeTab, setActiveTab] = useState('digital');

  const tabs = [
    { id: 'identity', label: 'الهوية والتواصل العائلي' },
    { id: 'digital', label: 'الحلول الرقمية للعائلة' },
    { id: 'trees', label: 'مشجرات عائلية' },
  ];

  const projectsList = [
    { id: 1, title: 'تصميم براند', image: project2, category: 'identity' },
    { id: 2, title: 'تصميم براند', image: project2, category: 'identity' },
    { id: 3, title: 'تطبيق موبايل', image: project3, category: 'digital' },
    { id: 4, title: 'واجهة مستخدم', image: project1, category: 'digital' },
    { id: 5, title: 'شجرة عائلة 1', image: project2, category: 'trees' },
    { id: 6, title: 'شجرة عائلة 2', image: project3, category: 'trees' },
  ];

  // أضفنا category لكل منتج لكي يتفلتر هو الآخر
  const productsList = [
    {
      id: 1,
      title: 'الهوية البصرية واللفظية',
      price: '20000',
      icon: <PenTool className="w-10 h-10" />,
      category: 'identity',
    },
    {
      id: 2,
      title: 'ادارة منصات تواصل العائلة',
      price: '20000',
      icon: <Users className="w-10 h-10" />,
      category: 'identity',
    },
    {
      id: 3,
      title: 'تطوير الحلول الرقمية',
      price: '20000',
      icon: <PenTool className="w-10 h-10" />,
      category: 'digital',
    },
    {
      id: 4,
      title: 'بناء المشجرات والأنساب',
      price: '20000',
      icon: <Users className="w-10 h-10" />,
      category: 'trees',
    },
  ];

  // تصفية المشاريع والمنتجات معاً بناءً على الفلتر النشط
  const filteredProjects = projectsList.filter(
    (project) => project.category === activeTab
  );

  const filteredProducts = productsList.filter(
    (product) => product.category === activeTab
  );

  return (
    <section className="py-16 px-4 md:px-6" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
      <div className="w-full max-w-3xl mx-auto bg-white p-2 rounded-4xl lg:rounded-full shadow-sm flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] text-center py-3 px-6 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#65A30D] text-white shadow-md' // الزر النشط بلون أخضر بارز
                  : 'text-gray-600 hover:text-gray-900 bg-transparent' // الأزرار غير النشطة بدون خلفية
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* عرض المنتجات المُصفاة */}
          <div className="lg:col-span-5 flex flex-wrap justify-center items-center gap-4 w-full">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard
                  icon={product.icon}
                  title={product.title}
                  price={product.price}
                  onSeeMore={() => console.log(`تمت إضافة ${product.title} إلى السلة`)}
                />
              </div>
            ))}
          </div>    

          {/* قسم المشاريع والعنوان */}
          <div className="lg:col-span-7 w-full lg:border-r-2 pr-10 lg:border-gray-300">
            <div className='mb-10'>
              <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-gray-500 text-sm font-medium">ما توّد طلبه</span>
                  </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  من <span className="text-primary decoration-emerald-200">أعمالنا</span>
                </h2>
              </div>
            </div>

            <ProjectsGrid projects={filteredProjects} />
          </div>

        </div>

      </div>
    </section>
  );
}