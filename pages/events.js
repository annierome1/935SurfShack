// pages/events.js

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import styles from '../styles/components/events.module.css';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import FormSubmit from '../components/FormSubmit';
import { addWeeks } from 'date-fns';

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
// (no more pagination CSS import)

import { Navigation, Autoplay, Keyboard, Mousewheel } from 'swiper';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Events({ events }) {
  // toggle between calendar/list
  const [view, setView] = useState('calendar');
  const now = useMemo(() => new Date(), []);
  const twoWeeksOut = useMemo(() => addWeeks(now, 2), [now]);

  // upcoming events
  const futureEvents = useMemo(
    () => events.filter(e => new Date(e.date) >= now),
    [events, now]
  );

  return (
    <Layout>
      <div className={styles.container}>

        {/* HERO */}
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

        {/* EVENTS */}
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
              events={futureEvents}
              minDate={now}
              maxDate={
                futureEvents.length > 0
                  ? new Date(futureEvents[futureEvents.length - 1].date)
                  : now
              }
            />
          ) : (
            <div className={styles.mobileCenter}>
              <div className={styles.carouselWrapper}>
                <Swiper
                  modules={[Navigation, Keyboard, Autoplay, Mousewheel]}
                  spaceBetween={8}
                  navigation={{ prevEl: '#list-prev', nextEl: '#list-next' }}
                  mousewheel={{ forceToAxis: true }}
                  keyboard={{ enabled: true }}
                  autoplay={{ delay: 5000 }}
                  autoHeight={true}
                  slidesPerGroup={1}
                  breakpoints={{
                    320:  { slidesPerView: 1, slidesPerGroup: 1, centeredSlides: true },
                    640:  { slidesPerView: 2, slidesPerGroup: 1 },
                    1024: { slidesPerView: 3, slidesPerGroup: 1 },
                    1440: { slidesPerView: 4, slidesPerGroup: 1 },
                  }}
                >
                  {futureEvents.map(event => {
                    let src = '/images/placeholder.jpg';
                    let targetHeight = 250;
                    let targetWidth = 300;
                    if (event.image?.asset) {
                      const { url } = event.image.asset;
                      const {
                        width: origW,
                        height: origH
                      } = event.image.asset.metadata.dimensions;
                      src = url;
                      targetWidth = Math.round((origW / origH) * targetHeight);
                    }
                    return (
                      <SwiperSlide key={event._id}>
                        <div className={styles.contentWrapper}>
                          <div className={styles.eventCard}>
                            <div className={styles.eventImageWrapper}>
                              {event.image?.asset ? (
                                <Image
                                  src={event.image.asset.url}
                                  alt={event.title}
                                  fill
                                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                                  priority
                                />
                              ) : (
                                <div className={styles.noImage} />
                              )}
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

                {/* Arrow Buttons Only (no bullets) */}
                <div className={styles.paginationWrapper}>
                  <button id="list-prev" className={styles.arrowButton}>‹</button>
                  <button id="list-next" className={styles.arrowButton}>›</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* PRIVATE EVENT INQUIRY */}
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
                formType="eventInquiry"
                to="chris@935ocean.com"
                subject="New Event Inquiry"
                buttonText="Submit Inquiry"
                className={styles.inquiryForm}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date</label>
                  <input id="eventDate" name="eventDate" type="date" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type</label>
                  <select id="eventType" name="eventType" required>
                    <option value="">Select Type</option>
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="numberOfGuests">Number of Guests</label>
                  <input id="numberOfGuests" name="numberOfGuests" type="number" />
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
  const query = `*[_type == "event" && date >= now()] 
  | order(date asc)[0...100] {
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
