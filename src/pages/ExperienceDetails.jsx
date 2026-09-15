import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { VideoPlayer, ImgWithSkeleton } from '../components/Shared';

export default function ExperienceDetails() {
  const { t, experiences } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const activeExperience = experiences.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!activeExperience) {
    return (
      <main className="portfolio-container showcase-view">
        <h1 style={{ color: 'var(--fg)' }}>Expérience introuvable</h1>
        <button className="btn-back" onClick={() => navigate('/')}>
          {t.backToPortfolio}
        </button>
      </main>
    );
  }

  return (
    <main className="portfolio-container showcase-view">
      <button className="btn-back" onClick={() => navigate('/')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t.backToExperiences}
      </button>

      <header className="showcase-header">
        <h1 className="showcase-title">{activeExperience.role}</h1>
        <p className="profile-role">{activeExperience.company}</p>
        <p className="showcase-date">{activeExperience.dates} {activeExperience.badge && `• ${activeExperience.badge}`}</p>
      </header>

      {activeExperience.details?.quote && (
        <div className="showcase-quote-box">
          <svg className="showcase-quote-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p className="showcase-quote-text">{activeExperience.details.quote}</p>
        </div>
      )}

      {activeExperience.details?.summary && (
        <section className="showcase-section">
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: '1.7' }}>
            {activeExperience.details.summary}
          </p>
        </section>
      )}

      {/* Media Showcase Grid */}
      {activeExperience.details?.media && (
        <section className="showcase-section">
          <h2 className="showcase-section-title">Galerie & Démonstrations</h2>
          <div className="video-showcase-grid">
            {activeExperience.details.media.map((item, index) => (
              <div key={index} className="video-item-block">
                <div className="video-item-header">
                  <h3 className="video-item-title">{item.title}</h3>
                  <p className="video-item-desc">{item.desc}</p>
                </div>
                {item.type === 'video' ? (
                  <VideoPlayer src={item.src} title={item.title} />
                ) : (
                  <ImgWithSkeleton
                    src={item.src}
                    alt={item.title}
                    className="showcase-hero-img"
                    wrapperClassName="showcase-hero-img-wrapper"
                    style={{
                      marginTop: '0.75rem',
                      maxHeight: '420px',
                      objectFit: 'contain',
                      transform: item.flip ? 'scaleX(-1)' : 'none'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {activeExperience.details?.highlights && (
        <section className="showcase-section">
          <h2 className="showcase-section-title">{t.keyFeatures}</h2>
          <ul className="showcase-highlights">
            {activeExperience.details.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="footer">
        <button className="btn-back" onClick={() => navigate('/')}>
          {t.backToPortfolio}
        </button>
        <p>&copy; {new Date().getFullYear()} Tigran Matinyan. {t.rightsReserved} | {t.hostedOnAws}</p>
      </footer>
    </main>
  );
}
