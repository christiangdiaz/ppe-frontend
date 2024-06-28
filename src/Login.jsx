import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

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
        alert('Login successful!');
        onLogin(response.data.token); // Pass the custom token to the parent component
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <label className={styles.label}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input} />
        </label>
        <label className={styles.label}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Login</button>
      </form>
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default Login;
