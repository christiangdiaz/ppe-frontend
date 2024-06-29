import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UserList = ({ token, role }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (role !== 'manager') {
    return <div className="text-red-500 text-center mt-4">Access denied: Managers only</div>;
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Resident's Directory</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <span className="text-gray-700">{user.username} ({user.role})</span>
              <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
