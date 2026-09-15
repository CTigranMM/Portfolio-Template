import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translations';

// Dedicated VideoPlayer component ensuring smooth HTML5 playback
function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
  }, [src]);

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls
        preload="auto"
        className="video-element"
        title={title}
      >
        <source src={src} type="video/mp4" />
        Votre navigateur ne prend pas en charge les vidéos HTML5.
      </video>
    </div>
  );
}

// Component for images with skeleton loading state
function ImgWithSkeleton({ src, alt, className, wrapperClassName, fallbackImage, style }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <div className={`${wrapperClassName || ''} ${loaded || error ? '' : 'skeleton-loader'}`}>
      <img
        src={error && fallbackImage ? fallbackImage : src}
        alt={alt}
        className={className}
        style={{ ...style, opacity: loaded || error ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error && fallbackImage) {
            setError(true);
          } else {
            setLoaded(true);
          }
        }}
      />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [activeProject, setActiveProject] = useState(null);
  const [activeExperience, setActiveExperience] = useState(null);
  const savedScrollPos = useRef(0);

  const openProject = (project) => {
    savedScrollPos.current = window.scrollY;
    setActiveProject(project);
  };

  const openExperience = (exp) => {
    savedScrollPos.current = window.scrollY;
    setActiveExperience(exp);
  };

  const closeShowcase = () => {
    setActiveProject(null);
    setActiveExperience(null);
  };

  // Handle scroll position when switching views
  useEffect(() => {
    if (activeProject || activeExperience) {
      // We opened a showcase view, scroll to top
      window.scrollTo(0, 0);
    } else {
      // We returned to the main portfolio view, restore scroll position after layout
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollPos.current);
      });
    }
  }, [activeProject, activeExperience]);

  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lang');
        if (saved === 'fr' || saved === 'en') return saved;
      } catch (e) {
        console.warn('localStorage not accessible:', e);
      }
      const browserLang = (navigator && navigator.language) || 'en';
      return browserLang.startsWith('en') ? 'en' : 'fr';
    }
    return 'fr';
  });

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      console.warn('localStorage not accessible:', e);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const t = translations[lang].ui;
  const techStack = translations[lang].techStack;
  const hobbies = translations[lang].hobbies;
  const projects = translations[lang].projects;
  const experiences = translations[lang].experiences;
  const education = translations[lang].education;


  // If project is clicked, render Product Showcase View Page
  if (activeProject) {
    return (
      <main className="portfolio-container showcase-view">
        <button className="btn-back" onClick={closeShowcase}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t.backToProjects}
        </button>

        <header className="showcase-header">
          <h1 className="showcase-title">{activeProject.title}</h1>
          <p className="profile-role">{activeProject.subtitle}</p>
          <p className="showcase-date">{activeProject.date} {activeProject.scoreBadge && `• ${activeProject.scoreBadge}`}</p>
        </header>

        <ImgWithSkeleton
          src={activeProject.image}
          alt={activeProject.title}
          className="showcase-hero-img"
          wrapperClassName="showcase-hero-img-wrapper"
          fallbackImage={activeProject.fallbackImage}
        />

        <div className="showcase-tech-list">
          {activeProject.tech.map(t => (
            <span key={t} className="showcase-tech-badge">{t}</span>
          ))}
        </div>

        {/* GitHub Classroom Lost Code Notice */}
        {(activeProject.id === 'station-meteo' || activeProject.id === 'app-collab') && (
          <div className="showcase-disclaimer" style={{ marginTop: '1.25rem', marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>
              <strong>{t.sourceCodeNote}</strong> {t.sourceCodeNoteDesc}
            </span>
          </div>
        )}

        {/* Sprint Scores Section (Luxurious Minimalist Style) */}
        {activeProject.sprints && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">{t.sprintEval}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
              {t.sprintDesc}
            </p>
            <div className="sprints-container">
              {activeProject.sprints.map((sprint, i) => (
                <div key={i} className="sprint-row-item">
                  <div className="sprint-row-info">
                    <span className="sprint-row-title">{sprint.name}</span>
                    <span className="sprint-row-desc">{sprint.desc}</span>
                  </div>
                  <span className="sprint-row-badge">{sprint.score}</span>
                </div>
              ))}
            </div>
            <div className="sprint-summary-banner">
              <span className="sprint-summary-label">{t.globalScore}</span>
              <span className="sprint-summary-value">90.00% (Rang #1 • 28 pts de la note finale)</span>
            </div>
          </section>
        )}

        {/* Video Showcase Section */}
        {activeProject.videos && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">{t.videoDemos}</h2>
            
            <div className="showcase-disclaimer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>
                <strong>{t.envWarning}</strong> {t.envWarningDesc}
              </span>
            </div>

            <div className="video-showcase-grid">
              {activeProject.videos.map(video => (
                <div key={video.id} className="video-item-block">
                  <div className="video-item-header">
                    <h3 className="video-item-title">{video.title}</h3>
                    <p className="video-item-desc">{video.desc}</p>
                  </div>
                  <VideoPlayer src={video.src} title={video.title} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Wiring Diagram Section */}
        {activeProject.wiringImage && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">{t.wiringDiagram}</h2>
            <div className="showcase-wiring-layout">
              <ImgWithSkeleton
                src={activeProject.wiringImage}
                alt="Schéma de câblage de la station météo"
                className="showcase-wiring-img"
                wrapperClassName="showcase-wiring-img-wrapper"
              />
              <div className="showcase-wiring-text">
                <p>
                  {t.wiringDesc1}<strong>Tkinter Python UI</strong>{t.wiringDesc2}<strong>threads Python</strong>{t.wiringDesc3}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Key Features & Architecture Breakdown */}
        <section className="showcase-section">
          <h2 className="showcase-section-title">Architecture & Composants Clés</h2>
          <div className="feature-cards-grid" style={{ marginBottom: '1.5rem' }}>
            {activeProject.id === 'agence-abc' && (
              <>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    Paiement PayPal API
                  </h3>
                  <p className="feature-detail-desc">
                    Paiement sécurisé direct via l'API PayPal pour les transactions de forfaits touristiques.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                    Client Desktop Java POO
                  </h3>
                  <p className="feature-detail-desc">
                    Interface d'administration Java avec authentification JWT pour la gestion directe de la base MongoDB.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18" height="11" x="3" y="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    API REST & Auth JWT
                  </h3>
                  <p className="feature-detail-desc">
                    Communication unifiée entre les clients Web React, Desktop Java et la base de données MongoDB.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    Infrastructure Azure Cloud
                  </h3>
                  <p className="feature-detail-desc">
                    Déploiement et hébergement des services web et de l'API sur Azure App Service.
                  </p>
                </div>
              </>
            )}

            {activeProject.id === 'duck-hunt' && (
              <>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18" height="14" x="3" y="3" rx="2" />
                      <path d="M7 21h10M12 17v4" />
                    </svg>
                    Architecture MVC & FXML
                  </h3>
                  <p className="feature-detail-desc">
                    Séparation stricte entre les vues FXML stylisées en CSS, les modèles de données et la logique d'affaires.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                      <path d="M18 8l4 4-4 4M10 12h12" />
                    </svg>
                    Réseau Client / Serveur
                  </h3>
                  <p className="feature-detail-desc">
                    Protocoles de communication réseau et échange de payloads structurés (JSON / XML) entre client et serveur.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Animations 2D & Game Loop
                  </h3>
                  <p className="feature-detail-desc">
                    Rendu graphique 2D sur Canvas JavaFX avec animations fluides et patron Observer réactif.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Internationalisation (i18n)
                  </h3>
                  <p className="feature-detail-desc">
                    Support multi-langues complet, contrôles personnalisés et mise en page réactive dynamique.
                  </p>
                </div>
              </>
            )}

            {activeProject.id === 'station-meteo' && (
              <>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18" height="14" x="3" y="3" rx="2" />
                      <path d="M7 21h10M12 17v4" />
                    </svg>
                    Interface Tkinter & Threads Python
                  </h3>
                  <p className="feature-detail-desc">
                    Interface graphique Tkinter fluide utilisant des threads Python indépendants pour l'actualisation en continu des métriques sans blocage d'IHM.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Contrôle des Composants Électriques
                  </h3>
                  <p className="feature-detail-desc">
                    Pilotage matériel direct : convertisseur ADC I2C (luminosité), capteurs de température/humidité et affichage sur écran LCD.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                    Base SQLite Persistante
                  </h3>
                  <p className="feature-detail-desc">
                    Persistance locale et journalisation structurée des métriques météo pour le suivi temporel.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="14" height="20" x="5" y="2" rx="2" />
                      <line x1="12" x2="12.01" y1="18" y2="18" />
                    </svg>
                    Raspberry Pi 5 & SSH
                  </h3>
                  <p className="feature-detail-desc">
                    Hébergement autonome du système embarqué et gestion d'administration distante sécurisée via SSH.
                  </p>
                </div>
              </>
            )}

            {activeProject.id === 'app-collab' && (
              <>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    Tremplin MERN & Origine d'Agence ABC
                  </h3>
                  <p className="feature-detail-desc">
                    Projet fondateur d'apprentissage du stack MERN (MongoDB, Express, React, Node) ayant préparé les compétences pour Agence ABC.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18" height="11" x="3" y="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    API REST & Auth JWT
                  </h3>
                  <p className="feature-detail-desc">
                    Modélisation RESTful d'endpoints sécurisés par jetons d'authentification JWT et synchronisation de données MongoDB.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    Déploiement Cloud Vercel
                  </h3>
                  <p className="feature-detail-desc">
                    Déploiement continu et hébergement web sur Vercel (plateforme beginner-friendly), comparativement à Azure sur Agence ABC.
                  </p>
                </div>
                <div className="feature-detail-card">
                  <h3 className="feature-detail-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Workflow Git Collaboratif
                  </h3>
                  <p className="feature-detail-desc">
                    Développement d'équipe structuré sous Git / GitHub avec gestion de branches, revues de code et résolution de conflits.
                  </p>
                </div>
              </>
            )}
          </div>

          <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg)', marginBottom: '0.5rem' }}>Détails d'implémentation :</h3>
          <ul className="showcase-highlights">
            {activeProject.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <button className="btn-back" onClick={closeShowcase}>
            {t.backToPortfolio}
          </button>
          <p>&copy; {new Date().getFullYear()} Tigran Matinyan. {t.rightsReserved} | {t.hostedOnAws}</p>
        </footer>
      </main>
    );
  }

  // If experience is clicked, render Experience Showcase View Page
  if (activeExperience) {
    return (
      <main className="portfolio-container showcase-view">
        <button className="btn-back" onClick={closeShowcase}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux expériences
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
          <button className="btn-back" onClick={closeShowcase}>
            {t.backToPortfolio}
          </button>
          <p>&copy; {new Date().getFullYear()} Tigran Matinyan. {t.rightsReserved} | {t.hostedOnAws}</p>
        </footer>
      </main>
    );
  }

  // Standard Portfolio View
  return (
    <main className="portfolio-container">
      {/* Top Header Row with Theme Toggle */}
      <div className="header-profile">
        <div>
          <h1 className="profile-name">Tigran Matinyan</h1>
          <p className="profile-role">{t.role}</p>
          <p className="profile-location">{t.location}</p>
          <p className="profile-bio">{t.bio}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="theme-toggle-btn"
            title={`Switch to ${lang === 'fr' ? 'English' : 'Français'}`}
            style={{ fontWeight: 600, fontSize: '0.85rem' }}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Actions & Contact Bar */}
      <div className="actions-row">
        <a
          href={t.cvFile}
          download="CV-TigranMatinyan.pdf"
          className="btn-resume"
          style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          {t.downloadCv}
        </a>
        <a
          href="mailto:tigrannmatinyan@icloud.com"
          className="btn-resume"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {t.contactMe}
        </a>

        <a
          href="tel:14383731919"
          className="contact-pill"
          title="Appeler Tigran Matinyan"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>+1 (438) 373-1919</span>
        </a>

        <a
          href="https://www.linkedin.com/in/tigran-micheal-matinyan/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>

        <a
          href="https://github.com/CTigranMM"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>

      {/* Tech Stack Section */}
      <section className="section">
        <h2 className="section-title">{t.techSkills}</h2>
        <div className="tech-grid">
          {techStack.map(tech => (
            <div key={tech.name} className="tech-pill" data-tech={tech.techKey}>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <h2 className="section-title">{t.projectsTitle}</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card" onClick={() => openProject(project)}>
              <ImgWithSkeleton
                src={project.image}
                alt={project.title}
                className="project-img"
                wrapperClassName="project-img-wrapper"
                fallbackImage={project.fallbackImage}
              />
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-link-icon" title="Ouvrir la vitrine du produit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </span>
              </div>
              <p className="project-desc">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="section">
        <h2 className="section-title">{t.experienceTitle}</h2>
        <div className="timeline-list">
          {experiences.map(exp => (
            <div key={exp.company + exp.role} className="timeline-item">
              <div>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-company">{exp.company}</p>
                <ul className="timeline-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {exp.details && (
                  <button
                    className="btn-learn-more"
                    onClick={() => openExperience(exp)}
                  >
                    {t.learnMore}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
              <span className="timeline-date">{exp.dates}</span>
            </div>
          ))}
        </div>
      </section>


      {/* Education Section */}
      <section className="section">
        <h2 className="section-title">{t.educationTitle}</h2>
        <div className="timeline-list">
          {education.map(edu => (
            <div key={edu.institution} className="timeline-item">
              <div>
                <p className="timeline-role">{edu.institution}</p>
                <p className="timeline-company">{edu.degree} • {edu.location}</p>
                {edu.details && <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{edu.details}</p>}
              </div>
              {edu.dates && <span className="timeline-date">{edu.dates}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="section" id="hobbies">
        <h2 className="section-title">{t.hobbiesTitle}</h2>
        <div className="tech-grid">
          {hobbies.map(hobby => (
            <div key={hobby.name} className="tech-pill" data-tech={hobby.techKey}>
              {hobby.name}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <h2 className="section-title">{t.contactTitle}</h2>
        <div className="contact-cards-grid">
          <a href="mailto:tigrannmatinyan@icloud.com" className="contact-card">
            <div className="contact-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span className="contact-card-label">{t.email}</span>
              <span className="contact-card-value">tigrannmatinyan@icloud.com</span>
            </div>
          </a>

          <a href="tel:14383731919" className="contact-card">
            <div className="contact-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <span className="contact-card-label">{t.phone}</span>
              <span className="contact-card-value">+1 (438) 373-1919</span>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/tigran-micheal-matinyan/" target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            <div>
              <span className="contact-card-label">LinkedIn</span>
              <span className="contact-card-value">Tigran Micheal Matinyan</span>
            </div>
          </a>

          <a href="https://github.com/CTigranMM" target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <span className="contact-card-label">GitHub</span>
              <span className="contact-card-value">CTigranMM</span>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <nav className="footer-nav">
          <a href="#projects">Projets</a>
          <a href="https://www.linkedin.com/in/tigran-micheal-matinyan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/CTigranMM" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:tigrannmatinyan@icloud.com">{t.email}</a>
          <a href="tel:14383731919">+1 (438) 373-1919</a>
        </nav>
        <p>&copy; {new Date().getFullYear()} Tigran Matinyan. {t.rightsReserved} | {t.hostedOnAws}</p>
      </footer>
    </main>
  );
}
