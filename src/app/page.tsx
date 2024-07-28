import AboutUs from '@/components/About'
import ClientSection from '@/components/Client-section'
import FooterSection from '@/components/Footer'
import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import { MarqueeCard } from '@/components/Marqueecard'
import SpecialCards from '@/components/SpecialCards'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#1A2841]'>
      <HomeHeader/>
      <Hero/>
      <AboutUs/>
      <SpecialCards/>
      <ClientSection/>
      <FooterSection/>
    </div>
  )
}

export default page