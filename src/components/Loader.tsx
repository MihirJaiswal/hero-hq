import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="h-screen bg-bg1 flex flex-col gap-4 justify-center items-center">
      <Image
       src="/loader.gif"
        alt="Loading" width={176}
        height={176} 
        priority
        quality={100}
        className="w-44" />
      <p className="text-white text-lg">Loading...</p>
    </div>
  );
}

export default Loader;
