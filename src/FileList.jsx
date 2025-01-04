import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from 'firebase/storage';

const OwnersArea = ({ userRole }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('notices');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'files'));
        const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFiles(filesList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDeleteFile = async (fileId, fileName) => {
    try {
      await deleteDoc(doc(db, 'files', fileId));
      await deleteObject(ref(storage, `files/${fileName}`));
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditFileCategory = async (fileId, newCategory) => {
    try {
      if (!newCategory) return;
      const fileDoc = doc(db, 'files', fileId);
      await updateDoc(fileDoc, { category: newCategory });
      setFiles(prevFiles => prevFiles.map(file => file.id === fileId ? { ...file, category: newCategory } : file));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => ({ ...prev, [fileId]: !prev[fileId] }));
  };

  const handleSelectAllFiles = () => {
    const visibleFiles = files.filter(file => file.category === selectedCategory);
    const newSelectedFiles = allSelected ? {} : Object.fromEntries(visibleFiles.map(file => [file.id, true]));
    setSelectedFiles(newSelectedFiles);
    setAllSelected(!allSelected);
  };

  const handleDownloadSelectedFiles = async () => {
    const selectedFileIds = Object.keys(selectedFiles).filter(id => selectedFiles[id]);
    for (const fileId of selectedFileIds) {
      const file = files.find(file => file.id === fileId);
      if (file) {
        const url = await getDownloadURL(ref(storage, `files/${file.name}`));
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

  const categories = [
    { key: 'notices', label: 'Notices for Meetings' },
    { key: 'minutes', label: 'Meeting Minutes' },
    { key: 'rules', label: 'Rules and Regulations' },
    { key: 'documents', label: 'Documents' },
    { key: 'board', label: 'Board of Directors' }
  ];

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;

  const filteredFiles = files.filter(file => file.category === selectedCategory);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-4 md:p-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">Owners' Area</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); setSelectedFiles({}); setAllSelected(false); }}
              className={`px-4 py-2 font-bold text-white rounded w-full ${selectedCategory === key ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-8 gap-2">
          <button onClick={handleSelectAllFiles} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full md:w-auto">
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          <button onClick={handleDownloadSelectedFiles} className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded w-full md:w-auto">
            Download Selected Files
          </button>
        </div>

        {filteredFiles.length === 0 ? (
          <p className="text-gray-500 text-center">No files available in this section.</p>
        ) : (
          <ul className="space-y-4">
            {filteredFiles.map(file => (
              <li key={file.id} className="flex flex-col md:flex-row justify-between items-center border-b pb-2">
                <div className="flex items-center w-full md:w-auto">
                  <input type="checkbox" checked={selectedFiles[file.id] || false} onChange={() => handleSelectFile(file.id)} className="mr-2" />
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {file.name}
                  </a>
                </div>
                {userRole === 'manager' && (
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                    <select onChange={(e) => handleEditFileCategory(file.id, e.target.value)} value={file.category} className="py-1 px-3 rounded w-full md:w-auto">
                      {categories.map(({ key, label }) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    <button onClick={() => handleDeleteFile(file.id, file.name)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded w-full md:w-auto">Delete</button>
                  </div>
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
