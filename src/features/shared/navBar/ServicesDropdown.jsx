import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicesDropdown({ onSelectFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // الخيارات التي تظهر في القائمة بناءً على صورتك
  const menuItems = [
    { title: "الحلول الرقمية للعائلة", filterKey: "digital-solutions" },
    { title: "مشجرات عائلية", filterKey: "family-trees" }
  ];

  const handleItemClick = (filterKey) => {
    setIsOpen(false); // إغلاق القائمة بعد الاختيار
    
    // إذا كنت تريد تمرير الفلتر لصفحة المنتجات وعرضه مباشرة
    if (onSelectFilter) {
      onSelectFilter(filterKey);
    } else {
      // أو الانتقال لصفحة المنتجات مع الكويري سترينج للفلتر
      navigate(`/products?category=${filterKey}`);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* زر الخدمات والمنتجات الرئيسي في النافبار */}
      <button className="cursor-pointer text-gray-700 hover:text-primary transition-colors font-medium py-2">
        الخدمات والمنتجات
      </button>

      {/* القائمة المنسدلة التي تظهر عند الهوفر */}
      {isOpen && (
        <div className="absolute top-full right-0 w-72 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn mt-2">
          
          {/* عنوان القائمة العلوي كما في التصميم */}
          <div className="bg-secondaryBgColor text-primary font-bold text-center py-3 text-sm border-b border-gray-100">
            الهوية والتواصل العائلي
          </div>

          {/* عناصر القائمة */}
          <div className="flex flex-col py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.filterKey)}
                className="w-full text-right px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-all text-sm font-medium border-b border-gray-100 last:border-none cursor-pointer"
              >
                {item.title}
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}