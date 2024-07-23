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
      <div className="block max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={superhero.name}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">{superhero.name}</h2>
          <p className="text-gray-700 mt-2">Full Name: {superhero.biography.fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default SuperheroCard;
