import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from '../styles/components/calendarView.module.css';

export default function CalendarView({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const eventsOnDate = events.filter(event => {
    const eventDate = new Date(event.date).toDateString();
    return new Date(selectedDate).toDateString() === eventDate;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendarWrapper}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => {
            const isEventDate = events.some(
            (event) => new Date(event.date).toDateString() === date.toDateString()
            );
            return isEventDate ? styles.eventDay : null;
        }}
        tileContent={({ date }) => {
            const event = events.find(
              (event) => new Date(event.date).toDateString() === date.toDateString()
            );
            return event ? (
              <div className={styles.dot} title={event.title}></div>
            ) : null;
          }}
          
        />



      <div className={styles.eventList}>
        {eventsOnDate.length > 0 ? (
          eventsOnDate.map((event) => (
            <div key={event._id} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events on this day.</p>
        )}
      </div>
    </div>
    </div>
  );
}
