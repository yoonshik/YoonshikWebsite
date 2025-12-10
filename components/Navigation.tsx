'use client';

import Link from 'next/link';
import { usePlaygroundDrawer } from './PlaygroundDrawerContext';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { openDrawer } = usePlaygroundDrawer();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          YH
        </Link>
        <button
          className={`${styles.menuButton} ${styles.menuButtonDice}`}
          onClick={openDrawer}
          aria-label="Open playground menu"
        >
          <span className={styles.iconDice}>🎲</span>
        </button>
      </div>
    </nav>
  );
}
