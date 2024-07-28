'use client'
import React from 'react';
import Particles from '../ui/particles';
import { TabsDemo } from './TabDemo';

const Hero = () => {
  return (
    <div className=''>
      <section className="hidden md:block ">
      <Particles className="absolute inset-0" quantity={100} ease={80} color='#fff' refresh />
        <div>
         <TabsDemo/>
        </div>
      </section>
    </div>
  );
};

export default Hero;