import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { VideoPlayer, ImgWithSkeleton } from '../components/Shared';

export default function ProjectDetails() {
  const { t, projects } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const activeProject = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!activeProject) {
    return (
      <main className="portfolio-container showcase-view">
        <h1 style={{ color: 'var(--fg)' }}>Projet introuvable</h1>
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
        {activeProject.tech.map(tech => (
          <span key={tech} className="showcase-tech-badge">{tech}</span>
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
        <button className="btn-back" onClick={() => navigate('/')}>
          {t.backToPortfolio}
        </button>
        <p>&copy; {new Date().getFullYear()} Tigran Matinyan. {t.rightsReserved} | {t.hostedOnAws}</p>
      </footer>
    </main>
  );
}
