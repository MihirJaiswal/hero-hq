'use client'
import React from 'react';
import Particles from '../ui/particles';
import { TabMob } from './TabMob';

const HeroMob = () => {
  return (
    <div className='md:hidden'>
      <section className="pt-24 bg-dotted-pattern bg-contain py-5 md:py-10">
      <Particles className="absolute inset-0" quantity={100} ease={80} color='#fff' refresh />
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div 
            className="flex flex-col justify-center gap-8"
          >
             <h1 className="font-semibold text-gray-100 text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
              Discover the Heroes!
            </h1>
            <p className="tracking-[2%] md:font-normal text-[20px] leading-[36px] text-gray-400">
            Dive into the world of superheroes and explore the incredible stories of over 3,000 iconic characters. 
            </p>
            <a
                href="#explore"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 w-36"
              >
                Explore Now
              </a>
          </div>
          <TabMob/>
        </div>
      </section>
    </div>
  );
};

export default HeroMob;