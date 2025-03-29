// components/Hero.js
import styles from '../styles/components/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span className={styles.bigNumber}>935</span> Surf Shack
        </h1>
        <h2 className={styles.subTitle}></h2>
        <p className={styles.paragraph}>
          Enjoy live music, great food, and the best beachfront vibes.
        </p>
      </div>
    </section>
  );
}
