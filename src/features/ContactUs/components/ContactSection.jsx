import React from 'react';
import ContactOption from './ContactOption';
import { Phone, Mail, MapPin } from 'lucide-react'; 
import Skeleton from '../../shared/skeleton/Skeleton';
import { useContactPage } from '../../../hooks/useContactPage';

export default function ContactSection() {
  const { data: response, isLoading, error } = useContactPage('ar');
  console.log(response);

  const contactData = response?.data || {};
  const header = contactData.header || {};
  const channels = contactData.channels || [];

  const getChannelIcon = (type) => {
    switch (type) {
      case 'whatsapp': return Phone;
      case 'email': return Mail;
      case 'location': return MapPin;
      default: return Phone;
    }
  };

  const getStaticBgColor = (type) => {
    switch (type) {
      case 'whatsapp': return 'bg-[#589E08]';
      case 'email': return 'bg-[#00457B]';
      case 'location': return 'bg-[#B2ADA9]';
      default: return 'bg-[#589E08]';
    }
  };

  return (
    <section className="w-full py-12 px-4" dir="rtl">
      {/* الهيدر */}
      <div className="text-right mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {header?.title || <>لنبدأ العمل على<span className="text-[#5CB83B]"> مشروعك</span></>}
        </h2>
        <p className="text-[#656565] text-base font-normal">
          {header?.subtitle || "اذا كان لديك خدمة او شكوى يسعدنا الاستماع اليها ومساعدتك في حلها"}
        </p>
      </div>

      {/* خيارات التواصل أو الـ Skeleton */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="w-full h-24 rounded-2xl bg-gray-100 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <Skeleton rounded="rounded-xl" className="w-12 h-12" />
                <div className="space-y-2">
                  <Skeleton rounded="rounded-md" className="w-40 h-4" />
                  <Skeleton rounded="rounded-md" className="w-28 h-3" />
                </div>
              </div>
              <Skeleton rounded="rounded-full" className="w-8 h-8" />
            </div>
          ))
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-semibold">
            عذراً، حدث خطأ أثناء تحميل بيانات التواصل.
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold">
            لا توجد وسائل تواصل متاحة حالياً.
          </div>
        ) : (
          channels.map((channel, index) => {
            const Icon = getChannelIcon(channel.type);
            const bgColor = getStaticBgColor(channel.type);

            return (
              <ContactOption
                key={index}
                title={channel.title || (channel.type === 'whatsapp' ? 'تواصل عبر واتساب' : channel.type === 'email' ? 'راسلنا عبر البريد' : 'موقعنا الجغرافي')}
                subtitle={channel.subtitle || (channel.phone || channel.email || 'عرض الموقع على الخريطة')}
                icon={Icon}
                bgColor={bgColor}
                iconBgColor="bg-white/20"
                onClick={() => {
                  if (channel.actionUrl) {
                    window.open(channel.actionUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
              />
            );
          })
        )}
      </div>
    </section>
  );
}