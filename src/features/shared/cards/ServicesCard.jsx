import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Button from '../button/Button';

export default function ServicesCard({ icon, title, price, onSeeMore }) {
  return (
    <div className="w-[240px] h-[350px] bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-md">
      {/* الجزء العلوي (الأيقونة والعنوان والسعر) */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full py-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center mb-4 text-4xl">
          {icon}
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
          <span>{price}</span>
          <span className="text-xs">ر.س</span>
        </div>
      </div>

      <div className="w-full mt-4">
        <Button
          size="md"
          onClick={onSeeMore}
          icon={ShoppingBag}
        >
          شاهد المزيد
        </Button>
      </div>
    </div>
  );
}