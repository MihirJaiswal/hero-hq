'use client';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Define an interface for the superhero data
interface Superhero {
  name: string;
  image: string;
  description: string;
  backgroundImage: string;
  logoImage: string;
}

// Define the data for each superhero
const superheroes: Superhero[] = [
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
    description: 'The Dark Knight of Gotham, Batman uses his intelligence, physical prowess, and an array of gadgets to combat crime.',
    backgroundImage: '/Batman-logo.png',
    logoImage: '/bat.png',
  },
  {
    name: 'Superman',
    image: '/superman3.png',
    description: 'The Man of Steel, Superman is known for his superhuman strength, speed, and the ability to fly.',
    backgroundImage: '/pngegg2.png',
    logoImage: '/super.png',
  },
];

const Hero: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<Superhero>(superheroes[0]);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const handleHeroChange = (hero: Superhero, newDirection: 'left' | 'right') => {
    setDirection(newDirection);
    setSelectedHero(hero);
  };

  return (
    <div className="relative md:h-screen bg-cover bg-bg1 bg-center flex items-center justify-center text-center md:text-left text-white overflow-hidden pt-8 md:pt-1">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedHero.backgroundImage})` }}></div>

      <div className="relative z-10 px-4 md:px-20 flex flex-col md:flex-row items-center md:items-start justify-between w-full">
        <div className="flex w-full flex-col items-center md:flex-row md:items-start justify-between gap-10 relative z-20">
          <div className="mt-16 md:mt-24 flex flex-col items-center md:items-start">
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
            <h1 className="md:text-5xl text-3xl font-bold mb-2">
              <Typewriter
                options={{
                  strings: ['The HeroHQ', 'Discover Your Hero'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-lg mt-2 mx-2">{selectedHero.description}</p>
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
            <div className="flex gap-8 mt-10">
              {superheroes.map(hero => (
                <button
                  key={hero.name}
                  className={`flex flex-col items-center transition transform hover:scale-105 ${selectedHero.name === hero.name ? 'shadow-lg' : 'shadow-md'}`}
                  onClick={() => handleHeroChange(hero, selectedHero.name === hero.name ? 'left' : 'right')}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500">
                    <Image
                      src={hero.image} // Thumbnail image
                      alt={hero.name}
                      width={100}
                      height={100}
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold">{hero.name}</p>
                </button>
              ))}
            </div>

          </div>
          <TransitionGroup className="transition-group w-1/2 relative h-[32rem] flex items-center justify-center">
            <CSSTransition
              key={selectedHero.name}
              timeout={500}
              classNames={direction}
            >
              <Image
                src={selectedHero.image}
                alt="Superhero"
                width={800}
                height={800}
                quality={100}
                objectFit="contain"
                className="main-image"
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Hero;
