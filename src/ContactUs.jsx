import React from 'react';
import PPE from './images/BackPPE.jpg';

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Contact Us</h2>
        <div className="mb-8 flex justify-center">
          <img
            src={PPE}
            alt="Pelican Point East"
            className="rounded-lg w-2/3 md:w-1/2 lg:w-1/3"
          />
        </div>
        <div className="space-y-6">
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

export default ContactUs;
