import React from 'react'
import { BorderBeam } from '../ui/border-beam';
import Superhero from './Superhero';

const Container = () => {
  return (
    <div className='bg-bg2 pt-24'>
        <section
      className={`md:bg-bg3 text-white md:p-8 p-3 shadow-lg md:mx-6 relative overflow-hidden transition-opacity duration-700 ease-out transform border-t border-gray-700  `}
    >
        <Superhero/>
      
    </section>
    {/* <BorderBeam size={250} duration={12} delay={9} /> */}
    </div>
  )
}

export default Container