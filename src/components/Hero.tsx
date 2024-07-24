'use client';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Particles from './ui/particles';

interface Superhero {
  name: string;
  image: string;
  description: string;
  backgroundImage: string;
  logoImage: string;
}

const superheroes: Superhero[] = [
  {
    name: 'Spiderman',
    image: '/spiderman3.png',
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
    image: '/superman.png',
    description: 'The Man of Steel, Superman is known for his superhuman strength, speed, and the ability to fly.',
    backgroundImage: '/pngegg2.png',
    logoImage: '/super.png',
  },
];

const Hero: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<Superhero>(superheroes[1]);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const handleHeroChange = (hero: Superhero, newDirection: 'left' | 'right') => {
    setDirection(newDirection);
    setSelectedHero(hero);
  };

  const getBackgroundStyle = (hero: Superhero) => {
    const isBatmanOrSuperman = hero.name === 'Batman' || hero.name === 'Superman';
    return {
      backgroundImage: `url(${hero.backgroundImage})`,
      opacity: isBatmanOrSuperman ? 0.5 : 1
    };
  };

  return (
    <div className="relative bg-bg1 min-h-screen bg-cover bg-center flex items-center justify-center text-center md:text-left text-white overflow-hidden pt-8 md:pt-1">
      <Particles className="absolute inset-0" quantity={100} ease={80} color='#fff' refresh />
      <div className="absolute inset-0 bg-cover bg-center" style={getBackgroundStyle(selectedHero)}></div>
      
      <div className="relative z-10 px-4 md:px-20 flex flex-col md:flex-row items-center md:items-start justify-between w-full">
        <div className="flex w-full flex-col items-center md:flex-row md:items-start justify-between gap-10 relative z-20">
          <div className="mt-16 md:mt-24 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center mb-4">
              <Image
                src={selectedHero.logoImage}
                alt="Superhero Logo"
                width={800}
                height={800}
                quality={100}
                objectFit="contain"
                className="w-32 md:w-48"
              />
            </div>
           
            <h1 className="md:text-5xl text-3xl font-bold mb-4">
              <Typewriter
                options={{
                  strings: ['The HeroHQ', 'Discover Your Hero'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-lg mt-2 mx-2 md:mx-0">{selectedHero.description}</p>
            <div className='flex items-center justify-center gap-4 my-6'>
              <a
                href="#"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
              >
                Join Now
              </a>
              <a
                href="#"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 md:gap-8 mt-8 md:mt-10 flex-wrap justify-center md:justify-start">
            {superheroes.map(hero => (
              <button
                key={hero.name}
                className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:rotate-2 ${selectedHero.name === hero.name ? 'scale-125 shadow-2xl' : 'scale-100 shadow-md'}`}
                onClick={() => handleHeroChange(hero, selectedHero.name === hero.name ? 'left' : 'right')}
              >
                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 md:border-4 ${selectedHero.name === hero.name ? 'border-red-600' : 'border-white'}`}>
                  <Image
                    src={hero.image}
                    alt={hero.name}
                    width={80}
                    height={80}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-full ${selectedHero.name === hero.name ? 'opacity-75' : 'opacity-50'}`}></div>
                </div>
                <p className="mt-1 text-xs md:text-sm font-semibold">{hero.name}</p>
              </button>
            ))}
          </div>

          </div>
          <TransitionGroup className="transition-group w-full relative h-96 md:h-full flex items-center justify-center">
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
                className="main-image mt-10 md:mt-0"
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Hero;
