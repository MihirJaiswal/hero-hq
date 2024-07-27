'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; //
import { TabsDemo } from './TabDemo';

const Hero = () => {
  return (
    <div className=''>
      <section className="hidden md:block ">
        <div>
          

         <TabsDemo/>
        </div>
      </section>
    </div>
  );
};

export default Hero;