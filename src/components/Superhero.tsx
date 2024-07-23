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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Superhero App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {superheroes.map((superhero) => (
          <SuperheroCard key={superhero.id} superhero={superhero} />
        ))}
      </div>
    </div>
  );
};

export default Superhero;
