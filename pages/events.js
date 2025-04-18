// pages/events.js
import { use, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import styles from '../styles/components/events.module.css';
import { client } from '../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
// Images
import heroImage from '../public/images/performer.jpg';       // Hero banner up top
import privateEventImage from '../public/images/event.jpg'; // Private event image
import altImage1 from '../public/images/party1.jpg'
import altImage2 from '../public/images/party2.jpg'
import altImage3 from '../public/images/party3.jpg'
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export default function Events({ events }) {
  // Toggle state for Calendar or List view
  const [view, setView] = useState('calendar');

  //Submission state for event inquiry form
  const [submitting, setSubmitting] = useState(false);

  // Handler for the Inquiry form
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Unknown error');
      }

      alert('Thanks! We got your inquiry.');
      e.target.reset();
    } catch (err) {
      console.error('Inquiry error:', err);
      alert('Oops, something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

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


                  

        {/* =========================
            VIEW TOGGLE + EVENTS
         ========================= */}
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
          
          {/* Render Calendar or List */}
          {view === 'calendar' ? (
            // If you already have a CalendarView component, it might
            // display events in a grid with days of the week, etc.
            <CalendarView events={events} />
          ) : (
            <div className={styles.listContainer}>
              {events.map((event) => (
                <div key={event._id} className={styles.eventCard}>
                  {/* Event Image */}
                  {event.image && (
                    <div className={styles.eventImageWrapper}>
                      <Image
                        src={urlFor(event.image)
                          .width(800)
                          .height(500)
                          .fit('clip')  // Tells Sanity to scale down without cropping
                          .url()}
                        alt={event.title}
                        className={styles.eventImage}
                        width={800}
                        height={500}
                        objectFit = "cover"
                        layout='responsive'
                        objectPosition="top"
                        priority
                      />
                    </div>
                  )}
                  {/* Event Text Info */}
                  <div className={styles.eventContent}>
                    <h2 className={styles.eventTitle}>{event.title}</h2>
                    <p className={styles.eventDate}>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className={styles.eventDescription}>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================
            PRIVATE EVENT INQUIRY
         ========================= */}
        <section className={styles.privateEventSection}>
          <div className={styles.privateEventWrapper}>
            {/* Left Column: Image & Intro Text */}
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

            {/* Right Column: Inquiry Form */}
            <div className={styles.privateEventFormWrapper}>
              <h3 className={styles.inquiryFormTitle}>Event Inquiry</h3>
              <form
                className={styles.inquiryForm}
                onSubmit={handleInquirySubmit}
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
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Submit Inquiry'}
                </button>
              </form>
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
    image
  }`;
  const events = await client.fetch(query);

  return {
    props: { events },
    revalidate: 60, // refresh every minute (ISR)
  };
}
