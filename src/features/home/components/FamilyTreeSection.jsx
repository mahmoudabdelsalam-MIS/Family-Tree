import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';

// أيقونة الكارت النصي: لو الباك بعت icon بنستخدمه، وغير كده بنختار حسب ترتيب الكارت (الأول Family والتاني Shield)
const iconByName = {
  family: Users,
  'shield-check': ShieldCheck,
};
const fallbackIcons = [Users, ShieldCheck];

// أبعاد موحدة لكل البلاطات (صور وكروت) عشان الشبكة 2×2 تفضل متساوية
const tileBase = 'relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-sm';

/* ---------- بلاطة واحدة ----------
   isCard = true  : (بلاطة 1 يسار علوي / بلاطة 4 يمين سفلي) كارت أخضر بأيقونة + نص،
                    ولو الباك بعت له صورة بتبقى خلفية له بظل خفيف، ولو مرجعتش بيفضل أخضر
   isCard = false : (بلاطة 2 يمين علوي / بلاطة 3 يسار سفلي) صورة بتملى المربع،
                    ولو فيه نص بيظهر تحت الصورة، ولو مفيش نص بتفضل صورة بس
                    ولو الصورة مرجعتش بيفضل على لون ثابت
*/
function Tile({ tile, alt, isCard, cardIndex }) {
  const hasImage = Boolean(tile?.imageUrl);
  const hasText = Boolean(tile?.body);

  // 1) بلاطة الصورة
  if (!isCard) {
    return (
      <div className={`${tileBase} ${hasImage ? '' : 'bg-gray-200'}`}>
        {hasImage && (
          <img src={tile.imageUrl} alt={alt} draggable="false" className="w-full h-full object-cover" />
        )}

        {/* لو فيه نص يظهر تحت، ولو مفيش نص تفضل صورة بس */}
        {hasText && (
          <>
            {hasImage && (
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            )}
            <p className={`absolute inset-x-0 bottom-0 p-4 md:p-5 text-xs md:text-sm font-bold leading-relaxed text-center ${hasImage ? 'text-white' : 'text-gray-700'}`}>
              {tile.body}
            </p>
          </>
        )}
      </div>
    );
  }

  // 2) الكارت: أخضر ثابت + أيقونة + نص، وصورة خلفية لو راجعة من الباك
  const Icon = iconByName[tile?.icon] || fallbackIcons[Math.max(cardIndex, 0) % fallbackIcons.length];

  return (
    <div className={`${tileBase} bg-primary`}>
      {hasImage && (
        <>
          <img src={tile.imageUrl} alt={alt} draggable="false" className="absolute inset-0 w-full h-full object-cover" />
          {/* ظل خفيف على الخلفية عشان الأيقونة والنص يبانوا */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/40 pointer-events-none" />
        </>
      )}

      <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col items-center justify-center text-center text-white">
        {hasText && (
          <>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm shrink-0">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <p className="text-xs md:text-sm font-bold leading-relaxed">
              {tile.body}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AboutUsSection({ data }) {
  // ترتيب البلاطات حسب sortOrder اللي جاي من الباك (هو نفس ترتيب العرض في الشبكة)
  // 1 = يسار علوي (كارت) | 2 = يمين علوي (صورة) | 3 = يسار سفلي (صورة) | 4 = يمين سفلي (كارت)
  const tiles = (Array.isArray(data?.tiles) ? data.tiles : [])
    .filter(Boolean)
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  // لو الباك بعت 4 بلاطات: الأولى والرابعة كروت، والتانية والتالتة صور (زي لوحة التحكم)
  // غير كده: اللي من غير صورة كارت، واللي فيه صورة بلاطة صورة
  const hasFourTiles = tiles.length === 4;
  const isCardAt = (tile, index) =>
    hasFourTiles ? index === 0 || index === 3 : !tile.imageUrl;

  // رقم الكارت (الأول / التاني) عشان الأيقونة الافتراضية
  let cardCounter = -1;

  return (
    <div className='bg-[#f5f5f5]'>
      <section className="max-w-7xl mx-auto px-4 md:px-2 pb-10 md:py-15 text-secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ------------ 1. الجانب الأيسر (شبكة متساوية 2×2) ------------ */}
          {tiles.length > 0 && (
            // dir="ltr" عشان ترتيب البلاطات يفضل: 1 يسار علوي، 2 يمين علوي، 3 يسار سفلي، 4 يمين سفلي
            <div dir="ltr" className="order-2 md:order-1 lg:col-span-6 w-full p-2 md:p-3">
              <div className="grid grid-cols-2 gap-4">
                {tiles.map((tile, index) => {
                  const isCard = isCardAt(tile, index);
                  if (isCard) cardCounter += 1;

                  return (
                    <Tile
                      key={tile.id || index}
                      tile={tile}
                      alt={data?.header?.title || `صورة قسم ${index + 1}`}
                      isCard={isCard}
                      cardIndex={cardCounter}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------ 2. الجانب الأيمن (النصوص والقيم) ------------ */}
          <div dir='rtl' className="order-1 md:order-2 lg:col-span-6 flex flex-col items-start gap-4 mt-3">

            {/* البادج العلوي */}
            {data?.header?.badge && (
              <span className="px-5 py-2 rounded-full bg-primary text-gray-100 text-xs md:text-sm font-normal">
                {data.header.badge}
              </span>
            )}

            {/* العنوان الرئيسي */}
            <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight mt-1">
              {data?.header?.title}
            </h2>

            {/* الفقرة التعريفية */}
            {data?.header?.intro && (
              <p className="text-gray-500 text-xs md:text-sm font-normal leading-relaxed mt-2 text-justify">
                {data.header.intro}
              </p>
            )}

            {/* قائمة نقدم لك */}
            <div className="w-full mt-4 flex flex-col gap-3">
              <h3 className="text-[#00457B] text-md font-bold mb-1">نُقدّم لك</h3>

              {(Array.isArray(data?.valuePoints) ? data.valuePoints : []).map((item, index) => (
                <div key={item?.id || index} className="flex items-center gap-3">
                  <span className="shrink-0 w-20 text-center py-0.5 rounded-full bg-primary text-white text-sm font-bold">
                    {item?.label}
                  </span>
                  <p
                    className="text-xs md:text-sm font-normal text-[#6A6A6A] leading-snug"
                    dangerouslySetInnerHTML={{ __html: item?.body }}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}