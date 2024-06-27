import React, { useState, useEffect } from 'react';
import Login from './Login';
import AddUser from './AddUser';
import UserList from './UserList';
import SignOut from './Signout';

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    const handleSignOut = () => {
        setToken(null); // Clear token from state
    };

    return (
        <div>
            {!token ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    <SignOut onSignOut={handleSignOut} />
                    <AddUser token={token} />
                    <UserList token={token} />
                </div>
            )}
        </div>
    );
};

export default App;
