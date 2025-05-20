import { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import styles from '../styles/components/calendarView.module.scss';

export default function CalendarView({ events }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d;
  }, []);

  const futureEvents = useMemo(
    () => events.filter(evt => new Date(evt.date) >= today),
    [events, today]
  );

  const [selectedDate, setSelectedDate] = useState(today);
  const eventsOnDate = futureEvents.filter(evt =>
    new Date(evt.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}

        // disable any day before today
        minDate={today}
        tileDisabled={({ date }) => date < today}

        // highlight days that have a future event
        tileClassName={({ date }) => {
          return futureEvents.some(
            e => new Date(e.date).toDateString() === date.toDateString()
          ) ? styles.eventDay : null;
        }}

        // render a dot (with tooltip) for the first matching future event
        tileContent={({ date }) => {
          const ev = futureEvents.find(
            e => new Date(e.date).toDateString() === date.toDateString()
          );
          return ev ? (
            <div
              className={styles.dot}
              title={`${ev.title} at ${new Date(ev.date).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
              })}`}
            />
          ) : null;
        }}
      />

      <div className={styles.eventList}>
        {eventsOnDate.length > 0 ? (
          eventsOnDate.map(ev => (
            <div key={ev._id} className={styles.eventCard}>
              <h3>{ev.title}</h3>
              <p>
                {new Date(ev.date).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}{' '}
                at{' '}
                {new Date(ev.date).toLocaleTimeString(undefined, {
                  hour: 'numeric', minute: '2-digit'
                })}
              </p>
              <p>{ev.description}</p>
            </div>
          ))
        ) : (
          <p>No events on this day.</p>
        )}
      </div>
    </div>
  );
}
