import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/reels.css'

const getVideoSrc = (item) => item.videoUrl || item.video || item.src || '';

// ── Icons ──
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const SavedNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const ReelFeed = ({ items = [], onLike = () => {}, onSave = () => {}, onComment = () => {}, onDelete = () => {}, currentUser = null, emptyMessage = 'No items' }) => {
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, items.length);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: [0.45, 0.75] }
    );

    videoRefs.current.forEach((v) => v && obs.observe(v));
    return () => obs.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return (
      <div className="reels-container reels-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="reels-wrapper">
      <div className="reels-container">
        {items.map((item, idx) => (
          <section className="reel" key={item._id || idx}>
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              className="reel-video"
              src={getVideoSrc(item)}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* ── Right Action Bar ── */}
            <div className="reel-actions">
              <div className="action-wrap">
                <button className="action-btn" onClick={() => onLike(item)}>
                  <HeartIcon />
                </button>
                <span className="action-count">{item.likeCount || 0}</span>
              </div>

              <div className="action-wrap">
                <button className="action-btn" onClick={() => onSave(item)}>
                  <BookmarkIcon />
                </button>
                <span className="action-count">{item.savesCount || 0}</span>
              </div>

              <div className="action-wrap">
                <button className="action-btn" onClick={() => onComment(item)}>
                  <CommentIcon />
                </button>
                <span className="action-count">{item.commentCount || 0}</span>
              </div>
            </div>

            {/* ── Bottom Overlay ── */}
            <div className="overlay">
              <p className="description">{item.description || item.desc || item.title || ''}</p>
              <a className="visit-btn" href={`/food-partner/profile/${item.foodPartner}`}>
                Visit store
              </a>
            </div>
          </section>
        ))}
      </div>

      {/* ── Bottom Navigation ── */}
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate('/home')}>
          <HomeIcon />
          <span>home</span>
        </button>
        <button className="nav-btn" onClick={() => navigate('/saved')}>
          <SavedNavIcon />
          <span>saved</span>
        </button>
      </nav>
    </div>
  );
};

export default ReelFeed;
