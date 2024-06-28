import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import styles from './FileList.module.css';

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
  console.log(userRole)
  const handleDeleteFile = async (fileId, fileName) => {
    try {
      // Delete file from Firestore
      await deleteDoc(doc(db, 'files', fileId));
      // Delete file from Firebase Storage
      const storageRef = ref(storage, `files/${fileName}`);
      await deleteObject(storageRef);

      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>File List</h2>
      <ul className={styles.list}>
        {files.map(file => (
          <li key={file.id} className={styles.listItem}>
            <a href={file.url} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>{file.name}</a>
              {userRole==='manager' && (
                <button onClick={() => handleDeleteFile(file.id, file.name)} className={styles.deleteButton}>Delete</button>

              )}
              
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
