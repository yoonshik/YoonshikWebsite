import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>App Not Found</h2>
      <p className={styles.message}>
        The app you're looking for doesn't exist.
      </p>
      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </div>
  );
}
