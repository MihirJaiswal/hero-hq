'use client';
import Image from 'next/image';
import Particles from '@/components/ui/particles';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import averageHeightIcon from '../../../../public/human.png';
import { FaArrowLeft, FaBirthdayCake, FaUserShield, FaBookOpen, FaTag, FaMapMarkerAlt, FaGlasses, FaUsers, FaGenderless, FaEye, FaRuler, FaWeightHanging, FaUser } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import Footer from '@/components/Footer';
import HomeHeader from '@/components/HomeHeader';

// Define types for your superhero data
interface Superhero {
  id: number;
  name: string;
  images: {
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
    <div className="relative w-full h-[500px] bg-bg2">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          Loading image...
        </div>
      )}
      <Image
        src={useFallbackImage ? '/fallback-image.jpg' : src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className="shadow-lg border"
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
  const [section, setSection] = useState<string>('biography');
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No superhero ID provided');
      return;
    }

    const fetchSuperhero = async () => {
      try {
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
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
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  if (!superhero) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        No superhero data found.
      </div>
    );
  }

  const powerStatsData = [
    { name: 'Intelligence', value: superhero.powerstats.intelligence },
    { name: 'Strength', value: superhero.powerstats.strength },
    { name: 'Speed', value: superhero.powerstats.speed },
    { name: 'Durability', value: superhero.powerstats.durability },
    { name: 'Power', value: superhero.powerstats.power },
    { name: 'Combat', value: superhero.powerstats.combat },
  ];
  function convertHeightToDecimal(height: any) {
    // Check if the height is in cm
    if (height.includes("cm")) {
      const cm = parseFloat(height);
      const feet = cm / 30.48;
      return feet.toFixed(2); // Convert cm to feet and round to 2 decimal places
    }
    
    // Split the input string into feet and inches
    const [feet, inches] = height.split("'").map(Number);
    
    // Convert inches to a fraction of a foot
    const decimalHeight = feet + (inches / 12);
  
    return decimalHeight.toFixed(2); // Round to 2 decimal places
  }
  
  const heightString = superhero.appearance.height[0]; // "203 cm" or "6'3"
  console.log(heightString);
  const height = convertHeightToDecimal(heightString); // Convert height to number (e.g., "6'3" => 6.25 or "203 cm" => 6.66)
  console.log(height);
  
  const averageHeight = 5.8; // Average height for the reference line

  const heightData = [
    { name: 'Height', value: height }
  ];

  const barColors = ['#4c46a3', '#387953', '#b28530', '#b35900', '#302973', '#909233'];


  return (
    <div className='bg-bg1'>
      <HomeHeader/>
        <Particles className="absolute inset-0" quantity={250} ease={80} color='#fff' refresh />
      <div className="flex flex-col text-gray-800  md:h-screen items-center justify-center pb-4 md:pt-28 pt-20 relative">
      <div className="w-full  mx-auto md:p-8 flex flex-col lg:flex-row">
        {/* Superhero Image and Name */}
        <div className="lg:w-1/3 p-4 md:h-screen h-full flex items-center justify-center">
          <SuperheroImage src={superhero.images.lg} alt={superhero.name} />
          
        </div>

        {/* Superhero Details */}
        <div className="lg:w-2/3 p-4 flex flex-col">
        <div className='flex items-center justify-center text-center mb-8'>
          
        <h1 className="text-5xl font-extrabold text-gray-100 uppercase mt-6">{superhero.name}</h1>
        </div>
          {/* Toggle Buttons */}
          <div className="flex flex-wrap justify-center mb-8">
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'biography' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('biography')}
            >
              Biography
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'appearance' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('appearance')}
            >
              Appearance
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'connections' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('connections')}
            >
              Connections
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'work' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('work')}
            >
              Work
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'powerStats' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('powerStats')}
            >
              Power Stats
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'height' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('height')}
            >
              Height
            </button>
          </div>


          {/* Conditional Rendering based on selected section */}
          {section === 'biography' && (
            <div className="bg-white/60 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8">
            <h2 className="text-3xl font-semibold text-black mb-6">Biography</h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <FaUserShield className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Full Name:</strong> {superhero.biography.fullName}</p>
              </div>
              <div className="flex items-center">
                <FaTag className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Alter Egos:</strong> {superhero.biography.alterEgos}</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Place of Birth:</strong> {superhero.biography.placeOfBirth}</p>
              </div>
              <div className="flex items-center">
                <FaBirthdayCake className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>First Appearance:</strong> {superhero.biography.firstAppearance}</p>
              </div>
              <div className="flex items-center">
                <FaBookOpen className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Publisher:</strong> {superhero.biography.publisher}</p>
              </div>
              <div className="flex items-center">
                <FaGlasses className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Alignment:</strong> {superhero.biography.alignment}</p>
              </div>
            </div>
          </div>
          
          )}

          {section === 'appearance' && (
            <div className="bg-white/60 p-8 shadow-lg mb-8 border">
            <h2 className="text-3xl font-bold text-black mb-6">Appearance</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaGenderless className="text-gray-950 mr-4" />
                <p className="text-gray-800 text-lg"><strong>Gender:</strong> {superhero.appearance.gender}</p>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-950 mr-4" />
                <p className="text-gray-800"><strong>Race:</strong> {superhero.appearance.race}</p>
              </div>
              <div className="flex items-center">
                <FaEye className="text-gray-950 mr-4" />
                <p className="text-gray-800"><strong>Eye Color:</strong> {superhero.appearance.eyeColor}</p>
              </div>
              <div className="flex items-center">
                <FaRuler className="text-gray-950 mr-4" />
                <p className="text-gray-800"><strong>Height:</strong> {superhero.appearance.height.join(', ')}</p>
              </div>
              <div className="flex items-center">
                <FaWeightHanging className="text-gray-950 mr-4" />
                <p className="text-gray-800"><strong>Weight:</strong> {superhero.appearance.weight.join(', ')}</p>
              </div>
            </div>
          </div>
          
          )}

          {section === 'connections' && (
            <div className="bg-white/60 p-6 shadow-md mb-8 border">
              <h2 className="text-3xl font-semibold text-black mb-4">Connections</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUsers className="text-gray-950 mr-3" />
                  <p className="text-gray-800 text-lg"><strong>Group Affiliation:</strong> {superhero.connections.groupAffiliation}</p>
                </div>
                <div className="flex items-center">
                  <FaUser className="text-gray-950 mr-3" />
                  <p className="text-gray-800 text-lg"><strong>Relatives:</strong> {superhero.connections.relatives}</p>
                </div>
              </div>
            </div>
          )}

          {section === 'work' && (
            <div className="bg-white/60 p-6 border shadow-md mb-8">
              <h2 className="text-3xl font-semibold text-black mb-4">Work</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MdWork className="text-gray-950 mr-3" />
                  <p className="text-gray-800 text-lg"><strong>Occupation:</strong> {superhero.work.occupation}</p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-950 mr-3" />
                  <p className="text-gray-800 text-lg"><strong>Base:</strong> {superhero.work.base}</p>
                </div>
              </div>
            </div>
          )}

          {section === 'powerStats' && (
            <div className="bg-white/70 p-6 border shadow-md mb-8 hidden md:block">
              <h2 className="text-3xl font-semibold text-black mb-4">Power Stats</h2>
              <BarChart width={600} height={300} data={powerStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {powerStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          )}

      {section === 'powerStats' && (
                  <div className="mb-8 md:hidden bg-white/70 p-6 border">
                    <div className="text-center mb-4">
                      <h2 className="text-2xl font-bold mb-2">Power Stats</h2>
                      <BarChart width={300} height={300} data={powerStatsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value">
                          {powerStatsData.map((entry, index) => (
                            <Cell key={index} fill={barColors[index % barColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </div>
                  </div>
                )}
            {/*height */}

          {section === 'height' && (
             <div className="bg-white/70 p-6 border shadow-md mb-8 relative hidden md:block">
             <h2 className="text-3xl font-semibold text-black mb-4">Height</h2>
             <div className="h-80 relative z-30">
               <BarChart width={600} height={300} data={heightData} className='z-30'>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Bar
                   dataKey="value"
                   barSize={30}
                   fill="#8884d8"
                 />
                 <ReferenceLine y={averageHeight} stroke="red" label="Average Height" />
               </BarChart>
           
               <div className="absolute top-16 right-96 mt-2">
                 <Image
                   src={averageHeightIcon}
                   alt="Average Height"
                   width={500} // Adjust the width as needed
                   height={500} // Adjust the height as needed
                   className="w-auto h-[168px] z-10"
                 />
               </div>
             </div>
           </div>
          )}

{section === 'height' && (
  <div className="bg-white/70 p-4 border shadow-md mb-8 relative md:hidden">
    <h2 className="text-2xl font-semibold text-black mb-4">Height</h2>
    <div className="relative">
      {/* BarChart */}
      <div className="h-60 md:h-80 mb-6">
        <BarChart width={300} height={200} data={heightData} className='z-30'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            barSize={15}
            fill="#8884d8"
          />
          <ReferenceLine y={averageHeight} stroke="red" label="Average Height" />
        </BarChart>
      </div>

      {/* Average Height Icon */}
      <div className="absolute top-11 right-2 md:top-4 md:right-4 flex items-center justify-center">
        <Image
          src={averageHeightIcon}
          alt="Average Height"
          width={100} // Adjust the width as needed
          height={100} // Adjust the height as needed
          className="w-auto h-24"
        />
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
    <div className="fixed md:hidden top-5 left-6 md:right-6 z-50">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
        </div>
        <div className="fixed md:top-6 md:right-6 z-50 hidden md:block">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
        </div>
    <Footer/>
    </div>
  );
};

export default SuperheroDetail;
