import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import { MarqueeCard } from '@/components/Marqueecard'
import SpecialCards from '@/components/SpecialCards'
import React from 'react'

const page = () => {
  return (
    <div>
      <HomeHeader/>
      <Hero/>
      <SpecialCards/>
      <MarqueeCard/>
    </div>
  )
}

export default page