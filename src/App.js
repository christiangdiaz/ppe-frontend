import React, { useState, useEffect } from 'react';
import Login from './Login';
import UploadFile from './UploadFile';
import FileList from './FileList';
import SignOut from './Signout';
import UserList from './UserList';
import AddUser from './AddUser';
import { useNavigate } from 'react-router-dom';
import './App.css'

const App = () => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [fileListUpdate, setFileListUpdate] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('userRole');

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userRole', role);
  };

  const handleSignOut = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const handleFileUpload = () => {
    setFileListUpdate(!fileListUpdate); // Toggle the state to trigger re-fetching files
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <SignOut onSignOut={handleSignOut} />
          <FileList fileListUpdate={fileListUpdate} />
          {userRole === 'manager' && <UploadFile token={token} onFileUpload={handleFileUpload} />}
          {userRole === 'manager' && <UserList token={token} />}
          {userRole === 'manager' && <AddUser token={token} />}
        </div>
      )}
    </div>
  );
};

export default App;
