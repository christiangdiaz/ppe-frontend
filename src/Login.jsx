import React, { useState } from 'react';
import axios from 'axios';
import mainPicture from './images/PPE.jpg';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import the Firestore instance
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore methods
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eyeOff);
      setType('text');
    } else {
      setIcon(eye);
      setType('password');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/login', {
        username,
        password
      });

      if (response.status === 200) {
        onLogin(response.data.token);

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
          <div className="relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
              <input
                type={type}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
              />
            <span 
              className="absolute right-3 bottom-1 transform -translate-y-2/4 cursor-pointer flex items-center"
              onClick={handleToggle}
            >
              <Icon icon={icon} size={25} />
            </span>
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
