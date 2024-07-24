import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import Superhero from '@/components/Superhero'
import React from 'react'

const page = () => {
  return (
    <div>
      <HomeHeader/>
      <Hero/>
      <Superhero/>
    </div>
  )
}

export default page