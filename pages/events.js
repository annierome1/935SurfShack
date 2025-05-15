import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import styles from '../styles/components/events.module.css';
import { client } from '../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import FormSubmit from '../components/FormSubmit';
import { useMemo } from 'react'
import { addWeeks } from 'date-fns' 
// Images
import heroImage from '../public/images/performer.jpg';      
import privateEventImage from '../public/images/event.jpg'; 
import altImage1 from '../public/images/party1.jpg';
import altImage2 from '../public/images/party2.jpg';
import altImage3 from '../public/images/party3.jpg';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination, Autoplay, Mousewheel, Keyboard } from 'swiper';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Events({ events }) {
  // Toggle state for Calendar or List view
  const [view, setView] = useState('calendar');
  const now = useMemo(() => new Date (), []);
  const twoWeeksOut = useMemo (() => addWeeks(now, 2), [now]);
  const futureEvents = useMemo(
    () => events.filter(e => new Date(e.date) >= now),
    [events, now]
  );

  // subset of those within the next two weeks
  const nextTwoWeeks = useMemo(
    () => futureEvents.filter(e => new Date(e.date) <= twoWeeksOut),
    [futureEvents, twoWeeksOut]
  );
  return (
    <Layout>
      <div className={styles.container}>
        
        {/* =========================
            HERO SECTION
         ========================= */}
        <section className={styles.heroSection}>
          <div className={styles.heroGallery}>
            {[heroImage, altImage1, altImage2, altImage3].map((src, i) => (
              <div key={i} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={`Gallery ${i}`}
                  layout="fill"
                  objectFit="cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          <div className={styles.heroText}>
            <h1>Feel The Vibes</h1>
            <p>
              What goes better with a lobster roll and cocktail than live music? 
              Join us for live music on Thursday & Friday in the spring and fall and Thursday - Sunday in the summer. 
              Our artists perform a range of genres from reggae to classics to country and you may just discover a hidden gem you’ve never heard before. 
              Fair warning that it may be hard to leave once you sit down and enjoy the vibes.
            </p>
          </div>
        </section>
        <section className={styles.eventsSection}>
          <div className={styles.viewToggle}>
            <button
              onClick={() => setView('calendar')}
              className={view === 'calendar' ? styles.activeToggle : ''}
            >
              Calendar View
            </button>
            <span> | </span>
            <button
              onClick={() => setView('list')}
              className={view === 'list' ? styles.activeToggle : ''}
            >
            List View
            </button>
          </div>

          
          {view === 'calendar' ? (
            <CalendarView
              events={nextTwoWeeks}
              minDate={now}
              maxDate={twoWeeksOut}
            />
          ) : (
            <div className={styles.mobileCenter}>
            <div className={styles.carouselWrapper}>
              <Swiper
                modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
                spaceBetween={8}
                pagination={{ el: '#swiper-pagination', clickable: true }}
                navigation={{ prevEl: '#insta-prev', nextEl: '#insta-next' }}    
                mousewheel={true}                   
                keyboard={{ enabled: true }}        
                autoplay={{ delay: 5000 }}
                autoHeight={true}
                breakpoints={{
                  320:  { slidesPerView: 1, centeredSlides: true },
                  640:  { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1440: { slidesPerView: 4 },
                }}
              >
                {futureEvents.map(event => {
                  let src = '/images/placeholder.jpg';
                  let targetHeight = 250;
                  let targetWidth = 300;

                  if (event.image?.asset) {
                    const { url } = event.image.asset;
                    const { width: origW, height: origH } = event.image.asset.metadata.dimensions;
                    src = url;
                    targetWidth = Math.round((origW / origH) * targetHeight);
                  }

                  return (
                    <SwiperSlide key={event._id}>
                      <div className={styles.contentWrapper}>
                      <div className={styles.eventCard}>
                        <div className={styles.eventImageWrapper}>
                          <Image
                            src={src}
                            alt={event.title}
                            width={targetWidth}
                            height={targetHeight}
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'top',
                              width: '100%',
                              height: 'auto',
                            }}
                            priority
                          />
                        </div>
                        <div className={styles.eventContent}>
                          <h3 className={styles.eventTitle}>{event.title}</h3>
                          <time className={styles.eventDate}>
                            {new Date(event.date).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </time>
                          <p className={styles.eventDescription}>
                            {event.description}
                          </p>
                        </div>
                      </div>
                      </div>
                      
                    </SwiperSlide>
                  );
                })}
                </Swiper>
                <div id="swiper-pagination" className={styles.customPagination} />
                
                </div>
            </div>
          )}
        </section>

        {/* =========================
            PRIVATE EVENT INQUIRY
         ========================= */}
        <section className={styles.privateEventSection}>
          <div className={styles.privateEventWrapper}>
            <div className={styles.privateEventLeft}>
              <div className={styles.privateEventText}>
                <h1>Why Would You Celebrate Anywhere Else?</h1>
                <p>
                  From weddings to birthday parties to corporate events, 935 Ocean and the Surf Shack can handle it all. 
                  We offer rentals of our space for any of your celebrations! Whether you want to rent our 30’x40’ tent or the whole venue, we’d love to speak with you! 
                  Please fill out the form below to inquire about hosting your event with us.
                </p>
              
              <div className={styles.privateEventImageWrapper}>
                <Image
                  src={privateEventImage}
                  alt="Private event at the bar"
                  layout="responsive"
                  width={800}
                  height={500}
                />
              </div>
              </div>
            </div>

            <div className={styles.privateEventFormWrapper}>
              <h3 className={styles.inquiryFormTitle}>Event Inquiry</h3>

              <FormSubmit
                to="chris@935ocean.com"
                subject="New Event Inquiry"
                className={styles.inquiryForm}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date</label>
                  <input type="date" id="eventDate" name="eventDate" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type</label>
                  <select id="eventType" name="eventType" required>
                    <option value="">Select Type</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="numberOfGuests">Number of Guests</label>
                  <input type="number" id="numberOfGuests" name="numberOfGuests" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="additionalInfo">Additional Information</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows="4"
                    placeholder="Let us know any details..."
                  />
                </div>

                <button
                  type="submit"
                  className={styles.formSubmitButton}
                >
                  Submit Inquiry
                </button>
              </FormSubmit>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// Fetch events from Sanity
export async function getStaticProps() {
  const query = `*[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    description,
    image {
      asset->{
        url,
        metadata{ dimensions{ width, height } }
      }
    }
  }`;
  const events = await client.fetch(query);
  return {
    props: { events },
    revalidate: 60,
  };
}
