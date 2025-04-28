import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from '../styles/components/calendarView.module.scss';

export default function CalendarView({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter events matching the selected date
  const eventsOnDate = events.filter(event => {
    return new Date(event.date).toDateString() === new Date(selectedDate).toDateString();
  });

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        // Highlight days with events
        tileClassName={({ date }) => {
          const isEventDate = events.some(
            evt => new Date(evt.date).toDateString() === date.toDateString()
          );
          return isEventDate ? styles.eventDay : null;
        }}
        // Add a dot indicator with tooltip including time
        tileContent={({ date }) => {
          const event = events.find(
            evt => new Date(evt.date).toDateString() === date.toDateString()
          );
          return event ? (
            <div
              className={styles.dot}
              title={`${event.title} at ${new Date(event.date).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
              })}`}
            />
          ) : null;
        }}
      />

      <div className={styles.eventList}>
        {eventsOnDate.length > 0 ? (
          eventsOnDate.map(event => (
            <div key={event._id} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                {' at '}
                {new Date(event.date).toLocaleTimeString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events on this day.</p>
        )}
      </div>
    </div>
  );
}
