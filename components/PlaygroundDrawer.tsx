'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appsMetadata } from '@/app/[appname]/appsMetadata';
import { usePlaygroundDrawer } from './PlaygroundDrawerContext';
import styles from './PlaygroundDrawer.module.css';

export default function PlaygroundDrawer() {
  const { isOpen, closeDrawer, toggleDrawer } = usePlaygroundDrawer();
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Playground apps drawer"
        aria-hidden={!isOpen}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Playground</h2>
          <button
            className={styles.closeButton}
            onClick={closeDrawer}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>

        <nav className={styles.drawerContent}>
          <p className={styles.drawerDescription}>
            Explore my collection of interactive apps and tools
          </p>
          <ul className={styles.appList}>
            {appsMetadata.map((app) => {
              const isActive = pathname === app.path;
              return (
                <li key={app.name}>
                  <Link
                    href={app.path}
                    className={`${styles.appLink} ${isActive ? styles.appLinkActive : ''}`}
                    onClick={closeDrawer}
                  >
                    <div className={styles.appInfo}>
                      <h3 className={styles.appTitle}>{app.title}</h3>
                      <p className={styles.appDescription}>{app.description}</p>
                    </div>
                    {isActive && (
                      <span className={styles.activeIndicator}>●</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
