import React, { useEffect, useState } from "react";
import { LayoutGrid, Newspaper, Mic } from "lucide-react";
import SingleProductCard from "../shared/cards/SingleProductCard"; // استيراد المكون

import singleproductimg1 from '../../assets/singleproductimg1.jpg'
import singleproductimg2 from '../../assets/singleproductimg2.jpg'
import singleproductimg3 from '../../assets/singleproductimg3.jpg'

// 1. مصفوفة البيانات المؤقتة (Dummy Data)
const mockArticles = [
  {
    id: 1,
    type:"podcast",
    image: singleproductimg1,
    title: "تجمع العائلة في عيد الفطر المبارك لعام 1445هـ وأهم اللحظات التوثيقية",
    hijriDate: "10 شوال 1445",
    gregorianDate: "18 أبريل 2024",
    time: "02:30 م",
    isMedia: false,
  },
  {
    id: 2,
    type:"podcast",
    image: singleproductimg2,
    title: "بودكاست: كيف نحافظ على التراث العائلي وننقله للأجيال القادمة؟",
    hijriDate: "15 محرم 1446",
    gregorianDate: "21 يوليو 2024",
    time: "15 دقيقة",
    isMedia: true, // يظهر زر التشغيل
  },
  {
    id: 3,
    type:"news",
    image: singleproductimg3,
    title: "دليل استخدام منصة شجرة العائلة وتوثيق بيانات الأفراد والروابط الأسرية",
    hijriDate: "01 صفر 1446",
    gregorianDate: "06 أغسطس 2024",
    time: "05:00 م",
    isMedia: false,
  },
    {
    id: 4,
    type:"news",
    image: singleproductimg1,
    title: "تجمع العائلة في عيد الفطر المبارك لعام 1445هـ وأهم اللحظات التوثيقية",
    hijriDate: "10 شوال 1445",
    gregorianDate: "18 أبريل 2024",
    time: "02:30 م",
    isMedia: false,
  },
  {
    id: 5,
    type:"articles",
    image: singleproductimg2,
    title: "بودكاست: كيف نحافظ على التراث العائلي وننقله للأجيال القادمة؟",
    hijriDate: "15 محرم 1446",
    gregorianDate: "21 يوليو 2024",
    time: "15 دقيقة",
    isMedia: true, // يظهر زر التشغيل
  },
  {
    id: 6,
    type:"articles",
    image: singleproductimg3,
    title: "دليل استخدام منصة شجرة العائلة وتوثيق بيانات الأفراد والروابط الأسرية",
    hijriDate: "01 صفر 1446",
    gregorianDate: "06 أغسطس 2024",
    time: "05:00 م",
    isMedia: false,
  },
];

const categories = [
  { id: "all", label: "الكل", icon: LayoutGrid },
  { id: "news", label: "اخبار", icon: Newspaper },
  { id: "articles", label: "مقالات", icon: Newspaper },
  { id: "podcast", label: "بودكاست", icon: Mic },
]

export default function Blog() {
  const [activeTab, setActiveTab] = useState("all"); // الفلتر المحدد حالياً
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // محاكاة جلب البيانات من الـ Backend بناءً على الفلتر المختار
    setIsLoading(true);
    
    // 💡 [عندما يجهز الباك]: استبدل السطور التالية بطلب Axios أو fetch حقيقي
    // مثال: axios.get(`/api/posts?type=${activeTab === 'all' ? '' : activeTab}`)
    
    setTimeout(() => {
      if (activeTab === "all") {
        setArticles(mockArticles);
      } else {
        // فلترة محلية مؤقتة (في الباك إند السيرفر هو من سيقوم بهذه الفلترة)
        const filtered = mockArticles.filter((item) => item.type === activeTab);
        setArticles(filtered);
      }
      setIsLoading(false);
    }, 300); // محاكاة سرعة السيرفر

  }, [activeTab]); // يتنفذ الكود كلما تغير الـ Tab المختار

return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-12" dir="rtl">
      
      {/* 2. شريط الفلتر (Tabs) مطابق للصورة */}
      <div className="w-full max-w-3xl mx-auto bg-white p-1.5 rounded-4xl lg:rounded-full shadow-sm flex flex-wrap md:flex-nowrap items-center justify-between gap-2 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                flex-1 min-w-[150px] flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-[#65A30D] text-white shadow-md" // الزر النشط بلون أخضر بارز داخل الكبسولة
                    : "text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-200/50" // الأزرار غير النشطة بدون إطار وبدون خلفية قوية
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#65A30D]"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. عرض المحتوى أو التحميل */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500 font-semibold">جاري التحميل...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold">لا توجد عناصر متاحة حالياً.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <SingleProductCard
              key={item.id}
              image={item.image}
              title={item.title}
              hijriDate={item.hijriDate}
              gregorianDate={item.gregorianDate}
              time={item.time}
              isMedia={item.isMedia}
              href={`/singlePodcast`}
            />
          ))}
        </div>
      )}

    </section>
  );
}