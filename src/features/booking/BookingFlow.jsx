import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepServiceType from './steps/StepServiceType';
import StepDateTime from './steps/StepDateTime';
import { bookingApi } from './api/bookingApi';
import Button from '../shared/button/Button';

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // مرحلة 1: إرسال البيانات الشخصية والحصول على المعرف
  const handleStep1Submit = async (data) => {
    setIsLoading(true);
    try {
      const res = await bookingApi.createBooking(data);
      setBookingId(res.bookingId || res.id); // تخزين معرف الحجز المستلم
      setCurrentStep(2);
    } catch (err) {
      console.error('خطأ في إرسال البيانات الشخصية:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // مرحلة 2: إرسال نوع الخدمة لنفس المعرف
  const handleStep2Submit = async (data) => {
    if (!bookingId) return;
    setIsLoading(true);
    try {
      await bookingApi.updateServiceType(bookingId, data);
      setCurrentStep(3);
    } catch (err) {
      console.error('خطأ في تحديد نوع الخدمة:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // مرحلة 3: إرسال الموعد والتأكيد
  const handleStep3Submit = async (data) => {
    if (!bookingId) return;
    setIsLoading(true);
    try {
      await bookingApi.updateSchedule(bookingId, data);
      setIsCompleted(true);
      setCurrentStep(4);
    } catch (err) {
      console.error('خطأ في حفظ الموعد:', err);
    } finally {
      setIsLoading(false);
    }
  };

    const handleClose = () => {
    setCurrentStep(1);
  };


  return (
    <div className="w-full py-10 px-4">
      {/* الخطوة الأولى تعرض دائمًا بالصفحة */}
      <StepPersonalInfo onSubmit={handleStep1Submit} isLoading={isLoading && currentStep === 1} />

      {/* الخطوة الثانية تظهر عبر مودال Portal */}
      {currentStep === 2 &&
        createPortal(
          <StepServiceType onClose={handleClose} onSubmit={handleStep2Submit} isLoading={isLoading} />,
          document.body
        )}

      {/* الخطوة الثالثة تظهر عبر مودال Portal */}
      {currentStep === 3 &&
        createPortal(
          <StepDateTime onClose={handleClose} onSubmit={handleStep3Submit} isLoading={isLoading} />,
          document.body
        )}

      {/* رسالة النجاح النهائية */}
      {isCompleted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
            <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
              <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">تم الحجز بنجاح!</h3>
              <p className="text-gray-600 mb-6">شكرًا لك، تم حفظ بياناتك وموعدك وسنتواصل معك قريباً.</p>
              <Button onClick={() => window.location.reload()}>
                اغلاق
              </Button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}