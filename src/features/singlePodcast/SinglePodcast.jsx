import React from 'react'
import SinglePodcastCard from '../shared/cards/SinglePodcastCard'
import PodcastDetails from './components/PodcastDetails'
import RelatedPodcast from './components/RelatedProduct'

export default function SinglePodcast() {
  return (
    <div className='min-h-screen mt-10 flex flex-col gap-10 max-w-7xl mx-auto px-4'>
      <SinglePodcastCard />
      <PodcastDetails />
      <RelatedPodcast />
    </div>
  )
}