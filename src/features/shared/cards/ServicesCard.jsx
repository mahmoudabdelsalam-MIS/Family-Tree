import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Button from '../button/Button';

export default function ServicesCard({ icon, title, price, onSeeMore , sallaUrl }) {
    const handleNavigate = () => {
    if (sallaUrl) {
      window.open(sallaUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <div className="w-[240px] h-[330px] bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col justify-start items-center text-center transition-all duration-300 hover:shadow-md">
      {/* الجزء العلوي (الأيقونة والعنوان والسعر) */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full py-15 rounded-2xl bg-[#0B98500A] text-primary flex items-center justify-center mb-4 text-4xl">
          {icon}
        </div>
        

        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1.5  text-gray-600 font-semibold">
          <span>{price}</span>
          <svg width="27" height="20" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.363 25.0001L17.0297 26.6001M17.0297 4.33342V13.9376M17.0297 13.9376V19.2934C17.0297 19.4959 17.0759 19.6958 17.1647 19.8778C17.2536 20.0598 17.3827 20.2192 17.5423 20.3439C17.7019 20.4685 17.8878 20.5552 18.0859 20.5973C18.2841 20.6394 18.4891 20.6358 18.6857 20.5868L24.363 19.2668M17.0297 13.9376L24.363 12.3334M17.0297 13.9376L11.0297 15.2501M1.66699 24.8014L9.06566 22.9841C9.64295 22.8267 10.1505 22.4797 10.5067 21.9989C10.863 21.5181 11.0471 20.9315 11.0297 20.3334V15.2501M11.0297 15.2501V1.66675M11.0297 15.2501L3.02966 17.0001" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" stroke="#606060"/>
          </svg>
        </div>
      </div>

      <div className="w-full mt-5">
        <Button
          size="sm"
          onClick={handleNavigate}
          icon={ShoppingBag}
          className="py-3"
        >
          شاهد المزيد
        </Button>
      </div>
    </div>
  );
}