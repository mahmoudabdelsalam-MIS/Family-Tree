import React from 'react'
import GlowBackground from '../components/GlowBackground'
import HeroSectionContent from './HeroSectionContent'

export default function HeaderSection({stats , heroSlides , heroCards , heroPromo}) {
  
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5]">
    <GlowBackground />
    <div className="relative z-10">
        <HeroSectionContent stats={stats} heroSlides={heroSlides} heroCards={heroCards} heroPromo={heroPromo}/>
    </div>  
    </section>
  )
}
