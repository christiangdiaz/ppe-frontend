import React from 'react';
import Image1 from './images/park-shore-1.jpg';
import Image2 from './images/park-shore-2.jpg';
import Image3 from './images/park-shore-3.jpg';
import Kitchen from './images/Kitchen.jpg';
import Pool from './images/PoolArea.jpg';
import Boats from './images/BoatSlip.jpg';

const amenities = [
  { image: Pool, title: "Waterfront pool", description: "Relax and enjoy the beautiful views of the bay." },
  { image: Kitchen, title: "Outdoor Kitchen", description: "Enjoy outdoor cooking with friends and family." },
  { image: Boats, title: "Boat docks", description: "Private boat slips available for lease." },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Welcome to Pelican Point East</h1>
        <p className="text-center text-gray-600 mb-10">
          Located at 300 Park Shore Drive, Naples, Florida 34103, Pelican Point East offers a prime location near Venetian Village and Park Shore Beach. Enjoy luxurious living with stunning views and top-notch amenities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[Image1, Image2, Image3].map((image, index) => (
            <div key={index} className="relative w-full h-64">
              <img src={image} alt={`Pelican Point East ${index + 1}`} className="rounded-lg w-full h-full object-cover"/>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="relative w-full h-64 group">
                <img src={amenity.image} alt={amenity.title} className="rounded-lg w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h3 className="text-white text-2xl font-bold mb-2">{amenity.title}</h3>
                  <p className="text-white text-lg text-center">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
