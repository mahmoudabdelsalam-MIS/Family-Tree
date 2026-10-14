import React from 'react'
import breakSection from '../../../assets/breakSection.png'

export default function LineBreak() {
  return (
<div
  className="w-full h-24 bg-repeat-x bg-size-[auto_100%]"
  style={{ backgroundImage: `url(${breakSection})` }}
/>
  )
}
