import React, { useState } from "react";
import Maskgroup from '../../../assets/Maskgroup.svg'
import {
  Calendar,
  Clock,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
} from "lucide-react";

export default function SinglePodcastCard({
  image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
  title = "تأثير الذكاء الاصطناعي على حياتنا اليومية",
  hijriDate = "17 محرم 1444",
  gregorianDate = "15 أغسطس 2022",
  time = "12:30 م",
  duration = "2 س . 51 د",
  currentTime = "00:29:24",
  totalTime = "02:51:39",
  progressPercent = 35, // نسبة التقدم الفعلي للصوت (من 0 إلى 100)
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  // توليد أشرطة الـ Waveform التفاعلية
  const waveformHeights = [
    20, 35, 25, 45, 60, 40, 80, 55, 30, 40, 65, 90, 75, 50, 30, 20, 40, 60, 85,
    50, 30, 45, 70, 95, 60, 40, 25, 50, 70, 40, 30, 60, 80, 50, 30, 20, 40, 60,
    30, 20,
  ];

  return (
    <div
      dir="ltr"
      className="relative w-full max-w-7xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-4 sm:p-6 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* 1. الخلفية المتموجة (Waves Overlay) على اليسار */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none opacity-20 flex items-center">
        <img src={Maskgroup} alt="Mask group" className="w-full h-auto object-cover"/>
      </div>

      {/* 2. تفاصيل البودكاست والتحكم للصوت (الجانب الأيمن والأوسط) */}
      <div dir="rtl" className="flex-1 w-full flex flex-col items-start justify-between z-10 gap-4">
        
        {/* التاريخ والوقت */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mr-auto md:mr-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>
              {hijriDate} - {gregorianDate}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>{time}</span>
          </div>
        </div>

        {/* عنوان الحلقة والمدة */}
        <div className="flex flex-col gap-1 w-full text-right">
          <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-snug">
            {title}
          </h2>
          <span className="text-sm font-bold text-gray-500">{duration}</span>
        </div>

        {/* أشرطة التردد الصوتي (Waveform) */}
        <div dir="rtl" className="w-full flex items-end gap-1 h-10 my-1 overflow-hidden">
          {waveformHeights.map((height, idx) => {
            const barProgress = (idx / waveformHeights.length) * 100;
            const isPlayed = barProgress <= progressPercent;

            return (
              <span
                key={idx}
                style={{ height: `${height}%` }}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isPlayed ? "bg-primary" : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>

        {/* شريط التقدم وأزرار التحكم */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* الوقت المنقضي */}
          <span className="text-xs font-bold text-gray-500 font-mono">
            {currentTime}
          </span>

          {/* شريط التشغيل التفاعلي (Progress Slider) */}
          <div className="flex-1 relative mx-2 h-2 bg-gray-200 rounded-full overflow-visible flex items-center">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-primary rounded-full relative"
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-pointer hover:scale-125 transition-transform" />
            </div>
          </div>

          {/* الوقت المتبقي */}
          <span className="text-xs font-bold text-gray-500 font-mono">
            {totalTime}
          </span>

          {/* أزرار التحكم بالتشغيل والتقديم والتأخير */}
          <div className="flex items-center gap-3 mr-2">
            {/* إرجاع 15 ثانية */}
            <button
              aria-label="إرجاع 15 ثانية"
              className="relative p-1 text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">
                15
              </span>
            </button>

            {/* زر التشغيل والإيقاف الرئيسي */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </button>

            {/* تقديم 15 ثانية */}
            <button
              aria-label="تقديم 15 ثانية"
              className="relative p-1 text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <RotateCw className="w-5 h-5" />
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">
                15
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. صورة البودكاست (الجانب الأيسر) */}
      <div className="w-full md:w-56 h-56 rounded-3xl overflow-hidden shrink-0 shadow-md border border-gray-100 z-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

    </div>
  );
}