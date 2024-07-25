import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen bg-bg1 flex flex-col gap-4 justify-center items-center'>
        <img src="/loader.gif" alt="" className='w-44' />
        <p className='text-white text-lg'>Loading...</p>
    </div>
  )
}

export default Loader