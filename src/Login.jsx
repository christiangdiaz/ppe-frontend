import React, { useState } from 'react';
import axios from 'axios';
import mainPicture from './images/PPE.jpg';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import the Firestore instance
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore methods

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/login', {
        username,
        password
      });

      if (response.status === 200) {
        onLogin(response.data.token); // Pass the custom token to the parent component

        // Update last login time in Firestore
        const userDoc = doc(db, 'users', username);
        await updateDoc(userDoc, {
          lastLogin: new Date()
        });

        navigate('/');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <img src={mainPicture} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Pelican Point East
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{`Error: ${error}`}</p>}
      </div>
    </div>
  );
};

export default Login;
