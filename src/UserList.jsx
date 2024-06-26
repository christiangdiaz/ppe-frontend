import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    const handleDeleteUser = async (username) => {
        try {
            const response = await axios.delete(`http://localhost:4000/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setUsers(users.filter(user => user.username !== username));
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.username}>
                        {user.username} ({user.role})
                        <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
