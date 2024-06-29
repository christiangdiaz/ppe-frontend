import React, { useState } from 'react';
import axios from 'axios';
import mainPicture from './images/PPE.jpg';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <img src={mainPicture} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60" />
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 bg-white bg-opacity-90 p-4 rounded-lg shadow-md z-10">
        Pelican Point East
      </h1>
      <div className="bg-white bg-opacity-85 p-8 rounded-lg shadow-md max-w-md w-full z-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
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
