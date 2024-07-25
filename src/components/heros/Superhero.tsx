'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import SuperheroCard from './SuperheroCard';

interface Superhero {
  id: number;
  name: string;
  images: {
    sm: string;
  };
  biography: {
    fullName: string;
  };
}

const Superhero = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
        setSuperheroes(response.data);
      } catch (err) {
        setError('Failed to fetch superheroes');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperheroes();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen md:bg-white/10 backdrop-blur-md border border-black p-6">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {superheroes.map((superhero) => (
          <SuperheroCard 
            key={superhero.id} 
            superhero={superhero} 
            imageSrc={superhero.images.sm} 
          />
        ))}
      </div>
    </div>
  );
};

export default Superhero;
