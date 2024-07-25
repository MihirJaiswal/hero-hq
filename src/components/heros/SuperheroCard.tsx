import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SuperheroCardProps {
  superhero: {
    id: number;
    name: string;
    biography: {
      fullName: string;
      publisher: string;
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
          <p className="font-sans text-red-600 text-sm antialiased font-medium leading-relaxed">
              Publisher: <span className='text-gray-400'>{superhero.biography.publisher}</span>
            </p>
        </div>
      
      </div>
    </Link>
  );
};

export default SuperheroCard;
