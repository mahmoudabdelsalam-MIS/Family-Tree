import React, { useEffect, useRef, useState } from "react";
import { LayoutGrid, Newspaper, Mic } from "lucide-react";
import SingleProductCard from "../shared/cards/SingleProductCard"; // استيراد المكون
import Skeleton from "../shared/skeleton/Skeleton";
import CardSkeleton from "../shared/skeleton/CardSkeleton";
import Pagination from "../shared/pagination/Pagination";
import { useBlogs } from "../../hooks/useBlog";

const PAGE_SIZE = 6;

// بيحسب عدد الصفحات من الـ meta اللي في رد الـ API (بيجرب أكتر من اسم محتمل)
const getTotalPages = (blogData, response, page, postsCount) => {
  const meta =
    blogData?.pagination ?? blogData?.meta ?? response?.meta ?? response?.pagination;

  const last = meta?.lastPage ?? meta?.last_page ?? meta?.totalPages ?? meta?.total_pages;
  if (last) return Number(last);

  if (meta?.total) return Math.ceil(Number(meta.total) / PAGE_SIZE);

  // مفيش meta: لو الصفحة الحالية ممتلئة نفترض إن فيه صفحة تانية
  return postsCount >= PAGE_SIZE ? page + 1 : page;
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState("all"); // الفلتر المحدد حالياً
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const [persistentFilters, setPersistentFilters] = useState([]);

  const { data: response, isLoading, error, isPlaceholderData } = useBlogs({
    type: activeTab,
    per_page: PAGE_SIZE,
    page,
  });

  const blogData = response?.data;
  const articles = blogData?.posts || [];
  const totalPages = getTotalPages(blogData, response, page, articles.length);

  // تحديث الفلاتر الثابتة أول ما تأتي البيانات من السيرفر لأول مرة
  useEffect(() => {
    if (blogData?.filters && persistentFilters.length === 0) {
      setPersistentFilters(blogData.filters);
    }
  }, [blogData]);

  // تغيير الفلتر بيرجعنا للصفحة الأولى
  const handleTabChange = (key) => {
    setActiveTab(key);
    setPage(1);
  };

  // تغيير الصفحة: ننزل/نطلع لأول القايمة عشان المستخدم يشوف النتايج الجديدة
  const handlePageChange = (newPage) => {
    setPage(newPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getCategoryIcon = (key) => {
    switch (key) {
      case "news": return Newspaper;
      case "article": return Newspaper;
      case "podcast": return Mic;
      default: return LayoutGrid;
    }
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-12" dir="rtl">

      {/* شريط الفلتر (Tabs) مبني ديناميكياً من الـ API */}
      <div className="w-full max-w-xl mx-auto bg-white p-1.5 rounded-4xl lg:rounded-full shadow-sm flex flex-wrap md:flex-nowrap items-center justify-between gap-2 mb-10">
        {persistentFilters.length > 0 ? (
          persistentFilters.map((cat) => {
            const Icon = getCategoryIcon(cat.key);
            const isActive = activeTab === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => handleTabChange(cat.key)}
                className={`
                  flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
                  ${
                    isActive
                      ? "bg-[#65A30D] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-200/50"
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#3E3B36]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })
        ) : (
          // skeleton للتبويبات لحد ما الفلاتر توصل
          Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} rounded="rounded-full" className="flex-1 min-w-[130px] h-11" />
          ))
        )}
      </div>

      {/* القايمة + الترقيم (listRef هو نقطة الرجوع عند تغيير الصفحة) */}
      <div ref={listRef} className="scroll-mt-28">
        {/* عرض المحتوى أو التحميل أو الأخطاء */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">عذراً، حدث خطأ أثناء تحميل البيانات من السيرفر.</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-semibold">لا توجد عناصر متاحة في هذا القسم حالياً.</div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${isPlaceholderData ? 'opacity-60' : ''}`}>
            {articles.map((item) => (
              <SingleProductCard
                key={item.id}
                image={item.imageUrl || ''} // سيأخذ الصورة القادمة من الـ API أو يتركها للـ Fallback
                title={item.title}
                date={item.date}
                time={item.publishedTime || ''}
                isMedia={item.hasVideo} // ربط زر التشغيل بـ hasVideo القادمة من الـ API
                href={item.postType === 'podcast' ? `/podcast/${item.id}` : `/news/${item.id}`}
              />
            ))}
          </div>
        )}

        {/* ترقيم الصفحات: مش بيظهر لو صفحة واحدة بس */}
        {!isLoading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
            className="mt-12"
          />
        )}
      </div>
    </section>
  );
}