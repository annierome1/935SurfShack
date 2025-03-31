import styles from '../styles/components/sectionCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SectionCard({
  image,
  title,
  description,
  buttonLabel,
  buttonLink,
  reverse = false,
  bgColor = '#c2e4e7', // Default Tiki-style orange
}) {
  return (
    <section
      className={`${styles.section} ${reverse ? styles.reverse : ''}`}
      style={{ '--bg-color': bgColor }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          priority
        />

         <div
          className={`${styles.svgWave} ${reverse ? styles.waveLeft : styles.waveRight}`}
        >
          <div className="wave-wrapper">
            <svg
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
                className="vertical-wave"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                fill="#c2e4e7"
                d="M 100 0 C 60 200, 60 800, 100 1000 L 0 1000 L 0 0 Z"
                />
            </svg>
            </div>


        </div>

        <div
          className={`${styles.fadeOverlay} ${reverse ? styles.fadeLeft : styles.fadeRight}`}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={buttonLink}>
          <button className={styles.button}>{buttonLabel}</button>
        </Link>
      </div>
    </section>
  );
}
