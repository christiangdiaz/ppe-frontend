import React from 'react';

const SignOut = ({ onSignOut }) => {
    const handleSignOut = () => {
        localStorage.removeItem('authToken'); // Clear token from localStorage
        onSignOut(); // Notify parent component
    };

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOut;
