import Footer from '@/components/Footer'
import Container from '@/components/heros/Container'
import HeroCont from '@/components/heros/HeroCont'
import HeroMob from '@/components/heros/HeroMob'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-bg1 h-screen'>
      <HomeHeader/>
      <HeroCont/>
      <HeroMob/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default page