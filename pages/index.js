import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import { FaMusic, FaCalendarAlt } from 'react-icons/fa';
import styles from '../styles/components/home.module.css';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import section1Img from '../public/images/section1.jpg';
import section2Img from '../public/images/section2.jpg';
import coastalImg from '../public/images/cuisine.jpg';
import cocktailsImg from '../public/images/craft.jpg';
import brewsImg from '../public/images/brews.jpg';


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
      <main className="scrollContainer">
      <div id="hero">
        <Hero />
      </div>
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
              <h2 className={styles.section1Title}>Welcome to the Surf Shack at 935 Ocean Beachside Inn</h2>
              <p className={styles.section1Desc}>
                North Beach’s newest beach bar is here. Located in the backyard of the historic 935 Ocean Hotel,
                935 Surf Shack is your go-to for live music, fresh lobster rolls, and amazing cocktails.
              </p>
              <div className={styles.seasonalMessage}>
                <p><strong>We're closed for the winter season!</strong></p>
              </div>
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
         
           

              <Link href="/events" className={styles.ctaButton}>
                See The Full Lineup
              </Link>
            </div>

            {/* IMAGE COLUMN (event or fallback) */}
            <div className={styles.section2Image}>

            <Image
              src={eventImageUrl}
              alt={nextEvent?.title ?? 'No upcoming shows'}
              width={600}                
              height={400}
              style={{
                width: '100%',        
                height: 'auto',       
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
        <section className={`${styles.section4} ${instaPosts.length === 0 ? styles.section4Placeholder : ''}`}>
          <h2 className={styles.section4Title}>Our Instagram Feed</h2>

          {isMounted && instaPosts.length > 0 ? (
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
                 0:   { slidesPerView: 1, spaceBetween: 8 },  
                320: { slidesPerView: 1,  spaceBetween: 8 },  
               640: { slidesPerView: 1 },
                1024:{ slidesPerView: 3.2 },
      }}
                className={styles.swiperContainer}
                onSwiper={(swiper) => {
                swiper.on('slideChange', () => {
                  const activeSlide = swiper.slides[swiper.activeIndex];
                  const video = activeSlide?.querySelector('video');
                  video?.play().catch(() => {});
                });

                setTimeout(() => {
                  const firstSlide = swiper.slides[0];
                  const video = firstSlide?.querySelector('video');
                  video?.play().catch(() => {});
                }, 0);
              }}>
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
                            height={250}
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
          ) : (
            <div className={styles.instagramPlaceholder}>
              <div className={styles.placeholderContent}>
                <div className={styles.placeholderIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className={styles.placeholderTitle}>Follow Our Journey</h3>
                <p className={styles.placeholderText}>
                  Check out our latest posts and stories on Instagram for behind-the-scenes content, 
                  special events, and the freshest updates from the Surf Shack!
                </p>
                <a 
                  href="https://www.instagram.com/935surfshack/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.instagramCTA}
                >
                  Visit Our Instagram
                </a>
              </div>
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
  
  // Only attempt Instagram API call if access token is available
  if (accessToken) {
    try {
      const fields = ['id','caption','media_url','permalink','media_type','timestamp']
        .join(',');
      const res = await fetch(
        `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error('Instagram API error:', {
          status: res.status,
          statusText: res.statusText,
          error: errText
        });
      } else {
        const { data } = await res.json();
        if (data && Array.isArray(data)) {
          instaPosts = data
            .filter(p =>
              ['IMAGE','CAROUSEL_ALBUM','VIDEO'].includes(p.media_type)
            )
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 6);
        } else {
          console.warn('Instagram API returned unexpected data format:', data);
        }
      }
    } catch (err) {
      console.error('Instagram fetch failed:', {
        error: err.message,
        stack: err.stack
      });
    }
  } else {
    console.warn('Instagram access token not configured - showing placeholder content');
  }

  return {
    props: { nextEvent, instaPosts },
    revalidate: 300, // refresh every 5min
  };
}