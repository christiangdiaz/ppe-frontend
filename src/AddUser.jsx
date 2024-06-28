import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ token, onAddUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is user
  const [error, setError] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/users', {
        username,
        password,
        role
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        alert('User created successfully!');
        setUsername('');
        setPassword('');
        setRole('user'); // Reset role to default
        onAddUser(); // Notify parent to update user list
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AddUser;
