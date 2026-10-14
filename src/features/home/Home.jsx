import React from 'react'
import HeaderSection from './components/HeaderSection'
import FamilyTreeSection from './components/FamilyTreeSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestmonialsSection'
import FaqSection from './components/FaqSection'
import FeaturesScrollSection from './components/FeaturesScrollSection'
import BookingFlow from '../booking/BookingFlow'

export default function Home() {
  return (
    <>
      <HeaderSection/>
      <FamilyTreeSection/>
      <TestimonialsSection/>
      <ProjectsSection/>
      <FaqSection/>
      <FeaturesScrollSection/>
      <BookingFlow/>
    </>
  )
}
