import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Head from 'next/head';
import styles from '../styles/components/home.module.css';
import Image from 'next/image';




export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <Hero />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        {/* =========================
            SECTION 1
            (White bg, salmon text)
         ========================= */}
        <section className={styles.section1}>
          <h1 className={styles.section1Title}>Welcome to 935 Surf Shack</h1>
          <p className={styles.section1Desc}>
            North Beach’s newest beach bar is here. Located in the backyard of the
            historic, 935 Ocean Inn, 935 Surf Shack is your go-to for good times on North
            Beach. Are you ready for live music, fresh lobster rolls, and amazing
            cocktails? Visit us today!
          </p>
          <p className={styles.section1Hours}>
            HOURS OF OPERATION: THURSDAY - SATURDAY: 3-8PM / SUNDAY: 12-6PM / HAPPY HOUR:
            3-5PM (THURSDAY &amp; FRIDAY)
          </p>
          <a href="/menu" className={styles.section1Button}>
            Our Menus
          </a>
        </section>

        {/* =========================
            SECTION 2
            (Blue-green bg, white text)
         ========================= */}
        <section className={styles.section2}>
          <h2 className={styles.section2Title}>Your Go-to For Live Music</h2>
          <p className={styles.section2Desc}>
            Join us for live music on Friday &amp; Saturday in the spring and fall and
            Thursday - Sunday in the summer!
          </p>
          <a href="/events" className={styles.section2Button}>
            See The Lineup
          </a>
        </section>

        {/* =========================
            SECTION 3
            (White bg, salmon text)
         ========================= */}
        <section className={styles.section3}>
          <h2 className={styles.section3Title}>Beach Bites &amp; Refreshing Drinks</h2>
          <p className={styles.section3Desc}>
            From pretzel bites to 2 for $30 lobster rolls, our food menu goes perfect with
            our selection of refreshing cocktails and brews.
          </p>
          <a href="/events" className={styles.section3Button}>
            Our Menus
          </a>
        </section>

        {/* =========================
            SECTION 4
            (Blue-green bg, white text)
            Placeholder for an Instagram feed or image gallery
         ========================= */}
        <section className={styles.section4}>
          <h2 className={styles.section4Title}>Our Instagram Feed</h2>
          {/* Replace this with your actual Instagram embed / photos */}
          <div className={styles.section4Gallery}>
            <div className={styles.imagePlaceholder} />
            <div className={styles.imagePlaceholder} />
            <div className={styles.imagePlaceholder} />
            <div className={styles.imagePlaceholder} />
            <div className={styles.imagePlaceholder} />
            <div className={styles.imagePlaceholder} />
          </div>
        </section>
        {/* SECTION 5: Full‑Bleed Map with Overlay Text */}
        {/* =========================
    SECTION 5: Full‑Bleed Map + Overlay
========================= */}
<section className={styles.section5}>
  <img
    src="/images/map.png"
    alt="Map to 935 Surf Shack"
    className={styles.section5Image}
  />

  <div className={styles.section5Overlay}>
    <h2 className={styles.section5Title}>Steer Your Ship to North Beach</h2>
    <p className={styles.section5Desc}>
      Play at the Surf Shack, Stay at 935 Ocean!
    </p>
    <a
      href="https://www.935ocean.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.section5Button}
    >
      Book Now
    </a>
  </div>
</section>

      </main>
    </Layout>
  );
}
