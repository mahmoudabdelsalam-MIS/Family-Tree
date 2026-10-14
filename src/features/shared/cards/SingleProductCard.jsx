import React from "react";
import { Calendar, Clock, Play } from "lucide-react";

export function ArticleCard({
  image,
  title,
  hijriDate, //تاريخ هجري
  gregorianDate, //تاريخ ميلادي
  time,
  isMedia = false, // اظهار زر التشغيل لو كان فديو
  href,
  onClick,
}) {
  const Tag = href ? "a" : "article";

  return (
    <Tag dir="rtl" href={href} onClick={onClick}
      className="group block cursor-pointer rounded-3xl bg-white p-3 pb-6 text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* غلاف الصورة */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* زر التشغيل في حال كانت ميديا */}
        {isMedia && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 fill-current translate-x-0.5" />
            </span>
          </div>
        )}
      </div>

      {/* تفاصيل التاريخ والوقت */}
      <div className="mt-4 flex items-center justify-between gap-2 px-1 text-xs font-medium text-gray-500">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <span>
            {hijriDate && `${hijriDate} - `}
            {gregorianDate}
          </span>
        </div>

        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          <span>{time}</span>
        </div>
      </div>

      {/* العنوان */}
      <h3 className="mt-3 line-clamp-2 px-1 text-base md:text-lg font-bold leading-snug text-gray-800 transition-colors group-hover:text-primary">
        {title}
      </h3>
    </Tag>
  );
}

export default ArticleCard;