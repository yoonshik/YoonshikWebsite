import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Image
            src="/profile.png"
            alt="Yoonshik Hong"
            width={200}
            height={200}
            className={styles.profileImage}
            priority
          />
          <h1 className={styles.heroTitle}>Yoonshik Hong</h1>
          <div className={styles.divider}></div>
          <p className={styles.heroSubtitle}>Software Engineer</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <div className={styles.sectionDivider}></div>
        <div className={styles.content}>
          <p>
            Welcome to my personal website! This is a showcase of my work and a place where I build small apps and experiments.
          </p>
          <p>
            I&apos;m a software engineer passionate about building great products and exploring new technologies.
            This site is built with Next.js and serves as both my portfolio and a playground for creating useful tools and applications.
          </p>
          <p>
            Check out my apps in the navigation above, or visit my social links in the footer to connect with me.
          </p>
        </div>
      </section>
    </main>
  );
}
