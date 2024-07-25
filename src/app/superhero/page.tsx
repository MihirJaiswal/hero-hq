import Footer from '@/components/Footer'
import Container from '@/components/heros/Container'
import { MainSection } from '@/components/heros/MainSection'
import Superhero from '@/components/heros/Superhero'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-bg1 h-screen'>
      <HomeHeader/>
      <MainSection/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default page