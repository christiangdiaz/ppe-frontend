import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './FileList.module.css';

const FileList = ({ fileListUpdate }) => {
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
  }, [fileListUpdate]);

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
            <a href={file.url} target="_blank" rel="noopener noreferrer" className={styles.link}>{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
