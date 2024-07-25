'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts'; // Import Cell

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
      setLoading(false);
      setError('No superhero ID provided');
      return;
    }

    const fetchSuperhero = async () => {
      try {
        const response = await axios.get(`https://www.superheroapi.com/api.php/a139f9c1625180c1b05ad4f297bd5d12/${id}`);
        setSuperhero(response.data);
      } catch (err) {
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

  if (!superhero) {
    return <div className="min-h-screen flex items-center justify-center">No superhero data found.</div>;
  }

  const powerStatsData = [
    { name: 'Intelligence', value: superhero.powerstats.intelligence },
    { name: 'Strength', value: superhero.powerstats.strength },
    { name: 'Speed', value: superhero.powerstats.speed },
    { name: 'Durability', value: superhero.powerstats.durability },
    { name: 'Power', value: superhero.powerstats.power },
    { name: 'Combat', value: superhero.powerstats.combat },
  ];

  // Define an array of colors for the bars
  const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#413ea0', '#d0ed57'];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-1/3 p-6">
            <SuperheroImage src={superhero.image.url} alt={superhero.name} />
          </div>
          <div className="w-2/3 p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{superhero.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Biography</h2>
                <p className="text-gray-700"><strong>Full Name:</strong> {superhero.biography.fullName}</p>
                <p className="text-gray-700"><strong>Alter Egos:</strong> {superhero.biography.alterEgos}</p>
                <p className="text-gray-700"><strong>Place of Birth:</strong> {superhero.biography.placeOfBirth}</p>
                <p className="text-gray-700"><strong>First Appearance:</strong> {superhero.biography.firstAppearance}</p>
                <p className="text-gray-700"><strong>Publisher:</strong> {superhero.biography.publisher}</p>
                <p className="text-gray-700"><strong>Alignment:</strong> {superhero.biography.alignment}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Power Stats</h2>
                <div className="h-80">
                  <BarChart width={500} height={300} data={powerStatsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      barSize={30} // Adjust the bar size for better spacing
                      label={{ position: 'top' }} // Display value above bars
                    >
                      {powerStatsData.map((stat, index) => (
                        <Cell key={stat.name} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Appearance</h2>
                <p className="text-gray-700"><strong>Gender:</strong> {superhero.appearance.gender}</p>
                <p className="text-gray-700"><strong>Race:</strong> {superhero.appearance.race}</p>
                <p className="text-gray-700"><strong>Height:</strong> {superhero.appearance.height.join(' / ')}</p>
                <p className="text-gray-700"><strong>Weight:</strong> {superhero.appearance.weight.join(' / ')}</p>
                <p className="text-gray-700"><strong>Eye Color:</strong> {superhero.appearance.eyeColor}</p>
                <p className="text-gray-700"><strong>Hair Color:</strong> {superhero.appearance.hairColor}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Connections</h2>
                <p className="text-gray-700"><strong>Group Affiliation:</strong> {superhero.connections.groupAffiliation}</p>
                <p className="text-gray-700"><strong>Relatives:</strong> {superhero.connections.relatives}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Work</h2>
                <p className="text-gray-700"><strong>Occupation:</strong> {superhero.work.occupation}</p>
                <p className="text-gray-700"><strong>Base:</strong> {superhero.work.base}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;
