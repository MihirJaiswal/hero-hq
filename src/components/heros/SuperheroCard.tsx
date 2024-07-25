import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SuperheroCardProps {
  superhero: {
    id: number;
    name: string;
    biography: {
      fullName: string;
    };
  };
  imageSrc: string;
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({ superhero, imageSrc }) => {
  return (
    <Link href={`/superhero/${superhero.id}`}>
      <div className="relative flex flex-col text-gray-700 bg-gray-900 border border-gray-500 shadow-md bg-clip-border w-72 transform transition-transform hover:scale-105 hover:shadow-lg">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-bg2 backdrop-blur-sm  border border-gray-600 h-60">
          <Image
            src={imageSrc}
            alt={superhero.name}
            layout="fill"
            objectFit="contain"
            className=""
          />
        </div>
        <div className="p-4 text-center">
          <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-300">
            {superhero.name}
          </h4>
          <p
            className="block font-sans text-sm antialiased text-black font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
            Full Name: {superhero.biography.fullName}
          </p>
        </div>
        <div className="flex justify-center p-4 pt-2 gap-5">
          <a href="#facebook"
            className="block font-sans text-lg antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400">
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#twitter"
            className="block font-sans text-lg antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400">
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="#instagram"
            className="block font-sans text-lg antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </Link>
  );
};

export default SuperheroCard;
