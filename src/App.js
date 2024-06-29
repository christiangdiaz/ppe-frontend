import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Login from './Login';
import UploadFile from './UploadFile';
import FileList from './FileList';
import UserList from './UserList';
import AddUser from './AddUser';
import HomePage from './HomePage';
import Navbar from './NavBar';
import './index.css';
import ContactUs from './ContactUs';

const App = () => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [fileListUpdate, setFileListUpdate] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken); // Decode the token
      setToken(storedToken);
      setUserRole(decodedToken.role); // Extract the role from the decoded token
    }
  }, []);

  const handleLogin = (newToken) => {
    const decodedToken = jwtDecode(newToken); // Decode the token
    console.log('Login token:', newToken);  // Debug log
    console.log('Login role:', decodedToken.role);  // Debug log
    setToken(newToken);
    setUserRole(decodedToken.role); // Extract the role from the decoded token
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userRole', decodedToken.role);
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
    <Router>
      <div>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <Navbar userRole={userRole} onSignOut={handleSignOut} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadFile token={token} role={userRole} onFileUpload={handleFileUpload} />} />
              <Route path="/files" element={<FileList userRole={userRole} />} />
              <Route path="/resident-directory" element={<UserList token={token} role={userRole} />} />
              <Route path="/add-user" element={<AddUser token={token} role={userRole} />} />
              <Route path="contact" element={<ContactUs/>}/>
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
