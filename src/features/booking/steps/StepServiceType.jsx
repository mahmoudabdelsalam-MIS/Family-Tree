import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceTypeSchema } from '../schemas/serviceTypeSchema';
import Button from '../../shared/button/Button';
import ExitButton from '../../shared/button/ExitButton';
import { useServicesList } from '../../../hooks/useServicesCatalog';

export default function StepServiceType({ onSubmit, isLoading, onClose }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(serviceTypeSchema),
  });

  const { data: response, isLoading: isServicesLoading, error: servicesError } = useServicesList();
  const services = response?.data || [];

  const selectedService = watch('serviceType');

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
      {/* الإطار الأخضر الخارجي */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#65A30D] p-4 md:p-6 rounded-[35px] shadow-2xl"
      >
        <div className="bg-white rounded-[28px] p-6 md:p-10 relative overflow-hidden">
          <ExitButton size="md" onClick={onClose}/>

          <h2 className="text-center text-xl md:text-2xl font-extrabold text-gray-800 mb-2">
            اختر نوع <span className="text-lime-600 underline underline-offset-8">المنتج / الخدمة</span> المطلوبة
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col items-center">
            {isServicesLoading ? (
              <div className="py-10 text-gray-500 font-semibold">جاري تحميل الخدمات...</div>
            ) : servicesError ? (
              <div className="py-10 text-red-500 font-semibold">تعذر تحميل الخدمات، يرجى المحاولة لاحقاً.</div>
            ) : (
              /* تم تحديث الكلاس هنا إلى custom-services-scroll وإضافة ps-4 لمسافة آمنة من الاسكرول */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 custom-services-scroll pr-4 w-full max-w-2xl text-right mb-8 max-h-[45vh] overflow-y-auto">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center justify-between gap-3 cursor-pointer group py-1 text-gray-700 hover:text-lime-600 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base">{service.title}</span>
                    <input
                      type="radio"
                      value={service.categoryId || service.id}
                      {...register('serviceType')}
                      className="w-5 h-5 shrink-0 accent-lime-600 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            )}

            {errors.serviceType && (
              <span className="text-red-500 text-sm mb-4">{errors.serviceType.message}</span>
            )}

            <Button
              type="submit"
              disabled={isLoading || isServicesLoading || !selectedService}
            >
              {isLoading ? 'جاري الحفظ...' : 'إرسال'}
            </Button>
          </form>
        </div>

        {/* الـ SVGs */}
        <svg
          className='absolute bottom-[-15px] md:bottom-[-24px] left-1/2 -translate-x-1/2 w-[115%] md:w-[800px] h-auto pointer-events-none'
          viewBox="0 0 1040 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path opacity="0.88" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
        </svg>

        <svg
          className='absolute bottom-[-30px] md:bottom-[-45px] left-1/2 -translate-x-1/2 w-[110%] md:w-[720px] h-auto pointer-events-none'
          viewBox="0 0 1040 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path opacity="0.78" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
        </svg>
      </div>

      {/* ستايل الاسكرول المخصص والمحدث */}
<style>{`
  /* 1. إخفاء أسهم الـ Scrollbar تماماً */
  .custom-services-scroll::-webkit-scrollbar-button {
    display: none !important;
    width: 0;
    height: 0;
  }

  .custom-services-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .custom-services-scroll::-webkit-scrollbar-track {
    background: transparent; /* خلفية شفافة لعدم التشويش */
    border-radius: 10px;
  }

  .custom-services-scroll::-webkit-scrollbar-thumb {
    background: #65A30D; /* اللون الأخضر الأساسي */
    border-radius: 10px;
    /* هذه الخدعة تجعل الشريط يبدو أصغر ومبعاداً عن الحواف */
    border: 2px solid transparent; 
    background-clip: padding-box;
  }

  .custom-services-scroll::-webkit-scrollbar-thumb:hover {
    background: #4d7c0f; /* أخضر أغمق عند التمرير */
    background-clip: padding-box;
  }

  /* دعم متصفح فايرفوكس */
  .custom-services-scroll {
    scrollbar-width: thin;
    scrollbar-color: #65A30D transparent;
  }
`}</style>
    </div>
  );
}