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
import Loader from '@/components/Loader';

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
        <div className='h-full bg-bg1 flex items-center justify-center w-full overflow-hidden'>
          <Loader/>
        </div>
      )}
      <Image
        src={useFallbackImage ? '' : src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className="shadow-lg border overflow-hidden"
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
      <div>
        <Loader/>
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
      return feet.toFixed(2); 
    }
    
    const [feet, inches] = height.split("'").map(Number);
    
    const decimalHeight = feet + (inches / 12);
  
    return decimalHeight.toFixed(2); 
  }
  
  const heightString = superhero.appearance.height[0]; 
  console.log(heightString);
  const height = convertHeightToDecimal(heightString);
  console.log(height);
  
  const averageHeight = 5.8; 

  const heightData = [
    { name: 'Height', value: height }
  ];

  const barColors = ['#2c22e6', '#e62020', '#dbd512', '#2d9404', '#302973', '#6a2e8c'];

  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#FF0000">
        {payload.value}
      </text>
    );
  };
  
  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dx={-4} dy={4} textAnchor="end" fill="#00FF00">
        {payload.value}
      </text>
    );
  };

  return (
    <div className='bg-bg1 pt-4'>
      <HomeHeader/>
        <Particles className="absolute inset-0" quantity={250} ease={80} color='#fff' refresh />
      <div className="flex flex-col text-gray-800  md:h-screen items-center justify-center pb-4 md:pt-28 pt-20 relative">
      <div className="w-full  mx-auto md:p-8 flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4 md:h-screen h-full flex items-center justify-center">
          <SuperheroImage src={superhero.images.lg} alt={superhero.name} />
          
        </div>

        <div className="lg:w-2/3 p-4 flex flex-col">
        <div className='flex items-center justify-center text-center mb-8'>
          
        <h1 className="text-5xl font-extrabold text-gray-100 uppercase mt-6">{superhero.name}</h1>
        </div>
          <div className="flex flex-wrap md:justify-center mb-8">
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'biography' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('biography')}
            >
              Biography
            </button>
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'appearance' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('appearance')}
            >
              Appearance
            </button>
           
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'powerStats' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('powerStats')}
            >
              Power Stats
            </button>
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'height' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('height')}
            >
              Height
            </button>
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'connections' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('connections')}
            >
              Connections
            </button>
            <button
              className={`w-36 md:w-auto px-4 py-2 mb-2 sm:mb-0 mx-2 rounded-sm ${section === 'work' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => setSection('work')}
            >
              Work
            </button>
          </div>

          {section === 'biography' && (
            <div className="bg-bg2 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8">
            <h2 className="text-3xl font-extrabold text-red-600 mb-8">Biography</h2>
            <div className="space-y-5 mb-2">
              <div className="flex items-center">
                <FaUserShield className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Full Name :</span> {superhero.biography.fullName}
                </p>
              </div>
              <div className="flex items-center">
                <FaTag className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Alter Egos:</span> {superhero.biography.alterEgos}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Place of Birth:</span> {superhero.biography.placeOfBirth}
                </p>
              </div>
              <div className="flex items-center">
                <FaBirthdayCake className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>First Appearance:</span> {superhero.biography.firstAppearance}
                </p>
              </div>
              <div className="flex items-center">
                <FaBookOpen className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Publisher:</span> {superhero.biography.publisher}
                </p>
              </div>
              <div className="flex items-center">
                <FaGlasses className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Alignment:</span> {superhero.biography.alignment}
                </p>
              </div>
            </div>
          </div>
          
          
          )}

          {section === 'appearance' && (
            <div className="bg-bg2 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8">
            <h2 className="text-3xl font-extrabold text-red-600 mb-8">Appearance</h2>
            <div className="space-y-5 mb-2">
              <div className="flex items-center">
                <FaGenderless className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Gender:</span> {superhero.appearance.gender}
                </p>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Race:</span> {superhero.appearance.race}
                </p>
              </div>
              <div className="flex items-center">
                <FaEye className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Eye Color:</span> {superhero.appearance.eyeColor}
                </p>
              </div>
              <div className="flex items-center">
                <FaRuler className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Height:</span> {superhero.appearance.height.join(', ')}
                </p>
              </div>
              <div className="flex items-center">
                <FaWeightHanging className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Weight:</span> {superhero.appearance.weight.join(', ')}
                </p>
              </div>
            </div>
          </div>
          
          )}

          {section === 'connections' && (
            <div className="bg-bg2 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8">
            <h2 className="text-3xl font-extrabold text-red-600 mb-8">Connections</h2>
            <div className="space-y-5 mb-2">
              <div className="flex items-center gap-2">
                <FaUsers className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Group Affiliation:</span> {superhero.connections.groupAffiliation}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Relatives:</span> {superhero.connections.relatives}
                </p>
              </div>
            </div>
          </div>
          )}

          {section === 'work' && (
            <div className="bg-bg2 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8">
            <h2 className="text-3xl font-extrabold text-red-600 mb-8">Work</h2>
            <div className="space-y-5 mb-2">
              <div className="flex items-center">
                <MdWork className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Occupation:</span> {superhero.work.occupation}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-50 mr-4" />
                <p className="text-gray-300">
                  <span className='text-gray-100 font-bold'>Base:</span> {superhero.work.base}
                </p>
              </div>
            </div>
          </div>
          
          )}

          {section === 'powerStats' && (
             <div className="bg-bg2 backdrop-blur-sm border border-gray-300 p-6 shadow-md mb-8 hidden md:block">
             <h2 className="text-3xl font-extrabold text-red-600 mb-6">Power Stats</h2>
             <div className='p-2'>
               <BarChart width={600} height={300} data={powerStatsData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" tick={<CustomXAxisTick />} />
                 <YAxis tick={<CustomYAxisTick />} />
                 <Tooltip />
                 <Bar dataKey="value">
                   {powerStatsData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                   ))}
                 </Bar>
               </BarChart>
             </div>
           </div>
          
          )}

              {section === 'powerStats' && (
                  <div className="mb-8 md:hidden bg-bg2 backdrop-blur-sm p-6 border border-gray-300 shadow-md">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-extrabold text-red-600 mb-2">Power Stats</h2>
                    <BarChart width={300} height={300} data={powerStatsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tick={<CustomXAxisTick />} />
                      <YAxis type="category" dataKey="name" tick={<CustomYAxisTick />} />
                      <Tooltip />
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
             <div className="bg-bg2 p-6 border shadow-md mb-8 relative hidden md:block">
             <h2 className="text-3xl font-extrabold text-red-600 mb-8">Height</h2>
             <div className="p-1 relative z-30 ">
               <BarChart width={600} height={300} data={heightData} className='z-30'>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name"  tick={<CustomXAxisTick />} />
                 <YAxis  tick={<CustomYAxisTick />} />
                 <Tooltip />
                 <Bar
                   dataKey="value"
                   barSize={30}
                   fill="#1710e6"
                 />
                 <ReferenceLine y={averageHeight} stroke="red" label="Average Height" />
               </BarChart>
           
               <div className="absolute top-[74px] right-96 mt-2">
                 <Image
                   src={averageHeightIcon}
                   alt="Average Height"
                   width={500} 
                   height={500}
                   loading='lazy' 
                   className="w-auto h-[185px] z-10"
                 />
               </div>
             </div>
           </div>
          )}

{section === 'height' && (
  <div className="bg-bg2 p-4 border shadow-md mb-8 relative md:hidden">
    <h2 className="text-3xl font-extrabold text-red-600 mb-8">Height</h2>
    <div className="relative">
      {/* BarChart */}
      <div className="h-60 md:h-80 mb-6 border pt-4 pr-4">
        <BarChart width={300} height={200} data={heightData} className='z-30'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"   tick={<CustomXAxisTick />} />
          <YAxis   tick={<CustomYAxisTick />} />
          <Tooltip />
          <Bar
            dataKey="value"
            barSize={15}
            fill="#0d378c"
          />
          <ReferenceLine y={averageHeight} stroke="red" label="Average Height" />
        </BarChart>
      </div>

      {/* Average Height Icon */}
      <div className="absolute top-16 right-2 md:top-4 md:right-4 flex items-center justify-center">
        <Image
          src={averageHeightIcon}
          alt="Average Height"
          width={100} 
          height={100} 
          className="w-auto h-[114px]"
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
