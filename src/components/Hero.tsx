'use client';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

// Define the data for each superhero
const superheroes = [
  {
    name: 'Spiderman',
    image: '/spiderman.png',
    description: 'The friendly neighborhood Spiderman! Swinging through the city, fighting crime and protecting the innocent.',
    backgroundImage: '/spiderlogo.png',
    logoImage: '/spider.png',
  },
  {
    name: 'Batman',
    image: '/batman.png',
    description: 'Genius, billionaire, playboy, philanthropist. Ironman, with his advanced technology and unyielding spirit.',
    backgroundImage: '/batlogo.svg',
    logoImage: '/bat.png',
  },
  {
    name: 'Superman',
    image: '/captain-america.png',
    description: 'The first Avenger, fighting for justice and freedom with his indestructible shield and unwavering morals.',
    backgroundImage: '/captain-america-bg.png',
    logoImage: '/captain-america-logo.png',
  },
];

const Hero: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState(superheroes[0]);

  return (
    <div className="relative h-screen bg-cover bg-bg1 bg-center flex items-center justify-center text-center md:text-left text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center"  style={{ backgroundImage: `url(${selectedHero.backgroundImage})` }}></div>
      <div className="absolute w-[570px] h-[570px] left-32 top-32 inset-0">
       {/*  <Image
          src={selectedHero.backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-96 h-auto"
        /> */}
      </div>

      <div className="relative z-10 px-20 flex flex-col md:flex-row items-center md:items-start justify-between w-full">
        <div className="flex w-full flex-col items-center md:flex-row md:items-start justify-between gap-10 relative z-20">
          <div className="mt-24 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center mb-4">
              <Image
                src={selectedHero.logoImage} // Use the path to the selected hero's logo
                alt="Superhero Logo"
                width={800}
                height={800}
                quality={100}
                objectFit="contain"
                className="w-48"
              />
            </div>
            <h1 className="text-5xl font-bold mb-2">
              <Typewriter
                options={{
                  strings: ['Welcome to HeroHQ', 'Unleash Your Inner Hero'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-lg mt-2">{selectedHero.description}</p>
            <div className='flex items-center justify-center gap-4 my-6'>
              <a
                href="#"
                className="inline-block bg-[#ff0000] hover:bg-[#cc0000] text-white font-semibold py-3 px-4 rounded transition duration-300"
              >
                Join Now
              </a>
              <a
                href="#"
                className="inline-block bg-[#ff0000] hover:bg-[#cc0000] text-white font-semibold py-3 px-4 rounded transition duration-300"
              >
                Learn More
              </a>
            </div>
            <div className='flex gap-4 mt-10'>
              {superheroes.map(hero => (
                <button
                  key={hero.name}
                  className="flex flex-col items-center"
                  onClick={() => setSelectedHero(hero)}
                >
                  <Image
                    src={hero.image} // Thumbnail image
                    alt={hero.name}
                    width={100}
                    height={100}
                    objectFit="cover"
                    className="w-24 h-24 rounded-full border-2 border-white"
                  />
                  <p className="mt-2 text-sm">{hero.name}</p>
                </button>
              ))}
            </div>
          </div>
          <Image
            src={selectedHero.image} // Main superhero image
            alt="Superhero"
            width={800}
            height={800}
            quality={100}
            objectFit="contain"
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
