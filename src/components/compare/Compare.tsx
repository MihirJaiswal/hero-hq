'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';

// Define types for superhero data
interface Superhero {
  id: number;
  name: string;
  biography: {
    'full-name': string;
    'alter-egos': string;
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  images: {
    lg: string;
  };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}

// SuperheroCompare Component
const SuperheroCompare = () => {
  const [hero1, setHero1] = useState<Superhero | null>(null);
  const [hero2, setHero2] = useState<Superhero | null>(null);
  const [searchResults, setSearchResults] = useState<{ label: string; value: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllSuperheroes = async () => {
      try {
        const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
        const results = response.data.map((hero: Superhero) => ({ label: hero.name, value: hero.id }));
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching superheroes:', error);
      }
    };

    fetchAllSuperheroes();
  }, []);

  const fetchSuperheroData = async (id: number, setData: (data: Superhero) => void) => {
    try {
      const response = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching superhero data:', error);
    }
  };

  const handleHeroChange = async (selectedOption: any, setHero: (data: Superhero | null) => void) => {
    if (selectedOption) {
      await fetchSuperheroData(selectedOption.value, setHero);
    } else {
      setHero(null);
    }
  };

  const powerStatsData = [
    { name: 'Intelligence', hero1: hero1?.powerstats.intelligence, hero2: hero2?.powerstats.intelligence },
    { name: 'Strength', hero1: hero1?.powerstats.strength, hero2: hero2?.powerstats.strength },
    { name: 'Speed', hero1: hero1?.powerstats.speed, hero2: hero2?.powerstats.speed },
    { name: 'Durability', hero1: hero1?.powerstats.durability, hero2: hero2?.powerstats.durability },
    { name: 'Power', hero1: hero1?.powerstats.power, hero2: hero2?.powerstats.power },
    { name: 'Combat', hero1: hero1?.powerstats.combat, hero2: hero2?.powerstats.combat },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Compare Superheroes</h2>
        <button
          onClick={() => router.back()}
          className="p-2 bg-red-600 text-white rounded-full flex items-center justify-center"
        >
          <FaArrowLeft className="text-xl" />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Hero 1</label>
        <Select
          className="w-full"
          onChange={(selectedOption) => handleHeroChange(selectedOption, setHero1)}
          options={searchResults}
          placeholder="Search for Hero 1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Hero 2</label>
        <Select
          className="w-full"
          onChange={(selectedOption) => handleHeroChange(selectedOption, setHero2)}
          options={searchResults}
          placeholder="Search for Hero 2"
        />
      </div>
      {hero1 && hero2 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Comparison Results</h3>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="bg-white p-4 shadow-md rounded-md mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold">{hero1.name}</h3>
              <img src={hero1.images.lg} alt={hero1.name} className="w-full h-64 object-cover mb-4 rounded-md" />
              <p><strong>Full Name:</strong> {hero1.biography['full-name']}</p>
              <p><strong>Alter Egos:</strong> {hero1.biography['alter-egos']}</p>
              <p><strong>Place of Birth:</strong> {hero1.biography['place-of-birth']}</p>
              <p><strong>First Appearance:</strong> {hero1.biography['first-appearance']}</p>
              <p><strong>Publisher:</strong> {hero1.biography.publisher}</p>
              <p><strong>Alignment:</strong> {hero1.biography.alignment}</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-2xl font-semibold">{hero2.name}</h3>
              <img src={hero2.images.lg} alt={hero2.name} className="w-full h-64 object-cover mb-4 rounded-md" />
              <p><strong>Full Name:</strong> {hero2.biography['full-name']}</p>
              <p><strong>Alter Egos:</strong> {hero2.biography['alter-egos']}</p>
              <p><strong>Place of Birth:</strong> {hero2.biography['place-of-birth']}</p>
              <p><strong>First Appearance:</strong> {hero2.biography['first-appearance']}</p>
              <p><strong>Publisher:</strong> {hero2.biography.publisher}</p>
              <p><strong>Alignment:</strong> {hero2.biography.alignment}</p>
            </div>
          </div>
          <BarChart width={600} height={300} data={powerStatsData} className="mt-6">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hero1" fill="#8884d8" />
            <Bar dataKey="hero2" fill="#82ca9d" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default SuperheroCompare;
