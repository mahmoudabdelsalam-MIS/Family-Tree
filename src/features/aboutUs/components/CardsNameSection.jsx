import React from 'react';
import AboutUsCard from '../../shared/cards/AboutUsCard';
import { MessageSquare, Eye, Target } from 'lucide-react'; // يمكنك استخدام أية أيقونات من اختيارك

export default function CardsSection() {
  const cards = [
    {
        title:"رسالتنا",
        description:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص",
        icon: MessageSquare,
        size:"normal"
    },
    {
        title:"رؤيتنا",
        description:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص",
        icon: Eye,
        size:"large"
    },
    {
        title:"هدفنا",
        description:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص",
        icon: Target,
        size:"normal"
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12 flex flex-col md:flex-row items-center justify-center gap-6 dir-rtl">
    {cards.map((card) => (
        <AboutUsCard
        title={card.title}
        description={card.description}
        icon={card.icon}
        size={card.size}
        />
    ))}
    </div>
  );
}