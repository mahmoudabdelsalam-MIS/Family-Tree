import React from 'react'
import FamilyTreeSection from '../home/components/FamilyTreeSection'
import CardsSection from './components/CardsNameSection'
import { useHomeData } from '../../hooks/useHome'
import FamilyTreeSkeleton from '../shared/skeleton/FamilyTreeSkeleton'

export default function AboutUs() {
  const { data: response , isLoading } = useHomeData()
  const aboutData = response?.data?.aboutSection || {}
  return (
    <>
      {isLoading ? (
        <FamilyTreeSkeleton />
      ) : (
        <FamilyTreeSection data={aboutData} />
      )}
      <CardsSection/>
    </>
  )
}
