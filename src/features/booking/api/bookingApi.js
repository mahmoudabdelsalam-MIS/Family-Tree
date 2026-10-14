// دالة مساعدة لمحاكاة تأخير الشبكة (1 ثانية)
const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const bookingApi = {
  // المرحلة 1: محاكاة إنشاء الحجز وإنشاء bookingId فريد
  createBooking: async (personalData) => {
    await delay(1000); // محاكاة وقت الاستجابة من السيرفر

    // إنشاء ID وهمي وتخزينه في localStorage للمتابعة
    const mockBookingId = 'MOCK-BOOKING-' + Date.now();
    const mockData = { id: mockBookingId, ...personalData, step: 1 };

    localStorage.setItem(mockBookingId, JSON.stringify(mockData));
    console.log('📦 [Mock API] تم إنشاء الحجز المبدئي:', mockData);

    return {
      success: true,
      bookingId: mockBookingId,
      message: 'تم حفظ البيانات الشخصية بنجاح',
    };
  },

  // المرحلة 2: محاكاة تحديث نوع الخدمة
  updateServiceType: async (bookingId, serviceData) => {
    await delay(800);

    const existingData = JSON.parse(localStorage.getItem(bookingId) || '{}');
    const updatedData = { ...existingData, ...serviceData, step: 2 };

    localStorage.setItem(bookingId, JSON.stringify(updatedData));
    console.log('📦 [Mock API] تم تحديث نوع الخدمة:', updatedData);

    return {
      success: true,
      message: 'تم اختيار الخدمة بنجاح',
    };
  },

  // المرحلة 3: محاكاة تحديد الموعد وتأكيد الحجز النهائي
  updateSchedule: async (bookingId, scheduleData) => {
    await delay(800);

    const existingData = JSON.parse(localStorage.getItem(bookingId) || '{}');
    const finalData = { ...existingData, ...scheduleData, status: 'completed' };

    localStorage.setItem(bookingId, JSON.stringify(finalData));
    console.log('🎉 [Mock API] اكتمل الحجز بنجاح بالكامل:', finalData);

    return {
      success: true,
      message: 'تم تأكيد الحجز بنجاح',
    };
  },
};