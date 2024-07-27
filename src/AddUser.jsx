import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ token, role, onAdd }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleInput, setRoleInput] = useState('user');
  const [error, setError] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/users', {
        username,
        password,
        role: roleInput
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setUsername('');
        setPassword('');
        setRoleInput('user');
        onAdd();
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (role !== 'manager') {
    return <div className="text-red-500 text-center mt-4">Access denied: Managers only</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Add User</h2>
        <form onSubmit={handleAddUser} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="role">Role:</label>
            <select
              id="role"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add User
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{`Error: ${error}`}</p>}
      </div>
    </div>
  );
};

export default AddUser;
