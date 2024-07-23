'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Superhero {
  id: number;
  name: string;
  images: {
    lg: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  work: {
    occupation: string;
    base: string;
  };
}

const SuperheroDetail = () => {
  const { id } = useParams();

  const [superhero, setSuperhero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.log('ID is null');
      setLoading(false);
      setError('No superhero ID provided');
      return;
    }

    console.log('Superhero ID:', id);

    const fetchSuperhero = async () => {
      try {
        console.log('Fetching superhero data for ID:', id);
        
        const [superheroResponse, powerstatsResponse, appearanceResponse, biographyResponse, connectionsResponse, workResponse] = await Promise.all([
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/powerstats/${id}.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/appearance/${id}.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/biography/${id}.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/connections/${id}.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/work/${id}.json`),
        ]);

        setSuperhero({
          ...superheroResponse.data,
          powerstats: powerstatsResponse.data,
          appearance: appearanceResponse.data,
          biography: biographyResponse.data,
          connections: connectionsResponse.data,
          work: workResponse.data,
        });
        
      } catch (err) {
        console.error('Error fetching superhero data:', err);
        setError('Failed to fetch superhero details');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperhero();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    superhero && (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <Image width={500} height={500} className="w-full h-96 object-cover" src={superhero.images.lg} alt={superhero.name} />
          <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-900">{superhero.name}</h1>
            <p className="text-gray-700 mt-2"><strong>Full Name:</strong> {superhero.biography.fullName}</p>
            <p className="text-gray-700 mt-2"><strong>Alter Egos:</strong> {superhero.biography.alterEgos}</p>
            <p className="text-gray-700 mt-2"><strong>Place of Birth:</strong> {superhero.biography.placeOfBirth}</p>
            <p className="text-gray-700 mt-2"><strong>First Appearance:</strong> {superhero.biography.firstAppearance}</p>
            <p className="text-gray-700 mt-2"><strong>Publisher:</strong> {superhero.biography.publisher}</p>
            <p className="text-gray-700 mt-2"><strong>Alignment:</strong> {superhero.biography.alignment}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">Powerstats</h2>
            <p className="text-gray-700 mt-2"><strong>Intelligence:</strong> {superhero.powerstats.intelligence}</p>
            <p className="text-gray-700 mt-2"><strong>Strength:</strong> {superhero.powerstats.strength}</p>
            <p className="text-gray-700 mt-2"><strong>Speed:</strong> {superhero.powerstats.speed}</p>
            <p className="text-gray-700 mt-2"><strong>Durability:</strong> {superhero.powerstats.durability}</p>
            <p className="text-gray-700 mt-2"><strong>Power:</strong> {superhero.powerstats.power}</p>
            <p className="text-gray-700 mt-2"><strong>Combat:</strong> {superhero.powerstats.combat}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">Appearance</h2>
            <p className="text-gray-700 mt-2"><strong>Gender:</strong> {superhero.appearance.gender}</p>
            <p className="text-gray-700 mt-2"><strong>Race:</strong> {superhero.appearance.race}</p>
            <p className="text-gray-700 mt-2"><strong>Height:</strong> {superhero.appearance.height.join(' / ')}</p>
            <p className="text-gray-700 mt-2"><strong>Weight:</strong> {superhero.appearance.weight.join(' / ')}</p>
            <p className="text-gray-700 mt-2"><strong>Eye Color:</strong> {superhero.appearance.eyeColor}</p>
            <p className="text-gray-700 mt-2"><strong>Hair Color:</strong> {superhero.appearance.hairColor}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">Connections</h2>
            <p className="text-gray-700 mt-2"><strong>Group Affiliation:</strong> {superhero.connections.groupAffiliation}</p>
            <p className="text-gray-700 mt-2"><strong>Relatives:</strong> {superhero.connections.relatives}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">Work</h2>
            <p className="text-gray-700 mt-2"><strong>Occupation:</strong> {superhero.work.occupation}</p>
            <p className="text-gray-700 mt-2"><strong>Base:</strong> {superhero.work.base}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default SuperheroDetail;
