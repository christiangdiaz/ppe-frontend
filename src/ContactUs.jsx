import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-gray-900">Contact Us</h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">Our Address</h3>
            <a
              href="https://www.google.com/maps?q=300+Park+Shore+Drive,+Naples,+Florida+34103"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-lg text-gray-700 underline hover:text-gray-900 hover:underline-offset-4 transition-colors duration-300"
            >
              300 Park Shore Drive, Naples, Florida 34103
            </a>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">Phone Number</h3>
            <a
              href="tel:+12392623332"
              className="mt-2 text-lg text-gray-700 underline hover:text-gray-900 hover:underline-offset-4 transition-colors duration-300"
            >
              (239) 262-3332
            </a>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">Email Address</h3>
            <a
              href="mailto:manager@pelicanpoint300.com"
              className="mt-2 text-lg text-gray-700 underline hover:text-gray-900 hover:underline-offset-4 transition-colors duration-300"
            >
              manager@pelicanpoint300.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
