import Footer from '@/components/Footer'
import Container from '@/components/heros/Container'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-bg1 h-screen'>
      <HomeHeader/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default page