import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    onSignOut();
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold tracking-wide">Pelican Point East</Link>
            </div>
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Home</Link>
                {userRole !== 'Guest' && (
                  <Link to="/owners-area" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Owners' Area</Link>
                )}
                {userRole === 'manager' && (
                  <>
                    <Link to="/upload" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Upload File</Link>
                    <Link to="/resident-directory" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">User List</Link>
                    <Link to="/add-user" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Add User</Link>
                  </>
                )}
                <Link to="/contact" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Contact Us</Link>
                {userRole === 'Guest' ? (
                  <Link to="/login" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Login</Link>
                ) : (
                  <button
                    onClick={handleSignOut}
                    className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        id="mobile-menu"
        ref={mobileMenuRef}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Home</Link>
          {userRole !== 'Guest' && (
            <Link to="/files" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">File List</Link>
          )}
          {userRole === 'manager' && (
            <>
              <Link to="/upload" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Upload File</Link>
              <Link to="/resident-directory" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">User List</Link>
              <Link to="/add-user" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Add User</Link>
            </>
          )}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Contact Us</Link>
          {userRole === 'Guest' ? (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Login</Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
