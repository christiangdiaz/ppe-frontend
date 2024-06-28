import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from './UploadFile.module.css';

const UploadFile = ({ token, role, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFileUrl(downloadURL);

      // Save file details in Firestore
      await addDoc(collection(db, 'files'), {
        name: file.name,
        url: downloadURL
      });

      onFileUpload(); // Trigger file list update
      setSuccess('File uploaded successfully!');
      console.log('File uploaded successfully:', downloadURL);

      // Clear the file input
      setFile(null);
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      setError(error.message);
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  if (role !== 'manager') {
    return <div className={styles.error}>Access denied: Managers only</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload File</h2>
      <input type="file" onChange={handleFileChange} className={styles.input} />
      <button onClick={handleUpload} disabled={uploading} className={styles.button}>Upload</button>
      {error && <p className={styles.error}>Error: {error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default UploadFile;
