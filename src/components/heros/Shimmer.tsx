import React from 'react';
import Image from 'next/image';

const ShimmerCard = () => {
  return (
    <div className="relative flex flex-col text-gray-900 bg-bg2 border border-gray-600 shadow-md bg-clip-border w-72 transform transition-transform hover:scale-105 hover:shadow-lg shimmer-card">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-bg2 backdrop-blur-sm h-80 shimmer-card__image"></div>
      <div className="p-4 text-center">
        <div className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-300 shimmer-card__line"></div>
        <div className="font-sans text-red-600 text-sm antialiased font-medium leading-relaxed shimmer-card__line short"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
