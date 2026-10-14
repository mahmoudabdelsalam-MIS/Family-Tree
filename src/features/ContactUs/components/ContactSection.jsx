import React from 'react';
import ContactOption from './ContactOption';
import { Phone , Mail, MapPin } from 'lucide-react'; 

export default function ContactSection() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/966xxxxxxxxx', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@example.com';
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=الرياض+حي+الياسمين', '_blank');
  };

  return (
    <section className="w-full py-12 px-4 bg-gray-50" dir="rtl">
      {/* الهيدر */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-[#5CB83B]">لنبدأ العمل على</span> مشروعك
        </h2>
        <p className="text-gray-600 text-lg">
          اذا كان لديك خدمة او شكوى يسعدنا الاستماع اليها ومساعدتك في حلها
        </p>
      </div>

      {/* خيارات التواصل */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* واتساب */}
        <ContactOption
          title="تواصل عبر واتساب"
          subtitle="رد فوري - متاح حاليا"
          icon={Phone}
          bgColor="bg-[#5CB83B]"
          iconBgColor="bg-white/20"
          onClick={handleWhatsAppClick}
        />

        {/* البريد الإلكتروني */}
        <ContactOption
          title="راسلنا عبر البريد"
          subtitle="سيتم التواصل معك في اقرب وقت"
          icon={Mail}
          bgColor="bg-[#005299]"
          iconBgColor="bg-white/20"
          onClick={handleEmailClick}
        />

        {/* الموقع */}
        <ContactOption
          title="الرياض - المملكة العربية السعودية"
          subtitle="حي الياسمين، شارع 44"
          icon={MapPin}
          bgColor="bg-[#9E9E9E]"
          iconBgColor="bg-white/20"
          onClick={handleLocationClick}
        />
      </div>
    </section>
  );
}