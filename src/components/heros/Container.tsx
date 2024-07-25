import React from 'react'
import { BorderBeam } from '../ui/border-beam';
import Superhero from './Superhero';

const Container = () => {
  return (
    <div className='bg-bg2'>
        <section
      className={`md:bg-bg3 text-white md:p-8 p-3 shadow-lg mx-6  relative overflow-hidden transition-opacity duration-700 ease-out transform border border-gray-500`}
    >
        <Superhero/>
      
    </section>
    {/* <BorderBeam size={250} duration={12} delay={9} /> */}
    </div>
  )
}

export default Container