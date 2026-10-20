import React from 'react';
import NavArrowButton from '../button/NavArrowButton';

// بيرجع أرقام الصفحات اللي هتتعرض مع "..." لو الصفحات كتير (مثال: 1 ... 4 5 6 ... 12)
const getPageItems = (page, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) items.push('...');
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push('...');
  items.push(total);

  return items;
};

// كومبوننت ترقيم صفحات مشترك: مش بيظهر لو فيه صفحة واحدة بس
// - page: الصفحة الحالية (تبدأ من 1)
// - totalPages: عدد الصفحات
// - onChange: بياخد رقم الصفحة الجديدة
export default function Pagination({ page, totalPages, onChange, className = '' }) {
  if (!totalPages || totalPages <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  const items = getPageItems(page, totalPages);

  return (
    <nav
      dir="rtl"
      aria-label="التنقل بين الصفحات"
      className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}
    >
      {/* السابق: على اليمين (اتجاه عربي) وسهمه بيشاور يمين */}
      <div className={isFirst ? 'opacity-40 pointer-events-none' : ''}>
        <NavArrowButton type="next" onClick={() => onChange(page - 1)} />
      </div>

      {/* أرقام الصفحات */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {items.map((item, index) =>
          item === '...' ? (
            <span key={`dots-${index}`} className="w-6 text-center text-gray-400 select-none">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-label={`الصفحة ${item}`}
              aria-current={item === page ? 'page' : undefined}
              className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                item === page
                  ? 'bg-[#65A30D] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* التالي: على الشمال وسهمه بيشاور شمال */}
      <div className={isLast ? 'opacity-40 pointer-events-none' : ''}>
        <NavArrowButton type="prev" onClick={() => onChange(page + 1)} />
      </div>
    </nav>
  );
}