import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import { MarqueeCard } from '@/components/Marqueecard'
import App from '@/components/ParallelScroll'
import React from 'react'

const page = () => {
  return (
    <div>
      <HomeHeader/>
      <Hero/>
      <App/>
      <MarqueeCard/>
    </div>
  )
}

export default page