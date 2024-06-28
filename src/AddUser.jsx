import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddUser.module.css';

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
        alert('User created successfully!');
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
    return <div className={styles.error}>Access denied: Managers only</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add User</h2>
      <form onSubmit={handleAddUser} className={styles.form}>
        <label className={styles.label}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input} />
        </label>
        <label className={styles.label}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
        </label>
        <label className={styles.label}>
          Role:
          <select value={roleInput} onChange={(e) => setRoleInput(e.target.value)} required className={styles.select}>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>Add User</button>
      </form>
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default AddUser;
