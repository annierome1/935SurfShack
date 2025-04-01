import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import styles from '../styles/components/events.module.css';
import { client } from '../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Events({ events }) {
  const [view, setView] = useState('list'); // 'calendar' or 'list'

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Live Music & Events</h1>

        {/* View Toggle */}
        <div className={styles.toggle}>
          <button
            onClick={() => setView('calendar')}
            className={view === 'calendar' ? styles.active : ''}
          >
            View Calendar
          </button>
          <span> | </span>
          <button
            onClick={() => setView('list')}
            className={view === 'list' ? styles.active : ''}
          >
            View List
          </button>
        </div>

        {/* View: Calendar or List */}
        {view === 'calendar' ? (
          <CalendarView events={events} />
        ) : (
          <div className={styles.eventsList}>
            {events.map((event) => (
              <div key={event._id} className={styles.eventCard}>
                {event.image && (
                  <div className={styles.eventImageWrapper}>
                    <Image
                      src={urlFor(event.image).width(800).height(500).url()}
                      alt={event.title}
                      className={styles.eventImage}
                      width={800}
                      height={500}
                      priority
                    />
                  </div>
                )}
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
      </div>
    </Layout>
  );
}

// Fetch from Sanity
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
    revalidate: 60, // ISR: refresh every minute
  };
}
