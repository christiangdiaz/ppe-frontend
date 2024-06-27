import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/login', {
                username,
                password
            });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('authToken', token); // Save token to localStorage
                alert('Login successful!');
                onLogin(token); // Pass the token to the parent
            }
        } catch (error) {
            alert('Error logging in: ' + (error.response && error.response.data ? error.response.data.message : error.message));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
