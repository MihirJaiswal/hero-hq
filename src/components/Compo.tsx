'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const cardData = [
  {
    id: 0,
    imageSrc: '/icons/deadpool.png',
    title: 'Hero Profiles',
    description: 'Explore detailed profiles of iconic heroes, from their origin stories to their most powerful stats. Compare your heores and know their strength',
  },
  {
    id: 1,
    imageSrc: '/icons/Vector.png',
    title: 'Up-to-Date Information',
    description: 'Stay updated with the latest news and updates from the heroes world. Our platform provides real-time info on new characters across various universes.',
  },
  {
    id: 2,
    imageSrc: '/icons/drstrange.png',
    title: 'Hero HQ Features',
    description: 'From interactive hero profiles to advanced search filters, Hero HQ provides all the tools you need to explore and manage your favorite superheroes.',
  }
];

const Compo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  return (
    <div className="bg-bg3">
      <section
        className={`relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-bg3 transition-opacity duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        ref={ref}
      >
        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
          <div>
            <Image 
            src="/logo.png"
            alt="Hero HQ Logo"
            width={150}
            height={150}
            quality={100}
            loading='lazy'
            className='w-24'
            />
          </div>
          <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
            Welcome to Hero HQ
          </span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Discover the Heroes Behind the Legends
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
            At Hero HQ, explore the rich history and diverse powers of your favorite superheroes. Our interactive database offers detailed insights and profiles on a vast array of heroes.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map(({ id, imageSrc, title, description }) => (
            <div 
              key={id}
              className={`rounded-md border border-neutral-800 bg-bg2 p-8 text-center shadow transition-transform transform ${
                activeCard === id ? 'scale-105' : ''
              }`}
              style={{
                backgroundImage: 'linear-gradient(to bottom, #0d111a, #0d1118, #0d1017, #0d1015, #0d0f13)',
              }}
              onClick={() => handleCardClick(id)}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border"> 
                <Image
                 src={imageSrc} 
                 alt={title} 
                 width={100}
                 height={100}
                 quality={100}
                 loading='lazy'
                 className="h-full w-full object-contain" />
              </div>
              <h3 className="mt-6 text-gray-200">{title}</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400 text-center">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute top-0 right-0 z-0 h-1/3 w-full" style={{ backgroundImage: 'linear-gradient(to right top, transparent 0%, transparent 50%, rgba(220, 38, 38, 0.2) 100%)', borderColor: 'rgba(0, 0, 0, 0)' }}></div>
        <div className="absolute top-0 right-0 z-0 h-1/3 w-full" style={{ backgroundImage: 'linear-gradient(to left top, transparent 0%, transparent 50%, rgba(220, 38, 38, 0.2) 100%)', borderColor: 'rgba(0, 0, 0, 0)' }}></div>
      </section>
    </div>
  );
};

export default Compo;
