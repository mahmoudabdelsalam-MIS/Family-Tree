import React from 'react'
import bg from '../../../assets/img10.jpg'

export default function PodcastDetails() {
  return (
    <div className='w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 text-md text-right font-normal text-gray-600 my-10'>
      <div className='flex-1 text-right leading-8'>
        <p>
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
          توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى
          إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح
          لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، 
          مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان 
          أن يطلع على صورة حقيقية لتصميم الموقع.ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم
          ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا 
          علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.هذا النص يمكن أن يتم تركيبه على أي تصميم
          دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
          هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
        </p>
      </div>

      <div className='flex-1 w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm shrink-0'>
        <img 
          src={bg} 
          alt="Podcast Details" 
          className='w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105'
        />
      </div>
    </div>
  )
}