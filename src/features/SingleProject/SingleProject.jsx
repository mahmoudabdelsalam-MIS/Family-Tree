import React from 'react'
import MainApp from './components/MainApp'
import FeaturesSingleApp from './components/FeaturesSingleApp'
import ScreenShotsApp from './components/ScreenShotsApp'
import BookingFlow from '../booking/BookingFlow'

export default function SingleProject() {
  return (
    <div>
      <MainApp/>
      <FeaturesSingleApp/>
      <ScreenShotsApp/>
      <BookingFlow/>
    </div>
  )
}
