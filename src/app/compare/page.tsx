import SuperheroCompare from '@/components/compare/Compare'
import React from 'react'
import HomeHeader from '@/components/HomeHeader'
import Footer from '@/components/Footer'
import { MainSection } from '@/components/compare/MainSection'

const page = () => {
  return (
    <div className='bg-bg1 h-screen'>
        <HomeHeader/>
        <MainSection/>
        <SuperheroCompare/>
        <Footer/>
    </div>
  )
}

export default page