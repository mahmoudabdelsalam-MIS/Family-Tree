import React from 'react';

/* الأحجام التلاتة زي الصورة */
const sizes = {
  sm: 'w-full sm:w-[178px] h-[142px]', // الكارت الأبيض الصغير
  md: 'w-full sm:w-[178px] h-[285px]', // كارت الشجرة والكارت الأزرق
  lg: 'w-full sm:w-[280px] h-[345px]', // كارت الأخضر وكارت الموبايل
};

/* الألوان / الأنواع */
const variants = {
  green: 'bg-primary text-white',
  blue: 'bg-[#004a87] text-white',
  white: 'bg-white text-[#004a87]',
  image: 'bg-gray-200 text-white',
};

/**
 * كارت عام.
 *
 * <Card size="lg" variant="green"> ...أي محتوى... </Card>
 * <Card size="md" variant="image" image={images.tree} />
 * <Card size="sm" variant="white" className="shadow-lg"> ... </Card>
 *
 * props:
 *  - size:    'sm' | 'md' | 'lg'
 *  - variant: 'green' | 'blue' | 'white' | 'image'
 *  - image:   رابط صورة الخلفية 
 *  - overlay: طبقة غامقة فوق الصورة لتحسين قراءة النص
 *  - className: أي كلاسات إضافية
 */
export default function HeroSectionCard({
  size = 'md',
  variant = 'green',
  image,
  overlay = false,
  className = '',
  children,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl shrink-0
        ${sizes[size] ?? sizes.md}
        ${variants[variant] ?? variants.green}
        ${className}`}
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {overlay && <div className="absolute inset-0 bg-black/20" />}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}