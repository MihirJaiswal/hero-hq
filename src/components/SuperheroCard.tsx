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
      <div className="relative max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 group">
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={superhero.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg transition-transform group-hover:scale-110"
          />
        </div>
        <div className="p-4 relative z-10">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-white">{superhero.name}</h2>
          <p className="text-gray-700 mt-2 group-hover:text-gray-200">Full Name: {superhero.biography.fullName}</p>
  
        </div>
      </div>
    </Link>
  );
};

export default SuperheroCard;
