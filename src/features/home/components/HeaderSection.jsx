import React from 'react'
import GlowBackground from '../components/GlowBackground'
import HeroSectionContent from './HeroSectionContent'

export default function HeaderSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5]">
    <GlowBackground />
    <div className="relative z-10">
        <HeroSectionContent/>
    </div>  
    </section>
  )
}
