'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import SuperheroCard from './SuperheroCard';
import ShimmerCard from './Shimmer';
import Image from 'next/image';

interface Superhero {
  id: number;
  name: string;
  images: {
    sm: string;
  };
  biography: {
    fullName: string;
    publisher: string;
    alignment: string;
    race: string;
  };
  appearance: {
    gender: string;
  };
}

const Superhero = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [displayedCount, setDisplayedCount] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<{
    publisher?: string;
    alignment?: string;
    gender?: string;
    race?: string;
  }>({});

  const mainHeroesIds = [70 ,32, 644, 213, 265, 289 , 441, 687]; // Replace with actual IDs of main heroes

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const filteredSuperheroes = superheroes.filter((superhero) => {
    const matchesSearchTerm =
      superhero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      superhero.biography.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilterCriteria = Object.entries(filterCriteria).every(([key, value]) => {
      if (!value) return true;
      if (key === 'publisher' || key === 'alignment' || key === 'race') {
        return superhero.biography[key]?.toLowerCase() === value.toLowerCase();
      }
      if (key === 'gender') {
        return superhero.appearance[key]?.toLowerCase() === value.toLowerCase();
      }
      return true;
    });

    return matchesSearchTerm && matchesFilterCriteria;
  });

  const sortedSuperheroes = filteredSuperheroes.sort((a, b) => a.name.localeCompare(b.name));
  const mainHeroes = filteredSuperheroes.filter(hero => mainHeroesIds.includes(hero.id));
  const remainingHeroes = sortedSuperheroes.filter(hero => !mainHeroesIds.includes(hero.id));

  const heroesToDisplay = [...mainHeroes, ...remainingHeroes].slice(0, displayedCount);

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 8, filteredSuperheroes.length));
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen backdrop-blur-md border border-black p-6 relative">
      <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
        <div>
          <Image
           src="/logo.png"
           width={200}
           height={200}
           quality={100}
           loading='lazy'
           alt="Hero HQ Logo" 
           className='w-24 mb-2' />
        </div>
        <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-2xl md:text-4xl">
          Discover the Heroes Behind the Legends
        </h2>
      </div>
      <div className="flex flex-col items-center my-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-40">
          <div className="flex items-center border border-gray-300 bg-gray-900 rounded-lg overflow-hidden flex-1">
            <FaSearch className="text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="Search by name or full name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5 w-full md:w-auto">
            <select
              name="publisher"
              onChange={handleFilterChange}
              className="p-2 border border-gray-500 bg-gray-900 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-36 w-32"
            >
              <option value="">All Publishers</option>
              <option value="Marvel Comics">Marvel Comics</option>
              <option value="DC Comics">DC Comics</option>
              {/* Add more publishers as needed */}
            </select>
            <select
              name="alignment"
              onChange={handleFilterChange}
              className="p-2 border border-gray-500 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-36 w-32"
            >
              <option value="">All Alignments</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              <option value="neutral">Neutral</option>
            </select>
            <select
              name="gender"
              onChange={handleFilterChange}
              className="p-2 border border-gray-500 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-36 w-32"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* Add more genders as needed */}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        {loading 
          ? Array.from({ length: displayedCount }).map((_, index) => <ShimmerCard key={index} />)
          : heroesToDisplay.map((superhero) => (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              imageSrc={superhero.images.sm}
            />
          ))
        }
      </div>
      {displayedCount < filteredSuperheroes.length && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Superhero;
