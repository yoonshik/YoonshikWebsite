'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Yoonshik Hong
        </Link>
        
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          <li>
            <Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/calculator" className={styles.link} onClick={() => setIsOpen(false)}>
              Calculator
            </Link>
          </li>
          <li>
            <Link href="/montyhall" className={styles.link} onClick={() => setIsOpen(false)}>
              Monty Hall Problem
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
