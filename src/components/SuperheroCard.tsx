import React from 'react';
import Link from 'next/link';

interface SuperheroCardProps {
  superhero: {
    id: number;
    name: string;
    images: {
      sm: string;
    };
    biography: {
      fullName: string;
    };
  };
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({ superhero }) => {
  return (
    <Link href={`/superhero/${superhero.id}`}>
      <div className="block max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        <img className="w-full h-48 object-cover" src={superhero.images.sm} alt={superhero.name} />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">{superhero.name}</h2>
          <p className="text-gray-700">Full Name: {superhero.biography.fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default SuperheroCard;
