import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.title}>Around the Web</h3>
        <ul className={styles.social}>
          <li>
            <a 
              href="https://www.linkedin.com/in/yoonshik/" 
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
          </li>
          <li>
            <a 
              href="https://www.github.com/yoonshik" 
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              gh
            </a>
          </li>
        </ul>
        <div className={styles.copyright}>
          Copyright &copy; Yoonshik Hong {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
