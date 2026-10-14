import React from 'react';

const sizes = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-9 h-9 text-base',
  lg: 'w-10 h-10 text-lg',
};

/**
 * دايرة بداخلها أيقونة.
 * - لو مرّرت href بتبقى رابط <a>
 * - لو مرّرت onClick بتبقى <button>
 * - غير كده بتبقى عنصر عادي (للعرض فقط)
 *
 * الاستخدام:
 *   <IconCircle icon={<FaFacebookF />} href="https://facebook.com/..." label="فيسبوك" />
 *   <IconCircle icon={<MapPin size={16} />} size="lg" />
 */
export default function IconCircle({
  icon,
  href,
  onClick,
  label,
  size = 'md',
  className = '',
}) {
  const base = `
    inline-flex items-center justify-center shrink-0 rounded-full
    border border-gray-800 text-gray-800 bg-transparent
    transition-colors duration-200
    ${sizes[size] ?? sizes.md}
    ${className}
  `;
  const interactive = 'hover:bg-primary hover:border-primary hover:text-orange-400 cursor-pointer';

  if (href) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    return (
      <a
        href={href}
        aria-label={label}
        title={label}
        {...(isExternal && href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className={`${base} ${interactive}`}
      >
        {icon}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} title={label} className={`${base} ${interactive}`}>
        {icon}
      </button>
    );
  }

  return <span className={base}>{icon}</span>;
}