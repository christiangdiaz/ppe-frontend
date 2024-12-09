import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from 'firebase/storage';

const OwnersArea = ({ userRole }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('notices'); // default category

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'files'));
        const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFiles(filesList);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDeleteFile = async (fileId, fileName) => {
    try {
      await deleteDoc(doc(db, 'files', fileId));
      const storageRef = ref(storage, `files/${fileName}`);
      await deleteObject(storageRef);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prevState => ({
      ...prevState,
      [fileId]: !prevState[fileId]
    }));
  };

  const handleSelectAllFiles = () => {
    // Select only files from the currently selected category
    const visibleFiles = files.filter(file => file.category === selectedCategory);
    if (allSelected) {
      setSelectedFiles({});
    } else {
      const newSelectedFiles = {};
      visibleFiles.forEach(file => {
        newSelectedFiles[file.id] = true;
      });
      setSelectedFiles(newSelectedFiles);
    }
    setAllSelected(!allSelected);
  };

  const handleDownloadSelectedFiles = async () => {
    const selectedFileEntries = Object.entries(selectedFiles).filter(([, isSelected]) => isSelected);
    for (const [fileId,] of selectedFileEntries) {
      const file = files.find(file => file.id === fileId);
      if (file) {
        const storageRef = ref(storage, `files/${file.name}`);
        const url = await getDownloadURL(storageRef);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = file.name;
        anchor.target = '_blank';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  // Filter files based on selected category
  const filteredFiles = files.filter(file => file.category === selectedCategory);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Owner's Area</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => { setSelectedCategory('notices'); setSelectedFiles({}); setAllSelected(false); }}
            className={`px-4 py-2 font-bold text-white rounded ${selectedCategory === 'notices' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Notices for Meetings
          </button>
          <button
            onClick={() => { setSelectedCategory('rules'); setSelectedFiles({}); setAllSelected(false); }}
            className={`px-4 py-2 font-bold text-white rounded ${selectedCategory === 'rules' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Rules and Regulations
          </button>
          <button
            onClick={() => { setSelectedCategory('documents'); setSelectedFiles({}); setAllSelected(false); }}
            className={`px-4 py-2 font-bold text-white rounded ${selectedCategory === 'documents' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Documents
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-2 md:space-y-0">
          <button
            onClick={handleSelectAllFiles}
            className={`w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${allSelected ? 'bg-green-700' : 'bg-green-600'}`}
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={handleDownloadSelectedFiles}
            className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Download Selected Files
          </button>
        </div>

        {filteredFiles.length === 0 ? (
          <p className="text-gray-500">No files available in this section.</p>
        ) : (
          <ul className="space-y-4">
            {filteredFiles.map(file => (
              <li key={file.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <input
                  type="checkbox"
                  checked={selectedFiles[file.id] || false}
                  onChange={() => handleSelectFile(file.id)}
                  className="mr-2 transform scale-150"
                />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {file.name}
                </a>
                {userRole === 'manager' && (
                  <button
                    onClick={() => handleDeleteFile(file.id, file.name)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors duration-200"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OwnersArea;
