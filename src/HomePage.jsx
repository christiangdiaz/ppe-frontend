import React from 'react';
import Image1 from './images/park-shore-1.jpg';
import Image2 from './images/park-shore-2.jpg';
import Image3 from './images/park-shore-3.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome to Pelican Point East</h1>
        <p className="text-center text-gray-600 mb-8">
          Located at 300 Park Shore Drive, Naples, Florida 34103, Pelican Point East offers a prime location near Venetian Village and Park Shore Beach. Enjoy luxurious living with stunning views and top-notch amenities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <img src={Image1} alt="Park Shore Beach" className="rounded-lg w-full h-auto object-cover"/>
          <img src={Image2} alt="Pelican Point East" className="rounded-lg w-full h-auto object-cover"/>
          <img src={Image3} alt="Venetian Village" className="rounded-lg w-full h-auto object-cover"/>
        </div>
        <div className="space-y-6 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Our Address</h3>
            <p className="text-gray-600">
              300 Park Shore Drive, Naples, Florida 34103
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Phone Number</h3>
            <p className="text-gray-600">
              (239) 261-3440
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Email Address</h3>
            <p className="text-gray-600">
              manager@pelicanpoint300.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
