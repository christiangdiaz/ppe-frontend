import React from 'react';
import Kitchen from './images/Kitchen.jpg';
import Pool from './images/PoolArea.jpg';
import Image1 from './images/Flag.jpg';
import Image2 from './images/Bay Reflection.jpg'
import Image3 from './images/Docks.jpg'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Welcome to Pelican Point East</h1>
        <p className="text-center text-gray-600 mb-10">
        Pelican Point East Condos are located directly on Venetian Bay in Park Shore, where there are stunning views of the bay and there are radiant skies at sunset.  Pelican Point East is just a short walk to some of Naples' best restaurants and shops located at The Venetian Village on Venetian Bay and access to the beach is via the Park Shore Association Beach Park.  
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[Image1, Image2, Image3].map((image, index) => (
            <div key={index} className="relative w-full h-64">
              <img src={image} alt={`Pelican Point East ${index + 1}`} className="rounded-lg w-full h-full object-cover"/>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-12'>
          <div className="relative w-full h-64">
            <img src={Kitchen} alt={`Pelican Point East Kitchen`} className="rounded-lg w-full h-full object-cover"/>
          </div>
          <div className="relative w-full h-64">
            <img src={Pool} alt={`Pelican Point East Pool`} className="rounded-lg w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
