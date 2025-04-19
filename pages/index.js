import Layout from '../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/Hero'; 
import { FaMusic, FaCalendarAlt } from 'react-icons/fa';
import styles from '../styles/components/home.module.css';
import { client } from '../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import clsx from 'clsx';
// Replace these with your actual image imports
import section1Img from '../public/images/section1.jpg';
import section2Img from '../public/images/section2.jpg';
import coastalImg   from '../public/images/coastal-cuisine.jpg';
import cocktailsImg from '../public/images/craft-cocktails.jpg';
import brewsImg     from '../public/images/local-brews.jpg';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  if (!source) return null;
  return builder.image(source).url();
}


export default function Home(nextEvent) {
  const eventImageUrl = nextEvent?.image
    ? urlFor(nextEvent.image).width(800).height(600).url()
    : section2Img;

  return (
    <Layout>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Hero */}
      <Hero />

      <main> 
       {/* SECTION 1 */}
      <section className={styles.section1}>
        <div className={styles.section1Content}>
          <div className={styles.section1Image}>
            <Image
              src={section1Img}
              alt="935 Surf Shack Interior"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className={styles.section1Text}>
            <h2 className={styles.section1Title}>Welcome to 935 Surf Shack</h2>
            <p className={styles.section1Desc}>
              North Beach’s newest beach bar is here. Located in the backyard of the historic 935 Ocean Inn, 935 Surf Shack is your go to for live music, fresh lobster rolls, and amazing cocktails.
            </p>
            <ul className={styles.hoursList}>
              <li><strong>Thu–Sat:</strong> 3–8 pm</li>
              <li><strong>Sun:</strong> 12–6 pm</li>
              <li><strong>Happy Hour:</strong> 3–5 pm (Thu & Fri)</li>
            </ul>
            <a href="/menu" className={styles.ctaButton}>View Our Menu</a>
          </div>
        </div>
      </section>

      {/* SECTION 2: Next Upcoming Event */}
      <section className={styles.section2}>
          <div className={styles.section2Content}>
            {/* TEXT COLUMN */}
            <div className={styles.section2Text}>
              <h2 className={styles.section2Title}>Your Go‑to For Live Music</h2>

              {nextEvent ? (
                <>
                <p className={styles.section2Desc}>
                  Join us for live music on Friday & Saturday in the spring and fall and Thursday – Sunday in the summer!
                </p>
                <div className={styles.features}>
              <div className={styles.feature}>
                <FaMusic className={styles.featureIcon} />
                <span>Local Artists</span>
              </div>
              <div className={styles.feature}>
                <FaCalendarAlt className={styles.featureIcon} />
                <span>Weekly Events</span>
              </div>
            </div>
                </>
              ) : (
                <p className={styles.section2Desc}>
                  We don’t have any upcoming shows scheduled just yet. Check back soon!
                </p>
              )}

              <a href="/events" className={styles.ctaButton}>
                See The Full Lineup
              </a>
            </div>

            {/* IMAGE COLUMN (event or fallback) */}
            <div className={styles.section2Image}>
              <Image
                src={eventImageUrl}
                alt={nextEvent?.title ?? 'No upcoming shows'}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className={styles.liveTag}>
                {nextEvent ? (
                  <>
                    <strong>Next Up:</strong>{' '}
                    {new Date(nextEvent.date).toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}{' '}
                    — {nextEvent.title}
                  </>
                ) : (
                  'No Upcoming Events'
                )}
              </div>
            </div>
          </div>
        </section>

      {/* SECTION 3 */}
      <section className={styles.section3}>
        <h2 className={styles.section3Title}>Beach Bites &amp; Refreshing Drinks</h2>
        <p className={styles.section3Desc}>
          From pretzel bites to 2 for $30 lobster rolls, our food menu pairs perfectly with crafted cocktails and local brews.
        </p>
        <div className={styles.cards3}>
          {[
            { img: coastalImg, title: 'Coastal Cuisine', desc: 'Fresh seafood & local favorites' },
            { img: cocktailsImg, title: 'Craft Cocktails', desc: 'Uniquely crafted beach drinks' },
            { img: brewsImg,   title: 'Local Brews',     desc: "Featuring NH's finest craft beers" },
          ].map((card) => (
            <div key={card.title} className={styles.card3}>
              <Image
                src={card.img}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className={styles.card3Overlay}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="/menu" className={styles.ctaButton}>View Full Menu</a>
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
        {/* SECTION 5 (Unchanged) */}
      <section className={styles.section5}>
        <img
          src="/images/map1.png"
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
export async function getStaticProps() {
  // Grab all future events, sorted ascending by date
  const query = `*[_type=="event" && date >= now()] | order(date asc){
    _id, title, date, artist, image
  }`;
  const events = await client.fetch(query);

  return {
    props: {
      nextEvent: events.length > 0 ? events[0] : null
    },
    revalidate: 60, // update once a minute
  };
}