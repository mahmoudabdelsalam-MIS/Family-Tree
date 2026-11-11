import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { bgcardhero, bgcard2, bgBlueCard } from '../../../assets/assets';
import Card from '../../shared/cards/HeroSectionCard';
import LineBreak from '../../shared/break/LineBreak';
import Button from '../../shared/button/Button';
import FloatingActionBadge from './FloatingActionBadge';

export default function HeroSectionContent({ stats, heroSlides, heroCards, heroPromo, familyIdeasPlatform }) {
  
  const getCardByType = (type) => heroCards?.find(card => card.cardType === type) || {};

  const appPromoCard = getCardByType('app_promo');
  const mediaCard = getCardByType('media');
  const partnersCard = getCardByType('partners_summary');
  const counterCard = getCardByType('counter_stat');
  const reviewsCard = getCardByType('reviews_summary');

  console.log("heroCards" , heroCards);
  

  const resolveMedia = (card) => {
    if (!card) return null;
    const isVideo = card.mediaType === 'video' || card.hasVideo === true;
    if (isVideo) {
      const videoUrl = card.mediaUrl || card.linkUrl;
      if (videoUrl) {
        return { variant: 'video', videoUrl, image: card.posterUrl || card.imageUrl };
      }
    }
    const image = card.imageUrl || card.posterUrl || (card.mediaType === 'image' ? card.mediaUrl : null);
    return image ? { variant: 'image', image } : null;
  };

  const resolveSlideMedia = (slide) =>
    slide ? resolveMedia({ mediaType: slide.mediaType, mediaUrl: slide.mediaUrl, posterUrl: slide.posterUrl }) : null;

  const appPromoMedia = resolveMedia(appPromoCard) || resolveSlideMedia(heroSlides?.[0]) || { variant: 'image', image: bgcardhero };
  const mediaCardMedia = resolveMedia(mediaCard) || resolveSlideMedia(heroSlides?.[1]) || { variant: 'image', image: bgcard2 };
  const counterMedia = resolveMedia(counterCard);
  const partnersMedia = resolveMedia(partnersCard);
  const reviewsMedia = resolveMedia(reviewsCard);

  const mediaOverlay = (
    <div aria-hidden="true" className="absolute -top-4 inset-x-0 bottom-0 rounded-[inherit] bg-black/30 pointer-events-none" />
  );
  const appPromoHasBackendMedia = appPromoMedia.image !== bgcardhero || appPromoMedia.variant === 'video';

  return (
    <section dir="rtl" className="relative w-full max-w-full overflow-x-clip overflow-y-visible pt-35 md:pb-12">
      {/* النصوص والبرومو */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5 text-secondary">
        <p className="text-gray-700 text-base font-normal md:text-xl">
          {heroPromo?.subTitle || "بمناسبة اليوم الوطني السعودي 96"}
        </p>

        <h1 className="text-3xl md:text-5xl font-extrabold text-secondary leading-tight">
          {heroPromo?.title ? heroPromo.title : <>احتفل بهويتك وخلد <span className="text-primary">شجرة عائلتك</span></>}
        </h1>

        <p className="text-lg md:text-3xl font-bold text-gray-700">
          {heroPromo?.help || "خصم 25 % على تصميم المشجرات وتطبيقات العائلة لفترة محدودة"}
        </p>
        
        <div className='mt-0 md:mt-10'>
          {heroPromo?.ctaUrl ? (
            <a href={heroPromo.ctaUrl} target="_blank" rel="noopener noreferrer">
              <Button dir="ltr" round="xl" variant="primary" icon={ShoppingBag} className="px-13 py-4">
                {heroPromo?.ctaLabel || "تسوق الأن"}
              </Button>
            </a>
          ) : (
            <Link to="/products">
              <Button dir="ltr" round="xl" variant="primary" icon={ShoppingBag} className="px-13 py-4">
                {heroPromo?.ctaLabel || "تسوق الأن"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* الـ 5 كروت: تحويل الحاوية إلى عمودي على الموبايل وأفقي على الشاشات الكبيرة */}
      <div className="max-w-6xl mx-auto mt-10 md:mt-2 flex flex-col lg:flex-row justify-center items-center lg:items-end gap-4 md:gap-5 mb-10 px-4 lg:px-12">
        
        {/* 1) كارت التطبيق */}
        <div className="w-full lg:w-auto">
          <Card size="lg" variant={appPromoMedia.variant} image={appPromoMedia.image} videoUrl={appPromoMedia.videoUrl} className="relative w-full">
            {appPromoHasBackendMedia && mediaOverlay}
            <div className="relative m-3 p-3 rounded-2xl border border-gray-300 bg-white/25 backdrop-blur-sm text-white">
              <h3 className="text-sm font-light mb-1">{appPromoCard.title || heroSlides?.[0]?.title}</h3>
              <p className="text-[11px] leading-5 font-light">
                {appPromoCard.body || heroSlides?.[0]?.subtitle || "كل عائلتك في مكان واحد ، توثيق الانساب ، مشاركة الذكريات ، تعزيز التواصل العائلي بسهولة ."}
              </p>
            </div>
          </Card>
        </div>
        
        {/* 2) الكارت الازرق */}
        <div className="w-full lg:w-auto">
          <Card size="md" variant={counterMedia ? counterMedia.variant : 'blue'} image={counterMedia?.image} videoUrl={counterMedia?.videoUrl} className={`w-full ${counterMedia ? 'relative' : ''}`}>
            {counterMedia && mediaOverlay}
            <div className={`relative z-10 h-full flex flex-col items-center justify-between text-center p-5 ${counterMedia ? 'text-white' : ''}`}>
              <div>
                <p dir='ltr' className="font-bold text-lg">{counterCard.statValue || stats?.trustedFamilyTrees?.value || "+ 10 k"}</p>
                <p className="text-sm font-normal">{counterCard.statLabel || stats?.trustedFamilyTrees?.label || "شجرة عائلة موثوقة"}</p>
              </div>
              <img src={bgBlueCard} alt="bgBlueCard" className='w-[40%] h-[60%] sm:w-[67px] md:h-[70px]'/>
              <p className="text-[11px] leading-5">
                {counterCard.body || stats?.trustedFamilyTrees?.description}
              </p>
            </div>
          </Card>
        </div>

        {/* 3) الكارت الأبيض */}
        <div className="w-full lg:w-auto self-auto lg:self-end">
          <Card size="sm" variant={partnersMedia ? partnersMedia.variant : 'white'} image={partnersMedia?.image} videoUrl={partnersMedia?.videoUrl} className={`w-full ${partnersMedia ? 'relative' : ''}`}>
            {partnersMedia && mediaOverlay}
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1 p-2">
              <div className="flex -space-x-3 items-center">
                <span className="z-10 w-9 h-9 rounded-full bg-[#F3F3F3] border-2 border-white text-[#00457B] text-[10px] font-bold flex items-center justify-center shadow-sm relative">
                  {partnersCard.statValue || stats?.successPartners?.value || "100 +"}
                </span>
                
                {(partnersCard.avatarUrls || stats?.successPartners?.avatarUrls || []).map((avatarUrl, i) => (
                  <span key={i} className="w-9 h-9 rounded-full bg-[#F3F3F3] border-2 border-white overflow-hidden shadow-sm flex items-center justify-center relative" style={{ zIndex: (partnersCard.avatarUrls || stats?.successPartners?.avatarUrls || []).length - i }}>
                    <img src={avatarUrl} alt="Partner" className="w-full h-full object-cover" />
                  </span>
                ))}
              </div>

              <p className={`text-xl font-extrabold mt-1 ${partnersMedia ? 'text-white' : 'text-[#00457B]'}`}>
                {partnersCard.statValue || stats?.successPartners?.value || "100 +"}
              </p>
              <p className={`text-xs font-semibold ${partnersMedia ? 'text-white' : 'text-[#00457B]'}`}>
                {partnersCard.statLabel || stats?.successPartners?.label || "شريك نجاح"}
              </p>
            </div>
          </Card>
        </div>

        {/* 4) كارت الشجرة / الوسائط */}
        <div className="w-full lg:w-auto">
          <Card size="md" variant={mediaCardMedia.variant} image={mediaCardMedia.image} videoUrl={mediaCardMedia.videoUrl} title={mediaCard.title || heroSlides?.[1]?.title} subtitle={mediaCard.body || heroSlides?.[1]?.subtitle} className="relative w-full">
            {/* في وضع الصورة الكارت مش بيرسم العنوان والنص لوحده، فبنعرضهم هنا فوق الصورة (في وضع الفيديو الكارت بيتولاهم) */}
            {mediaCardMedia.variant === 'image' && (mediaCard.title || mediaCard.body) && (
              <>
                <div aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-linear-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 flex flex-col items-center text-center text-white">
                  {(mediaCard.title) && (
                    <p className="text-sm font-normal">{mediaCard.title}</p>
                  )}
                  {mediaCard.body && (
                    <p className="text-[11px] leading-5 font-light mt-1">{mediaCard.body}</p>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>

        {/* 5) الكارت الأخضر / التقييمات مع الزر الدائري */}
        <div className="relative w-full lg:w-auto">
          <Card size="lg" variant={reviewsMedia ? reviewsMedia.variant : 'green'} image={reviewsMedia?.image} videoUrl={reviewsMedia?.videoUrl} className="relative overflow-hidden w-full">
            {reviewsMedia && mediaOverlay}
            <div className="absolute right-0 bottom-20 pointer-events-none opacity-80">
              <svg width="209" height="200" viewBox="0 0 209 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="195" cy="100" rx="14" ry="85" fill="white" fillOpacity="0.07"/>
                <ellipse cx="155" cy="100" rx="26" ry="100" fill="white" fillOpacity="0.07"/>
                <ellipse cx="103" cy="91" rx="26" ry="75" fill="white" fillOpacity="0.07"/>
                <ellipse cx="51" cy="90" rx="26" ry="62" fill="white" fillOpacity="0.07"/>
                <ellipse cx="12.5" cy="96" rx="12.5" ry="36" fill="white" fillOpacity="0.07"/>
              </svg>
            </div>

            <div className="relative z-10 h-full flex flex-col items-start justify-between p-5">
              <div dir='ltr' className="flex gap-1 items-center">
                {[...Array(5)].map((_, i) => (
                  i < (reviewsCard.averageRating || stats?.reviewsSummary?.averageRating || 5) ? (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.74001 16C5.85001 15.51 5.65001 14.81 5.30001 14.46L2.87001 12.03C2.11001 11.27 1.81001 10.46 2.03001 9.76C2.26001 9.06 2.97001 8.58 4.03001 8.4L7.15001 7.88C7.60001 7.8 8.15001 7.4 8.36001 6.99L10.08 3.54C10.58 2.55 11.26 2 12 2C12.74 2 13.42 2.55 13.92 3.54L15.64 6.99C15.77 7.25 16.04 7.5 16.33 7.67L5.56001 18.44C5.42001 18.58 5.18001 18.45 5.22001 18.25L5.74001 16Z" fill="white"/>
                      <path d="M18.7 14.46C18.34 14.82 18.14 15.51 18.26 16L18.95 19.01C19.24 20.26 19.06 21.2 18.44 21.65C18.19 21.83 17.89 21.92 17.54 21.92C17.03 21.92 16.43 21.73 15.77 21.34L12.84 19.6C12.38 19.33 11.62 19.33 11.16 19.6L8.22999 21.34C7.11999 21.99 6.16999 22.1 5.55999 21.65C5.32999 21.48 5.15999 21.25 5.04999 20.95L17.21 8.79002C17.67 8.33002 18.32 8.12002 18.95 8.23002L19.96 8.40002C21.02 8.58002 21.73 9.06002 21.96 9.76002C22.18 10.46 21.88 11.27 21.12 12.03L18.7 14.46Z" fill="white"/>
                    </svg>
                  ) : (
                    <Star key={i} size={24} />
                  )
                ))}
              </div>
              
              <div className='flex flex-col items-start justify-center'>
                <p dir='ltr' className="text-2xl font-bold">{reviewsCard.statValue || stats?.reviewsSummary?.countLabel || "+ 100"}</p>
                <p className="text-xs text-gray-100 mb-6">{reviewsCard.statLabel || "تقييم"}</p>
              </div>
              
              <p className="text-sm font-light leading-6 w-50">
                {reviewsCard.body || stats?.reviewsSummary?.body}
              </p>
            </div>
          </Card>

          {/* الزر الدائري */}
          <div className="absolute -bottom-5 -left-4 md:-left-5 z-30">
            <FloatingActionBadge familyIdeasPlatform={familyIdeasPlatform}/>
          </div>
        </div>

      </div>

      <LineBreak />
    </section>
  );
}