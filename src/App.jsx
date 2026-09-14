import React, { useState, useEffect, useRef } from 'react';
import checkoutVideo from './assets/CheckoutDEMOAgence.mp4';
import restVideo from './assets/RESTDEMOAgence.mp4';
import agenceGif from './assets/agence_abc.gif';
import duckHuntGif from './assets/duck_hunt.gif';

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

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const techStack = [
    { name: 'JavaScript', techKey: 'javascript' },
    { name: 'TypeScript', techKey: 'typescript' },
    { name: 'Python', techKey: 'python' },
    { name: 'Java', techKey: 'java' },
    { name: 'C#', techKey: 'csharp' },
    { name: 'C++', techKey: 'cpp' },
    { name: 'SQL', techKey: 'sql' },
    { name: 'React', techKey: 'react' },
    { name: 'Express.js', techKey: 'express' },
    { name: 'Node.js', techKey: 'nodejs' },
    { name: 'MongoDB', techKey: 'mongodb' },
    { name: 'Azure', techKey: 'azure' }
  ];

  const projects = [
    {
      id: 'agence-abc',
      title: 'Agence Touristique ABC',
      subtitle: 'Application Web Full-Stack & Interface Java POO avec Déploiement Azure Cloud',
      date: 'Avril 2026',
      tech: ['React', 'Express.js', 'Java POO', 'JWT Auth', 'PayPal API', 'MongoDB', 'Azure App Service'],
      image: agenceGif,
      fallbackImage: '/assets/agence_abc.jpg',
      scoreBadge: '90% Note Finale (1re de la classe)',
      desc: "Projet récompensé par la meilleure note de la classe (90%). Intègre un paiement PayPal API, un client desktop Java POO avec authentification JWT, et une API REST Express déployée sur Azure.",
      isDetailed: true,
      sprints: [
        {
          name: 'Sprint 1 — Architecture & Diagrammes UML',
          score: '12.70 / 14 (90.71%)',
          desc: "Conception intégrale de l'architecture logicielle et modélisation complète des diagrammes UML (cas d'utilisation, classes, séquences)."
        },
        {
          name: 'Sprint 2 — Implémentation & Tests',
          score: '14.00 / 14 (100.00%)',
          desc: 'Phase d’implémentation, couverture de tests et livraison sans faille de toutes les fonctionnalités requises.'
        }
      ],
      highlights: [
        "Dépassement d'objectifs : L'évaluation visait uniquement la conformité des diagrammes fonctionnels, mais notre équipe a conçu un système complet de qualité industrielle.",
        "Module de paiement en ligne : Intégration directe de l'API PayPal pour le traitement sécurisé des transactions de réservations.",
        "Client Desktop Java POO : Application Java orientée objet permettant aux administrateurs de se connecter via JWT et de gérer directement la base MongoDB.",
        "Sécurité & API REST : Architecture RESTful Express.js avec contrôle d'accès unifié par jetons d'authentification JWT.",
        "Infrastructure Cloud Azure : Déploiement automatisé et hébergement continu sur Azure App Service."
      ],
      videos: [
        {
          id: 'checkout-demo',
          title: 'Module de Paiement — API PayPal',
          desc: 'Démonstration du flux de commande et du paiement sécurisé en direct via l’API PayPal.',
          src: checkoutVideo
        },
        {
          id: 'rest-demo',
          title: 'API REST & Synchronisation MongoDB',
          desc: 'Validation des échanges de données RESTful, des jetons JWT et des transactions en base de données.',
          src: restVideo
        }
      ]
    },
    {
      id: 'duck-hunt',
      title: 'Duck Hunt Arcade',
      subtitle: 'Architecture Client/Serveur, Patron MVC & Animations 2D JavaFX',
      date: '2026',
      tech: ['Java', 'JavaFX', 'FXML', 'Gradle', 'GitLab', 'CSS', 'JSON/XML'],
      image: duckHuntGif,
      fallbackImage: '/assets/duck_hunt.jpg',
      scoreBadge: 'Projet Client/Serveur JavaFX',
      desc: 'Jeu arcade 2D basé sur le patron MVC, avec architecture client-serveur (JSON/XML), animations 2D JavaFX et internationalisation (i18n).',
      highlights: [
        "Architecture MVC & Multi-Modèles : Séparation stricte entre l'interface FXML, les modèles de données concurrents et la logique d'affaires.",
        "Réseau Client/Serveur : Échanges de données structurés (JSON/XML) et protocoles de communication réseau entre les modules client et serveur.",
        "Patron Observer & Événements : Gestion réactive des événements UI, observation d'état et synchronisation temps réel entre modèles et vues.",
        "Graphiques 2D & Animations JavaFX : Rendu 2D dynamique sur Canvas, boucle de jeu (Game Loop) et interface declarative FXML stylisée en CSS.",
        "Composants Personnalisés & Internationalisation : Contrôles réutilisables, mise en page élastique réactive et support multi-langues (i18n).",
        "Tooling & Assurance Qualité : Gestion des versions et des branches sur GitLab avec Gradle, revue de code formelle et plan de tests de bogue."
      ]
    },
    {
      id: 'station-meteo',
      title: 'Station Météorologique Automatisée',
      subtitle: 'Système Embarqué IoT & Architecture MVC',
      date: 'Mai 2026',
      tech: ['Python', 'SQLite', 'Raspberry Pi 5', 'SSH', 'ADC/I2C'],
      image: '/assets/station_meteo.jpg',
      scoreBadge: 'Projet IoT / Systèmes Embarqués',
      desc: 'Architecture logicielle MVC multi-threadée pour la lecture de données météo en temps réel sur Raspberry Pi 5 avec persistance SQLite.',
      highlights: [
        "Conception de l'architecture logicielle selon le patron MVC (Modèle-Vue-Contrôleur) avec utilisation de threads pour la lecture en temps réel.",
        "Intégration logicielle de modules matériels: capteur de lumière (convertisseur ADC), température/humidité et écran LCD.",
        "Persistance des données avec SQLite et administration à distance sécurisée de l'environnement via SSH."
      ]
    },
    {
      id: 'app-collab',
      title: 'Application Web Collaborative',
      subtitle: 'Développement Agile & Workflow Git Avancé',
      date: 'Février 2026',
      tech: ['Git', 'GitHub', 'JavaScript', 'HTML5', 'CSS3'],
      image: '/assets/web_collab.jpg',
      scoreBadge: 'Projet Collaboratif',
      desc: "Co-développement d'une application web avec workflow Git rigoureux, gestion de branches, pull requests et résolution de conflits.",
      highlights: [
        "Co-développement d'une application web exigeant une excellente communication technique et une synchronisation constante.",
        "Utilisation rigoureuse de Git et GitHub pour le contrôle de version: gestion des branches, pull requests et résolution de conflits."
      ]
    }
  ];

  const experiences = [
    {
      role: "Installateur indépendant d'accessoires automobiles",
      company: "Projet indépendant / Travailleur autonome • Laval, Qc",
      dates: "2025 -- Présent",
      bullets: [
        "Installation, raccordement électrique et intégration d'équipements électroniques (écrans multimédias, barres d'éclairage, feux F1) sur véhicules.",
        "Diagnostic et test de circuits basse tension 12V à l'aide d'un multimètre pour un câblage propre et sécurisé.",
        "Gestion de la relation client : analyse des besoins, estimation des coûts et respect rigoureux des délais."
      ]
    },
    {
      role: "Bénévole au Tournoi OBN (Tennis Canada)",
      company: "Expérience des fans • Montréal, Qc",
      dates: "Été 2026",
      bullets: [
        "Animation des kiosques de jeux interactifs et distribution d'articles promotionnels auprès d'un grand volume de visiteurs.",
        "Assistance opérationnelle sur le site pour assurer la fluidité des activités et répondre rapidement aux imprévus.",
        "Accueil et interaction directe avec le public pour garantir une expérience dynamique et positive."
      ]
    }
  ];

  const education = [
    {
      institution: "Collège Montmorency",
      degree: "DEC en informatique -- Techniques de développement d'applications",
      location: "Laval, Qc",
      dates: "Août 2024 -- Décembre 2027",
      details: "Structures de données et algorithmes, POO, Développement web, Systèmes de bases de données, Réseaux et OS."
    },
    {
      institution: "Collège Citoyen",
      degree: "Diplôme d'études secondaires (Implication : Club de robotique)",
      location: "Laval, Qc",
      dates: ""
    }
  ];

  // If project is clicked, render Product Showcase View Page
  if (activeProject) {
    return (
      <main className="portfolio-container showcase-view">
        <button className="btn-back" onClick={() => setActiveProject(null)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux projets
        </button>

        <header className="showcase-header">
          <h1 className="showcase-title">{activeProject.title}</h1>
          <p className="profile-role">{activeProject.subtitle}</p>
          <p className="showcase-date">{activeProject.date} {activeProject.scoreBadge && `• ${activeProject.scoreBadge}`}</p>
        </header>

        <div className="showcase-hero-img-wrapper">
          <img
            src={activeProject.image}
            alt={activeProject.title}
            className="showcase-hero-img"
            onError={(e) => {
              if (activeProject.fallbackImage) {
                e.target.src = activeProject.fallbackImage;
              }
            }}
          />
        </div>

        <div className="showcase-tech-list">
          {activeProject.tech.map(t => (
            <span key={t} className="showcase-tech-badge">{t}</span>
          ))}
        </div>

        {/* Sprint Scores Section (Luxurious Minimalist Style) */}
        {activeProject.sprints && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">Évaluation des Sprints & Résultats</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
              Le mandat initial ciblait principalement l'élaboration de diagrammes fonctionnels. Notre équipe a fait le choix d'élever le projet au niveau d'une solution logicielle complète et prête au déploiement.
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
              <span className="sprint-summary-label">Note globale du projet</span>
              <span className="sprint-summary-value">90.00% (Rang #1 • 28 pts de la note finale)</span>
            </div>
          </section>
        )}

        {/* Video Showcase Section */}
        {activeProject.videos && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">Démonstrations Vidéo</h2>
            
            <div className="showcase-disclaimer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>
                <strong>Avertissement d'environnement :</strong> Les démonstrations vidéo ci-dessous ont été enregistrées localement. Pour l'évaluation finale du projet, l'infrastructure complète a été déployée et hébergée sur Microsoft Azure Services ; l'hébergement en ligne continu a été arrêté afin d'éviter l'épuisement inutile des crédits étudiants Azure.
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
          </div>

          <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg)', marginBottom: '0.5rem' }}>Détails d'implémentation :</h3>
          <ul className="showcase-highlights">
            {activeProject.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <button className="btn-back" onClick={() => setActiveProject(null)}>
            ← Retour au portfolio
          </button>
          <p>&copy; {new Date().getFullYear()} Tigran Matinyan. Tous droits réservés.</p>
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
          <p className="profile-role">Développeur Software & Full-Stack</p>
          <p className="profile-location">Laval (Québec), Canada</p>
          <p className="profile-bio">
            Étudiant en informatique passionné par la technologie, spécialisé en développement logiciel et web full-stack. 
            Objectif: devenir ingénieur informatique.
          </p>
        </div>
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

      {/* Actions Row */}
      <div className="actions-row">
        <a
          href="mailto:tigrannmatinyan@icloud.com"
          className="btn-resume"
        >
          Contact / Courriel
        </a>

        <a
          href="https://github.com/CTigranMM"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        <a
          href="mailto:tigrannmatinyan@icloud.com"
          className="social-link"
          aria-label="Email"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>

        <span style={{ fontSize: '0.875rem', color: 'var(--muted)', marginLeft: 'auto' }}>
          438 373-1919
        </span>
      </div>

      {/* Tech Stack Section */}
      <section className="section">
        <h2 className="section-title">Compétences Techniques</h2>
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
        <h2 className="section-title">Projets (Cliquer pour ouvrir la vitrine produit)</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card" onClick={() => setActiveProject(project)}>
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  onError={(e) => {
                    if (project.fallbackImage) {
                      e.target.src = project.fallbackImage;
                    }
                  }}
                />
              </div>
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
        <h2 className="section-title">Expérience et implication</h2>
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
              </div>
              <span className="timeline-date">{exp.dates}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="section">
        <h2 className="section-title">Formation</h2>
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

      {/* Footer */}
      <footer className="footer">
        <nav className="footer-nav">
          <a href="#projects">Projets</a>
          <a href="https://github.com/CTigranMM" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:tigrannmatinyan@icloud.com">Courriel</a>
        </nav>
        <p>&copy; {new Date().getFullYear()} Tigran Matinyan. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
