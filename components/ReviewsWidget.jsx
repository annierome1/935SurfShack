import { useState, useEffect } from 'react';

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
      className="toggle"
      aria-label="Open reviews"
      onClick={() => setOpen(true)}
    >
       Reviews
    </button>
  )}

  <aside className={open ? 'drawer open' : 'drawer'}>
    {open && (
      <button
        className="close"
        aria-label="Close reviews"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>
    )}
    {loading && <p className="msg">Loading reviews…</p>}
    {error && <p className="msg">Failed to load reviews.</p>}
    {!loading && !error && reviews.length > 0 && (
      <div className="carousel">
        <button className="nav prev" onClick={prevReview} aria-label="Previous review">‹</button>
        <div className="content">
          <p className="text">“{current.text}”</p>
          <footer className="footer">
            — {current.author_name}, <strong>{current.rating}★</strong>
          </footer>
        </div>
        <button className="nav next" onClick={nextReview} aria-label="Next review">›</button>
      </div>
    )}
  </aside>

  <style jsx>{`
    .toggle {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      padding: 0.75rem 1.25rem;
      background: #f5877a;
      color: white;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1),
              0 4px 8px rgba(0,0,0,0.1);
      border-radius: 6px;
      cursor: pointer;
      z-index: 1001;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro","Segoe UI", Roboto, sans-serif;
      
    }
    .drawer {
    position: fixed;
    bottom: 1rem;
    right: -370px;
    width: 370px;
    height: 50%;
    background: linear-gradient(135deg, #f5877a 0%, #f8cdda 100%);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
    padding: 2rem 1rem;
    overflow-y: auto;
    transition: right 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end !important;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro","Segoe UI", Roboto, sans-serif;
    border-radius: 16px;
  }
    .drawer.open {
      right: 0;
    }
    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #f5877a;
      cursor: pointer;
      z-index: 1002;
    }
    .msg {
      text-align: center;
      color: #555;
    }
    .carousel {
      display: flex;
      align-items: center;
    }
     .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    padding: 0 0.5rem;
    cursor: pointer;
    color: #f5877a;
    z-index: 2;
  }
  .prev {
    left: 0.5rem;
  }
  .next {
    right: 0.5rem;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* horizontally center */
    text-align: center;
    padding: 0 2.5rem; /* add padding so text isn't behind arrows */
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow-y: auto;
  }
    .text {
      margin: 0 0 0.5rem;
      font-size: 0.9rem;
      line-height: 1.4;
      color: #333;
    }
    .footer {
      font-size: 0.8rem;
      color: #555;
    }
    .footer strong { color: #f5877c; }
    .drawer {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1),
              0 4px 8px rgba(0,0,0,0.1);
}
.drawer::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 6px;
  background: #f5877a;
  border-radius: 4px 4px 0 0;
}
.closeX {
  color: #777;
}
.nav {
  color: #f5877a;
}
  `}</style>
</>

  );
}
