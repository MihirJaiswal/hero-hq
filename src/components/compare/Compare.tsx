'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import classNames from 'classnames';
import { FaGenderless, FaRuler, FaWeightHanging, FaUser, FaBuilding } from 'react-icons/fa';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { GlareCardDemo } from '../Glare';

// Define types for superhero data
interface Superhero {
  id: number;
  name: string;
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
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
  biography: {
    publisher: string;
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
    { name: 'Intelligence', [hero1?.name || 'Hero 1']: hero1?.powerstats.intelligence, [hero2?.name || 'Hero 2']: hero2?.powerstats.intelligence },
    { name: 'Strength', [hero1?.name || 'Hero 1']: hero1?.powerstats.strength, [hero2?.name || 'Hero 2']: hero2?.powerstats.strength },
    { name: 'Speed', [hero1?.name || 'Hero 1']: hero1?.powerstats.speed, [hero2?.name || 'Hero 2']: hero2?.powerstats.speed },
    { name: 'Durability', [hero1?.name || 'Hero 1']: hero1?.powerstats.durability, [hero2?.name || 'Hero 2']: hero2?.powerstats.durability },
    { name: 'Power', [hero1?.name || 'Hero 1']: hero1?.powerstats.power, [hero2?.name || 'Hero 2']: hero2?.powerstats.power },
    { name: 'Combat', [hero1?.name || 'Hero 1']: hero1?.powerstats.combat, [hero2?.name || 'Hero 2']: hero2?.powerstats.combat },
  ];

  const heightData = [
    { name: hero1?.name || 'Hero 1', height: parseFloat(hero1?.appearance.height[1].replace(' cm', '') || '0') },
    { name: hero2?.name || 'Hero 2', height: parseFloat(hero2?.appearance.height[1].replace(' cm', '') || '0') },
  ];

  return (
    <div className="rounded-md md:p-6 py-14 md:pt-24 w-full md:absolute md:top-7">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {/* Hero 1 */}
        <div className="col-span-1 flex flex-col items-center justify-center ">
          <div className="pb-8 w-full px-6">
            <Select
              classNamePrefix="dark-select"
              className="w-full"
              onChange={(selectedOption) => handleHeroChange(selectedOption, setHero1)}
              options={searchResults}
              placeholder="Search for Hero 1"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#000000',
                  borderColor: '#ffff',
                  color: '#fff',
                  padding: '0.5rem',
                  boxShadow: 'none',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#fffff',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#fffff',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#000000',
                  borderColor: '#444',
                  color: '#fffff',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#000000' : '#000000',
                  color: state.isSelected ? '#fff' : '#bbb',
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#fff',
                  },
                }),
              }}
            />
          </div>

          {hero1 ? (
            <div className="bg-bg2 py-6 px-12 shadow-md border border-gray-600 max-w-sm">
              <div className="relative w-full h-72 mb-4">
                <img
                  src={hero1.images.lg}
                  alt={hero1.name}
                  className="w-full h-full object-cover shimmer border border-gray-600 rounded-md"
                />
              </div>
              <div className='text-gray-300 flex flex-col items-start gap-2'>
                <p><FaRuler className='inline-block mr-2'/> <span className='text-white'>Height:</span> {hero1.appearance.height[1]}</p>
                <p><FaWeightHanging className='inline-block mr-2'/> <span className='text-white'>Weight:</span> {hero1.appearance.weight[1]}</p>
                <p><FaGenderless className='inline-block mr-2'/> <span className='text-white'>Gender:</span> {hero1.appearance.gender}</p>
                <p><FaUser className='inline-block mr-2'/> <span className='text-white'>Race:</span> {hero1.appearance.race}</p>
                <p><FaBuilding className='inline-block mr-2'/> <span className='text-white'>Publisher:</span> {hero1.biography.publisher}</p>
              </div>
            </div>
          ) : (
            <div>
              <GlareCardDemo/>
            </div>
          )}
        </div>
        
        {/* Comparison Results */}
        <div
          className={classNames(
            "col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-center z-40",
            { "bg-gray-950 border border-gray-600 p-8 md:p-0": hero1 && hero2 }
          )}
        >
          {hero1 && hero2 ? (
            <>
              <BarChart width={350} height={250} data={powerStatsData} className="mb-6">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={hero1?.name || 'Hero 1'} fill="#8884d8" />
                <Bar dataKey={hero2?.name || 'Hero 2'} fill="#82ca9d" />
              </BarChart>
              <BarChart width={350} height={250} data={heightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="height" fill="#8884d8" />
              </BarChart>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-44 md:hidden  ">
              <p className="text-lg font-bold text-gray-700 border bg-white/60 p-2 rounded-md">Choose heroes to compare</p>
            </div>
          )}
        </div>
        
        {/* Hero 2 */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="pb-8 w-full px-6">
            <Select
              classNamePrefix="dark-select"
              className="w-full"
              onChange={(selectedOption) => handleHeroChange(selectedOption, setHero2)}
              options={searchResults}
              placeholder="Search for Hero 2"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#000000',
                  borderColor: '#ffff',
                  color: '#fff',
                  padding: '0.5rem',
                  boxShadow: 'none',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#fffff',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#fffff',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#000000',
                  borderColor: '#444',
                  color: '#fffff',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#000000' : '#000000',
                  color: state.isSelected ? '#fff' : '#bbb',
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#fff',
                  },
                }),
              }}
            />
          </div>

          {hero2 ? (
            <div className="bg-bg2 py-6 px-12 shadow-md border border-gray-600 max-w-sm">
              <div className="relative w-full h-72 mb-4">
                <img
                  src={hero2.images.lg}
                  alt={hero2.name}
                  className="w-full h-full object-cover shimmer border border-gray-600 rounded-md"
                />
              </div>
              <div className='text-gray-300 flex flex-col items-start gap-2'>
                <p><FaRuler className='inline-block mr-2'/> <span className='text-white'>Height:</span> {hero2.appearance.height[1]}</p>
                <p><FaWeightHanging className='inline-block mr-2'/> <span className='text-white'>Weight:</span> {hero2.appearance.weight[1]}</p>
                <p><FaGenderless className='inline-block mr-2'/> <span className='text-white'>Gender:</span> {hero2.appearance.gender}</p>
                <p><FaUser className='inline-block mr-2'/> <span className='text-white'>Race:</span> {hero2.appearance.race}</p>
                <p><FaBuilding className='inline-block mr-2'/> <span className='text-white'>Publisher:</span> {hero2.biography.publisher}</p>
              </div>
            </div>
          ) : (
            <div>
              <GlareCardDemo/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperheroCompare;
