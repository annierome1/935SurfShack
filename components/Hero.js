// components/Hero.js
import styles from '../styles/components/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.title}> North Beaches Newest Beach Bar
        </h1>

      </div>
    </section>
  );
}
