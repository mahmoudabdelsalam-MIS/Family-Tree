import React from "react";
import { Calendar, Clock, Play } from "lucide-react";
import { Link } from "react-router-dom";

export function ArticleCard({
  image,
  title,
  date, //تاريخ ميلادي
  time,
  isMedia = false, // اظهار زر التشغيل لو كان فديو
  href,
  onClick,
}) {

  return (
    <Link to={href} onClick={onClick} className="group block cursor-pointer rounded-[40px] bg-white p-3 pb-6 text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* غلاف الصورة */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
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
      <div className="mt-4 flex items-center justify-between gap-2 px-1 text-xs font-bold text-[#505050]">
        {date && (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <span>
            {date}
          </span>
        </div>
        )}

        {time && (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          <span>{time}</span>
        </div>
        )}
      </div>

      {/* العنوان */}
      {title && (
      <h3 className="mt-3 line-clamp-2 px-1 text-base md:text-xl font-bold leading-snug text-[#505050] transition-colors group-hover:text-primary">
        {title}
      </h3>
      )}
    </Link>
  );
}

export default ArticleCard;