import React from 'react'
import Superhero from './Superhero';

const Container = () => {
  return (
    <div className='md:bg-bg2' id='explore'>
      <section className={`md:bg-bg3 bg-bg2 text-white md:p-8 p-3 shadow-lg md:mx-6 relative overflow-hidden transition-opacity duration-700 ease-out transform border-t border-gray-700  `}>
        <Superhero/>
    </section>
    </div>
  )
}

export default Container