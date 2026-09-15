import React, { useState, useEffect, useRef } from 'react';
import checkoutVideo from './assets/CheckoutDEMOAgence.mp4';
import restVideo from './assets/RESTDEMOAgence.mp4';
import agenceGif from './assets/agence_abc.gif';
import duckHuntGif from './assets/duck_hunt.gif';
import meteoModuleImg from './assets/meteomodule.png';
import meteoWiringImg from './assets/MeteoWiring.jpg';
import collabMaquetteImg from './assets/MaquetteCollaboration.png';
import benevoleImg from './assets/Benevole.jpeg';
import carplayImg from './assets/appleCarplay.jpeg';
import carVideo from './assets/car.mp4';

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
  const [activeExperience, setActiveExperience] = useState(null);

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
      subtitle: 'Interface Tkinter Python, Système Multi-Thread Embarqué IoT & Architecture MVC',
      date: 'Mai 2026',
      tech: ['Python', 'Tkinter UI', 'Multi-Threading', 'SQLite', 'Raspberry Pi 5', 'SSH', 'ADC/I2C'],
      image: meteoModuleImg,
      fallbackImage: '/assets/meteomodule.png',
      wiringImage: meteoWiringImg,
      scoreBadge: 'Projet IoT / Systèmes Embarqués',
      desc: 'Interface graphique Tkinter avec architecture MVC multi-threadée en Python pour le contrôle et la lecture en temps réel des composants électriques sur Raspberry Pi 5.',
      highlights: [
        "Interface Graphique Tkinter Python & Threads : Contrôle réactif des composants électriques et exécution multi-threadée pour la lecture simultanée des capteurs.",
        "Contrôle des Composants Électriques : Gestion matérielle et acquisition temps réel (convertisseur ADC I2C pour luminosité, sonde température/humidité, écran LCD).",
        "Conception MVC & Persistance SQLite : Modélisation Modèle-Vue-Contrôleur avec journalisation locale de l'historique météo en base SQLite.",
        "Montage & Câblage Électronique : Assemblage et câblage rigoureux des circuits électriques sur platine d'expérimentation (Breadboard) reliée au Raspberry Pi 5.",
        "Remarque sur le code source: Le dépôt et le code source de ce projet ne sont plus accessibles en raison de la fermeture/expiration de l'organisation GitHub Classroom du cours."
      ]
    },
    {
      id: 'app-collab',
      title: 'Application Web Collaborative (Stack MERN)',
      subtitle: 'Initiation au Stack MERN, API RESTful, Authentification JWT & Hébergement Vercel',
      date: 'Février 2026',
      tech: ['React.js', 'Express.js', 'MongoDB', 'Node.js', 'JWT Auth', 'REST API', 'Vercel', 'Git'],
      image: collabMaquetteImg,
      fallbackImage: '/assets/MaquetteCollaboration.png',
      scoreBadge: 'Projet Fondateur MERN',
      desc: "Projet pionnier d'initiation à l'architecture MERN (MongoDB, Express, React, Node) ayant servi de tremplin technique indispensable pour la réalisation ultérieure du projet Agence ABC.",
      highlights: [
        "Tremplin MERN & Fondation d'Agence ABC : Premier projet d'équipe ayant permis à la classe d'assimiler l'architecture MERN (MongoDB, Express, React, Node), posant les bases de compétences réutilisées sur l'Agence Touristique ABC.",
        "Architecture Full-Stack MERN : Structuration entre l'interface utilisateur React.js, l'API REST Express.js / Node.js et la base de données NoSQL MongoDB.",
        "Sécurité & Échanges REST : Développement d'endpoints RESTful et contrôle d'accès sécurisé par jetons d'authentification JWT (JSON Web Tokens).",
        "Déploiement Cloud Vercel : Hébergement continu sur la plateforme Vercel (solution accessible et beginner-friendly pour les projets MERN), comparativement à Microsoft Azure utilisé ultérieurement pour Agence ABC.",
        "Workflow Collaboratif Git : Travail d'équipe axé sur la gestion des branches Git, revues de code, pull requests et résolution de conflits.",
        "Remarque sur le code source: Tout comme la station météo, le dépôt et le code source de ce projet ne sont plus accessibles suite à l'expiration/fermeture de l'organisation GitHub Classroom du cours."
      ]
    }
  ];

  const experiences = [
    {
      id: 'auto-accessories',
      role: "Installateur indépendant d'accessoires automobiles",
      company: "Projet indépendant / Travailleur autonome • Laval, Qc",
      dates: "2025 -- Présent",
      badge: "Électronique Automobile 12V & Multimédia",
      bullets: [
        "Installation, raccordement électrique et intégration d'équipements électroniques (écrans multimédias Apple CarPlay, feux F1, éclairage DRL) sur véhicules.",
        "Diagnostic et test de circuits basse tension 12V à l'aide d'un multimètre pour un câblage propre et sécurisé.",
        "Gestion de la relation client : analyse des besoins, estimation des coûts et respect rigoureux des délais."
      ],
      details: {
        summary: "Travaux indépendants spécialisés dans le diagnostic, l'intégration et le raccordement électrique d'accessoires automobiles basse tension (12V) avec une finition propre de niveau d'origine.",
        highlights: [
          "Subaru Impreza 2016 : Installation, intégration de console et raccordement électrique complet d'une unité multimédia Apple CarPlay.",
          "Feux de freinage Style F1 : Montage et raccordement électrique de feux de freinage / anti-brouillard dynamiques style F1 (voir démonstration vidéo ci-dessous).",
          "Honda Accord 2018 : Installation d'un emblème lumineux dynamique Honda et intégration de feux de jour DRL / clignotants dynamiques sur rétroviseurs.",
          "Raccordement & Sécurité 12V : Tests au multimètre, diagnostic de circuits basse tension 12V et intégration soignée des faisceaux électriques."
        ],
        media: [
          {
            type: 'video',
            title: 'Feux de Freinage / Anti-Brouillard Style F1',
            desc: 'Démonstration du fonctionnement et du clignotement dynamique des feux style F1 installés.',
            src: carVideo
          },
          {
            type: 'image',
            title: 'Intégration Apple CarPlay — Subaru Impreza 2016',
            desc: 'Aperçu de l’intégration de l’unité multimédia Apple CarPlay et du câblage dans une Subaru Impreza 2016.',
            src: carplayImg
          }
        ]
      }
    },
    {
      id: 'benevole-obn',
      role: "Bénévole au Tournoi OBN (Tennis Canada)",
      company: "Expérience des fans • Montréal, Qc",
      dates: "Été 2026",
      badge: "Nommé Bénévole le Plus Enthusiast",
      bullets: [
        "Nommé le bénévole le plus enthousiaste du tournoi et qualifié de véritable source d'inspiration pour l'équipe par les capitaines.",
        "Animation des kiosques de jeux interactifs et distribution d'articles promotionnels auprès d'un grand volume de visiteurs.",
        "Accueil, orientation des fans et assistance opérationnelle sur le site pour assurer la fluidité des activités."
      ],
      details: {
        summary: "Engagement bénévole au prestigieux Omnium Banque Nationale (OBN) de Tennis Canada à Montréal, récompensé par la distinction du bénévole le plus enthousiaste et salué par la direction d'équipe.",
        quote: "J'ai eu l'honneur de servir comme bénévole au tournoi de Tennis Canada à Montréal (Omnium Banque Nationale). J'y ai été nommé le bénévole le plus enthousiaste et mes capitaines m'ont qualifié de véritable source d'inspiration pour les autres bénévoles.",
        highlights: [
          "Honneur au Tournoi OBN : Fierté et honneur d'avoir fait partie de l'équipe officielle de bénévoles lors du tournoi international de Tennis Canada à Montréal.",
          "Bénévole le Plus Enthousiaste : Récipiendaire de la mention d'honneur décernée au bénévole le plus enthousiaste du tournoi.",
          "Reconnaissance des Capitaines : Salué par les capitaines d'équipe comme une source d'inspiration constante pour l'ensemble des bénévoles du site.",
          "Animation & Service aux Fans : Accueil chaleureux des spectateurs, animation dynamique des jeux et gestion des flux sur le site du tournoi."
        ],
        media: [
          {
            type: 'image',
            title: 'Bénévole Officiel — Omnium Banque Nationale (Tennis Canada)',
            desc: 'Présence et implication sur le site du tournoi international de Tennis Canada à Montréal.',
            src: benevoleImg
          }
        ]
      }
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

        {/* GitHub Classroom Lost Code Notice */}
        {(activeProject.id === 'station-meteo' || activeProject.id === 'app-collab') && (
          <div className="showcase-disclaimer" style={{ marginTop: '1.25rem', marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>
              <strong>Note sur le code source :</strong> Le code source original de ce projet n'est plus accessible suite à l'expiration et à la fermeture de l'organisation GitHub Classroom du cours.
            </span>
          </div>
        )}

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

        {/* Wiring Diagram Section */}
        {activeProject.wiringImage && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">Schéma de Câblage Électronique & Hardware</h2>
            <div className="showcase-wiring-layout">
              <div className="showcase-wiring-img-wrapper">
                <img
                  src={activeProject.wiringImage}
                  alt="Schéma de câblage de la station météo"
                  className="showcase-wiring-img"
                />
              </div>
              <div className="showcase-wiring-text">
                <p>
                  Schéma complet du câblage et du raccordement des composants électriques (convertisseur ADC I2C, photo-résistance, capteurs température/humidité et écran LCD) reliés aux broches GPIO du Raspberry Pi 5. Le système s'appuie sur une interface graphique <strong>Tkinter Python UI</strong> et des <strong>threads Python</strong> pour contrôler et surveiller en temps réel chaque composant électrique sans bloquer l'interface.
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
          <button className="btn-back" onClick={() => setActiveProject(null)}>
            ← Retour au portfolio
          </button>
          <p>&copy; {new Date().getFullYear()} Tigran Matinyan. Tous droits réservés.</p>
        </footer>
      </main>
    );
  }

  // If experience is clicked, render Experience Showcase View Page
  if (activeExperience) {
    return (
      <main className="portfolio-container showcase-view">
        <button className="btn-back" onClick={() => setActiveExperience(null)}>
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
                    <div className="showcase-hero-img-wrapper" style={{ marginTop: '0.75rem' }}>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="showcase-hero-img"
                        style={{
                          maxHeight: '420px',
                          objectFit: 'contain',
                          transform: item.flip ? 'scaleX(-1)' : 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights Section */}
        {activeExperience.details?.highlights && (
          <section className="showcase-section">
            <h2 className="showcase-section-title">Points Saillants & Réalisations</h2>
            <ul className="showcase-highlights">
              {activeExperience.details.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        <footer className="footer">
          <button className="btn-back" onClick={() => setActiveExperience(null)}>
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

      {/* Actions & Contact Bar */}
      <div className="actions-row">
        <a
          href="mailto:tigrannmatinyan@icloud.com"
          className="btn-resume"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Me contacter
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
                {exp.details && (
                  <button
                    className="btn-learn-more"
                    onClick={() => setActiveExperience(exp)}
                  >
                    En savoir plus
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

      {/* Contact Section */}
      <section className="section" id="contact">
        <h2 className="section-title">Coordonnées & Réseaux</h2>
        <div className="contact-cards-grid">
          <a href="mailto:tigrannmatinyan@icloud.com" className="contact-card">
            <div className="contact-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span className="contact-card-label">Courriel</span>
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
              <span className="contact-card-label">Téléphone</span>
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
          <a href="mailto:tigrannmatinyan@icloud.com">Courriel</a>
          <a href="tel:14383731919">+1 (438) 373-1919</a>
        </nav>
        <p>&copy; {new Date().getFullYear()} Tigran Matinyan. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
