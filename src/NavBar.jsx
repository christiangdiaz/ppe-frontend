import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ userRole, onSignOut }) => {
  console.log(userRole);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/files" className={styles.navLink}>File List</Link>
        </li>
        {userRole === 'manager' && (
          <>
            <li className={styles.navItem}>
              <Link to="/upload" className={styles.navLink}>Upload File</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/users" className={styles.navLink}>User List</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/add-user" className={styles.navLink}>Add User</Link>
            </li>
          </>
        )}
        <li className={styles.navItem}>
          <button onClick={onSignOut} className={styles.signOutButton}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
