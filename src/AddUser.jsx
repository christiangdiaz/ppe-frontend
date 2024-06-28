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
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <select
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add User
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AddUser;
