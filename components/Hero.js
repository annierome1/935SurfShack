import { motion } from 'framer-motion';
import styles from '../styles/components/hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.heroContainer}>
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className={styles.title}>
          Opening May 14th!
        </h1>
      </motion.div>
    </section>
  );
}
