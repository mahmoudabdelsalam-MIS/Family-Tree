import { useId } from 'react'

const SHAPE_PATH =
  'M622 0V235C622 262.614 599.614 285 572 285H404C376.386 285 354 307.386 354 335V546C354 573.614 331.614 596 304 596H0V361C0 333.386 22.3858 311 50 311H218C245.614 311 268 288.614 268 261V50C268 22.3858 290.386 0 318 0H622Z'
  
export default function ShapedImage({ src, alt = '', className = '' }) {
  // id فريد لكل نسخة عشان لو استخدمته أكتر من مرة في نفس الصفحة ما يحصلش تعارض
  const clipId = `shaped-image-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox="0 0 622 596"
      className={className}
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPE_PATH} />
        </clipPath>
      </defs>
      <image
        href={src}
        width="622"
        height="596"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}