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
import Footer from './Footer';

const App = () => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState('Guest');
  const [fileListUpdate, setFileListUpdate] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken); 
      setToken(storedToken);
      setUserRole(decodedToken.role); 
    }
  }, []);

  const handleLogin = (newToken) => {
    const decodedToken = jwtDecode(newToken); 
    setToken(newToken);
    setUserRole(decodedToken.role); 
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userRole', decodedToken.role);
  };

  const handleSignOut = () => {
    setToken(null);
    setUserRole('Guest');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const handleFileUpload = () => {
    setFileListUpdate(!fileListUpdate); 
  };

  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar userRole={userRole} onSignOut={handleSignOut}/>
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
            {!token && <Route path="/login" element={<Login onLogin={handleLogin} />} />}
            {/* Private Routes */}
            {token && (
              <>
                <Route path="/upload" element={<UploadFile token={token} role={userRole} onFileUpload={handleFileUpload} />} />
                <Route path="/owners-area" element={<FileList userRole={userRole} />} />
                <Route path="/resident-directory" element={<UserList token={token} role={userRole} />} />
                <Route path="/add-user" element={<AddUser token={token} role={userRole} />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
