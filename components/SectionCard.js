// components/SectionCard.js
import styles from '../styles/components/sectionCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SectionCard({
  image,
  title,
  description,
  buttonLabel,
  buttonLink,
  reverse = false,
  bgColor = '#fff',
}) {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <section
      className={`${styles.section} ${reverse ? styles.reverse : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* ========== TEXT COLUMN ========== */}
      <div className={styles.textContent}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        {buttonLabel && buttonLink && (
          <Link href={buttonLink}>
            <button className={styles.button}>{buttonLabel}</button>
          </Link>
        )}
      </div>

      {/* ========== IMAGE COLUMN ========== */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          priority
        />
      </div>

      {/* ========== WAVE TRANSITION ========== */}
      <div className={styles.waveContainer}>
        <svg
          className={styles.bottomWave}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,256L120,229.3C240,203,480,149,720,117.3C960,85,1200,75,1320,69.3L1440,64L1440,320L1320,320C1200,320,
               960,320,720,320C480,320,240,320,120,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
