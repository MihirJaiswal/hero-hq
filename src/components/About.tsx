'use client';
import React, { useEffect, useRef, useState } from 'react';
import Compo from './Compo';
import { BorderBeam } from './ui/border-beam';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className='bg-bg2'>
        <section
      className={`md:bg-bg3 text-white md:p-8 p-3 shadow-lg md:max-w-7xl mx-auto mt-1 md:mt-20 relative overflow-hidden transition-opacity duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 md:border border-gray-600 '
      }`}
      ref={ref}
    >
      <Compo/>
      <BorderBeam size={250} duration={12} delay={9} colorFrom='red' colorTo='purple' />
    </section>
    </div>
  );
};

export default AboutUs;
