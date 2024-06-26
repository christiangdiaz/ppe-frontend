import React, { useState } from 'react';
import Login from './Login';
import AddUser from './AddUser';
import UserList from './UserList';

const App = () => {
    const [token, setToken] = useState(null);

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    return (
        <div>
            {!token ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    <AddUser token={token} />
                    <UserList token={token} />
                </div>
            )}
        </div>
    );
};

export default App;
