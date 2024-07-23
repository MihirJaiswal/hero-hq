'use client';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Define types for your superhero data
interface Superhero {
  id: number;
  name: string;
  image: {
    url: string;
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

// Component to handle image loading state
const SuperheroImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  const handleImageError = () => setUseFallbackImage(true);

  return (
    <div className="relative h-96 w-full">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200">Loading image...</div>}
      <Image
        src={useFallbackImage ? '/fallback-image.jpg' : src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
        onLoadingComplete={() => setLoading(false)}
        onError={handleImageError}
      />
    </div>
  );
};

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
        
        const response = await axios.get(`https://www.superheroapi.com/api.php/a139f9c1625180c1b05ad4f297bd5d12/${id}`);
        
        // If the API supports returning all required data in one request, do so to minimize the number of requests
        setSuperhero(response.data);
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
          <SuperheroImage
            src={superhero.image.url}
            alt={superhero.name}
          />
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
