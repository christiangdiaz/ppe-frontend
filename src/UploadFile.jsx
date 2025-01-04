import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const UploadFile = ({ token, role, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('notices'); // Default category
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'files'), {
        name: file.name,
        url: downloadURL,
        category: category
      });

      onFileUpload?.();
      setSuccess('File uploaded successfully!');
      setFile(null);
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (role !== 'manager') {
    return <div className="text-red-500 text-center mt-4">Access denied: Managers only</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Upload File</h2>
        
        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 file:rounded-md 
            file:border-0 file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-semibold">Select Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="notices">Notices for Meetings</option>
            <option value="rules">Rules and Regulations</option>
            <option value="documents">Documents</option>
            <option value="minutes">Meeting Minutes</option>
            <option value='board'>Board of Directors</option>
          </select>
        </div>

        <button 
          onClick={handleUpload} 
          disabled={uploading} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded-md transition-colors 
          duration-200 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default UploadFile;
