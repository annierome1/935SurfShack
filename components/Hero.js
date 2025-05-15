import styles from '../styles/components/hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Now Open!
        </h1>
      </div>
    </section>
  );
}
//test
