import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const FileList = ({ userRole }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">File List</h2>
        <ul className="space-y-4">
          {files.map(file => (
            <li key={file.id} className="flex justify-between items-center">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{file.name}</a>
              {userRole === 'manager' && (
                <button 
                  onClick={() => handleDeleteFile(file.id, file.name)} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
