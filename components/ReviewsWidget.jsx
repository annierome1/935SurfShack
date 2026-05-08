import { useState, useEffect } from 'react';
import styles from '../styles/components/ReviewsWidget.module.css';

export default function ReviewsWidget() {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const prevReview = () => setIndex((i) => (i > 0 ? i - 1 : reviews.length - 1));
  const nextReview = () => setIndex((i) => (i < reviews.length - 1 ? i + 1 : 0));

  const current = reviews[index] || {};

  return (
    <>
      {!open && (
        <button
          className={styles.toggle}
          aria-label="Open reviews"
          onClick={() => setOpen(true)}
        >
          Reviews
        </button>
      )}

      <aside className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {open && (
          <button
            className={styles.close}
            aria-label="Close reviews"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        )}
        {loading && <p className={styles.msg}>Loading reviews&hellip;</p>}
        {error && <p className={styles.msg}>Failed to load reviews.</p>}
        {!loading && !error && reviews.length > 0 && (
          <div className={styles.carousel}>
            <button className={`${styles.nav} ${styles.prev}`} onClick={prevReview} aria-label="Previous review">
              &lsaquo;
            </button>
            <div className={styles.content}>
              <p className={styles.text}>&ldquo;{current.text}&rdquo;</p>
              <footer className={styles.footer}>
                &mdash; {current.author_name}, <span className={styles.rating}>{current.rating}&#9733;</span>
              </footer>
            </div>
            <button className={`${styles.nav} ${styles.next}`} onClick={nextReview} aria-label="Next review">
              &rsaquo;
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
