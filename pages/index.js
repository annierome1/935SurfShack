import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import { FaMusic, FaCalendarAlt } from 'react-icons/fa';
import styles from '../styles/components/home.module.css';
import { client } from '../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import section1Img from '../public/images/section1.jpg';
import section2Img from '../public/images/section2.jpg';
import coastalImg from '../public/images/coastal-cuisine.jpg';
import cocktailsImg from '../public/images/craft-cocktails.jpg';
import brewsImg from '../public/images/local-brews.jpg';
SwiperCore.use([Pagination, Autoplay, Navigation]);
const builder = imageUrlBuilder(client);
function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

export default function Home({ nextEvent, instaPosts = [] }) {
  const eventImageUrl = nextEvent?.image
  ? urlFor(nextEvent.image)
      .width(600)
      .height(400)
      .fit('fill')       
      .crop('top')      
      .url()
  : section2Img;


    const [isMounted, setIsMounted] = useState(false);
      useEffect(() => {
        setIsMounted(true);
      }, []);

  return (
    <Layout>
      <Head>
        <title>935 Surf Shack</title>
      </Head>

      {/* Hero */}
      <div id="hero">
        <Hero />
      </div>

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
                North Beach’s newest beach bar is here. Located in the backyard of the historic 935 Ocean Inn,
                935 Surf Shack is your go-to for live music, fresh lobster rolls, and amazing cocktails.
              </p>
              <ul className={styles.hoursList}>
                <li><strong>Thu–Sat:</strong> 3–8 pm</li>
                <li><strong>Sun:</strong> 12–6 pm</li>
                <li><strong>Happy Hour:</strong> 3–5 pm (Thu & Fri)</li>
              </ul>
              <Link href="/menu" className={styles.ctaButton}>
                View Our Menu
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: Next Upcoming Event */}
        <section className={styles.section2}>
          <div className={styles.section2Content}>
            {/* TEXT COLUMN */}
            <div className={styles.section2Text}>
              <h2 className={styles.section2Title}>Your Go-to For Live Music</h2>

              {nextEvent ? (
                <>
                  <p className={styles.section2Desc}>
                    Join us for live music on Friday & Saturday in the spring and fall
                    and Thursday–Sunday in the summer!
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

              <Link href="/events" className={styles.ctaButton}>
                See The Full Lineup
              </Link>
            </div>

            {/* IMAGE COLUMN (event or fallback) */}
            <div className={styles.section2Image}>

            <Image
              src={eventImageUrl}
              alt={nextEvent?.title ?? 'No upcoming shows'}
              width={600}                // any “default” you like
              height={400}
              style={{
                width: '100%',          // full-width of container
                height: 'auto',         // height follows the intrinsic ratio
                objectFit: 'cover',
                objectPosition: 'top',
              }}
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
          <h2 className={styles.section3Title}>Beach Bites & Refreshing Drinks</h2>
          <p className={styles.section3Desc}>
            From pretzel bites to 2 for $30 lobster rolls, our food menu pairs perfectly
            with crafted cocktails and local brews.
          </p>
          <div className={styles.cards3}>
            {[
              { img: coastalImg, title: 'Coastal Cuisine', desc: 'Fresh seafood & local favorites' },
              { img: cocktailsImg, title: 'Craft Cocktails', desc: 'Uniquely crafted beach drinks' },
              { img: brewsImg, title: 'Local Brews', desc: "Featuring NH's finest craft beers" },
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
          <Link href="/menu" className={styles.ctaButton}>
            View Full Menu
          </Link>
        </section>

        {/* SECTION 4: Instagram */}
        <section className={styles.section4}>
      <h2 className={styles.section4Title}>Our Instagram Feed</h2>

      {isMounted && (
        <div className={styles.swiperWrapper}>

          <Swiper
            spaceBetween={12}
            slidesPerView={1.2}
            centeredSlides
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{
              el: '#insta-pagination',
              clickable: true,
            }}
            navigation={{
              prevEl: '#insta-prev',
              nextEl: '#insta-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            className={styles.swiperContainer}
            onSlideChange={(swiper) => {
              document.querySelectorAll('video').forEach((vid) => {
                if (swiper.slides[swiper.activeIndex].contains(vid)) {
                  vid.play().catch(() => {});
                } else {
                  vid.pause();
                }
              });
            }}
            onInit={(swiper) => {
              swiper.slides[0].querySelector('video')?.play().catch(() => {});
            }}
          >
            {instaPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.instaLink}
                >
                  <div className={styles.mediaWrapper}>
                    {post.media_type === 'VIDEO' ? (
                      <video
                        src={post.media_url}
                        muted
                        playsInline
                        loop
                        className={styles.video}
                      />
                    ) : (
                      <Image
                        src={post.media_url}
                        alt={post.caption?.slice(0, 80) || 'Instagram post'}
                        width={300}
                        height={300}
                        objectFit="cover"
                        unoptimized
                        className={styles.galleryImage}
                      />
                    )}
                    {post.caption && (
                      <div className={styles.captionOverlay}>
                        {post.caption}
                      </div>
                    )}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination container */}
          <div id="insta-pagination" className={styles.customPagination} />
        </div>
      )}
    </section>





        {/* SECTION 5 */}
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
  // fetch next upcoming event
  const eventQuery = `
    *[_type=="event" && date >= now()] | order(date asc){
      _id, title, date, artist, image
    }
  `;
  const events = await client.fetch(eventQuery);
  const nextEvent = events[0] || null;

  // Instagram Basic Display API call
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  let instaPosts = [];
  try {
    const fields = ['id','caption','media_url','permalink','media_type','timestamp']
      .join(',');
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('Instagram API error:', errText);
    } else {
      const { data } = await res.json();
      instaPosts = data
      .filter(p =>
        ['IMAGE','CAROUSEL_ALBUM','VIDEO'].includes(p.media_type)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 6);
    }
  } catch (err) {
    console.error('Instagram fetch failed:', err);
  }

  return {
    props: { nextEvent, instaPosts },
    revalidate: 300, // ISR: refresh every 5min
  };
}