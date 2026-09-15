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
import cvPdf from './assets/CV-TigranMatinyan.pdf';

export const translations = {
  fr: {
    ui: {
      role: "Développeur Software & Full-Stack",
      location: "Laval (Québec), Canada",
      bio: "Étudiant en informatique passionné par la technologie, spécialisé en développement logiciel et web full-stack. Toujours à la recherche de nouveaux défis et de solutions innovantes. Actuellement à la recherche d'un stage pour l'été 2027.",
      contactMe: "Me contacter",
      downloadCv: "Télécharger mon CV",
      cvFile: cvPdf,
      techSkills: "Compétences Techniques",
      projectsTitle: "Projets (Cliquer pour ouvrir la vitrine produit)",
      experienceTitle: "Expérience et implication",
      educationTitle: "Formation",
      contactTitle: "Coordonnées & Réseaux",
      hobbiesTitle: "En savoir plus sur moi (Loisirs)",
      backToPortfolio: "← Retour au portfolio",
      backToProjects: "Retour aux projets",
      backToExperiences: "Retour aux expériences",
      learnMore: "En savoir plus",
      sprintEval: "Évaluation des Sprints & Résultats",
      sprintDesc: "Le mandat initial ciblait principalement l'élaboration de diagrammes fonctionnels. Notre équipe a fait le choix d'élever le projet au niveau d'une solution logicielle complète et prête au déploiement.",
      globalScore: "Note globale du projet",
      videoDemos: "Démonstrations Vidéo",
      envWarning: "Avertissement d'environnement :",
      envWarningDesc: "Les démonstrations vidéo ci-dessous ont été enregistrées localement. Pour l'évaluation finale du projet, l'infrastructure complète a été déployée et hébergée sur Microsoft Azure Services ; l'hébergement en ligne continu a été arrêté afin d'éviter l'épuisement inutile des crédits étudiants Azure.",
      wiringDiagram: "Schéma de Câblage Électronique & Hardware",
      wiringDesc1: "Schéma complet du câblage et du raccordement des composants électriques (convertisseur ADC I2C, photo-résistance, capteurs température/humidité et écran LCD) reliés aux broches GPIO du Raspberry Pi 5. Le système s'appuie sur une interface graphique ",
      wiringDesc2: " et des ",
      wiringDesc3: " pour contrôler et surveiller en temps réel chaque composant électrique sans bloquer l'interface.",
      keyFeatures: "Fonctionnalités Clés & Architecture",
      sourceCodeNote: "Note sur le code source :",
      sourceCodeNoteDesc: "Le code source original de ce projet n'est plus accessible suite à l'expiration et à la fermeture de l'organisation GitHub Classroom du cours.",
      highlightsSectionTitle: "Points Saillants & Réalisations",
      email: "Courriel",
      phone: "Téléphone",
      rightsReserved: "Tous droits réservés.",
      hostedOnAws: "Hébergé sur AWS.",
      sourceCode: "Code source du site"
    },
    techStack: [
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
    ],
    hobbies: [
      { name: 'Création de jeux (Unity)', techKey: 'unity' },
      { name: 'Modélisation 3D (Blender)', techKey: 'blender' },
      { name: 'CAO / CAD (Fusion)', techKey: 'fusion' },
      { name: 'Design UX (Figma)', techKey: 'figma' },
      { name: 'Électronique', techKey: 'electronics' },
      { name: 'Matériel Informatique', techKey: 'hardware' },
      { name: 'Arts Martiaux Mixtes (MMA)', techKey: 'mma' },
      { name: 'Badminton', techKey: 'badminton' },
      { name: 'Tennis (Débutant)', techKey: 'tennis' },
      { name: 'Sports Motorisés', techKey: 'motorsport' },
      { name: 'Passionné d\'Auto (Petrolhead)', techKey: 'petrolhead' }
    ],
    projects: [
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
          "Montage & Câblage Électronique : Assemblage et câblage rigoureux des circuits électriques sur platine d'expérimentation (Breadboard) reliée au Raspberry Pi 5."
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
          "Déploiement Cloud Vercel : Hébergement continu sur la plateforme Vercel (solution accessible et beginner-friendly pour les projets MERN).",
          "Workflow Collaboratif Git : Travail d'équipe axé sur la gestion des branches Git, revues de code, pull requests et résolution de conflits."
        ]
      }
    ],
    experiences: [
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
            "Feux de freinage Style F1 : Montage et raccordement électrique de feux de freinage / anti-brouillard dynamiques style F1.",
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
        badge: "Nommé Bénévole le Plus Enthousiaste",
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
    ],
    education: [
      {
        institution: "Collège Montmorency",
        degree: "DEC en informatique — Techniques de développement d'applications",
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
    ]
  },
  en: {
    ui: {
      role: "Software & Full-Stack Developer",
      location: "Laval (Quebec), Canada",
      bio: "Computer science student passionate about technology, specializing in software and full-stack web development. Always looking for new challenges and innovative solutions. Currently seeking an internship for Summer 2027.",
      contactMe: "Contact Me",
      downloadCv: "Download my CV",
      cvFile: cvPdf,
      techSkills: "Technical Skills",
      projectsTitle: "Projects (Click to open product showcase)",
      experienceTitle: "Experience & Involvement",
      educationTitle: "Education",
      contactTitle: "Contact & Links",
      hobbiesTitle: "More about me (Hobbies)",
      backToPortfolio: "← Back to portfolio",
      backToProjects: "Back to projects",
      backToExperiences: "Back to experiences",
      learnMore: "Learn more",
      sprintEval: "Sprint Evaluation & Results",
      sprintDesc: "The initial mandate focused mainly on developing functional diagrams. Our team chose to elevate the project to a complete, deployment-ready software solution.",
      globalScore: "Overall Project Score",
      videoDemos: "Video Demonstrations",
      envWarning: "Environment Warning:",
      envWarningDesc: "The video demonstrations below were recorded locally. For the final project evaluation, the complete infrastructure was deployed and hosted on Microsoft Azure Services; continuous online hosting was stopped to prevent unnecessary depletion of Azure student credits.",
      wiringDiagram: "Electronic & Hardware Wiring Diagram",
      wiringDesc1: "Complete diagram of the wiring and connection of electrical components (I2C ADC converter, photoresistor, temperature/humidity sensors, and LCD screen) connected to the GPIO pins of the Raspberry Pi 5. The system relies on a ",
      wiringDesc2: " graphical interface and ",
      wiringDesc3: " to control and monitor each electrical component in real-time without blocking the interface.",
      keyFeatures: "Key Features & Architecture",
      sourceCodeNote: "Source code note:",
      sourceCodeNoteDesc: "The original source code for this project is no longer accessible following the expiration and closure of the course's GitHub Classroom organization.",
      highlightsSectionTitle: "Highlights & Achievements",
      email: "Email",
      phone: "Phone",
      rightsReserved: "All rights reserved.",
      hostedOnAws: "Hosted on AWS.",
      sourceCode: "Website source code"
    },
    techStack: [
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
    ],
    hobbies: [
      { name: 'Unity Game Making', techKey: 'unity' },
      { name: '3D Modeling (Blender)', techKey: 'blender' },
      { name: 'CAD (Fusion)', techKey: 'fusion' },
      { name: 'UX Design (Figma)', techKey: 'figma' },
      { name: 'Electronics', techKey: 'electronics' },
      { name: 'Computers (Hardware)', techKey: 'hardware' },
      { name: 'Mixed Martial Arts (MMA)', techKey: 'mma' },
      { name: 'Badminton', techKey: 'badminton' },
      { name: 'Tennis (Beginner)', techKey: 'tennis' },
      { name: 'Motor Sports', techKey: 'motorsport' },
      { name: 'Petrol Head', techKey: 'petrolhead' }
    ],
    projects: [
      {
        id: 'agence-abc',
        title: 'ABC Travel Agency',
        subtitle: 'Full-Stack Web App & OOP Java Interface with Azure Cloud Deployment',
        date: 'April 2026',
        tech: ['React', 'Express.js', 'Java POO', 'JWT Auth', 'PayPal API', 'MongoDB', 'Azure App Service'],
        image: agenceGif,
        fallbackImage: '/assets/agence_abc.jpg',
        scoreBadge: '90% Final Grade (1st in class)',
        desc: "Award-winning project with the highest class grade (90%). Integrates a PayPal API payment gateway, a Java OOP desktop client with JWT authentication, and an Express REST API deployed on Azure.",
        isDetailed: true,
        sprints: [
          {
            name: 'Sprint 1 — Architecture & UML Diagrams',
            score: '12.70 / 14 (90.71%)',
            desc: "Comprehensive software architecture design and complete modeling of UML diagrams (use cases, classes, sequences)."
          },
          {
            name: 'Sprint 2 — Implementation & Testing',
            score: '14.00 / 14 (100.00%)',
            desc: 'Implementation phase, test coverage, and flawless delivery of all required features.'
          }
        ],
        highlights: [
          "Exceeding Objectives: The evaluation only required functional diagrams, but our team designed a complete, industrial-grade system.",
          "Online Payment Module: Direct integration of the PayPal API for secure reservation transaction processing.",
          "Java OOP Desktop Client: Object-oriented Java application allowing administrators to log in via JWT and directly manage the MongoDB database.",
          "Security & REST API: Express.js RESTful architecture with unified access control via JWT authentication tokens.",
          "Azure Cloud Infrastructure: Automated deployment and continuous hosting on Azure App Service."
        ],
        videos: [
          {
            id: 'checkout-demo',
            title: 'Payment Module — PayPal API',
            desc: 'Demonstration of the checkout flow and live secure payment via the PayPal API.',
            src: checkoutVideo
          },
          {
            id: 'rest-demo',
            title: 'REST API & MongoDB Synchronization',
            desc: 'Validation of RESTful data exchanges, JWT tokens, and database transactions.',
            src: restVideo
          }
        ]
      },
      {
        id: 'duck-hunt',
        title: 'Duck Hunt Arcade',
        subtitle: 'Client/Server Architecture, MVC Pattern & 2D JavaFX Animations',
        date: '2026',
        tech: ['Java', 'JavaFX', 'FXML', 'Gradle', 'GitLab', 'CSS', 'JSON/XML'],
        image: duckHuntGif,
        fallbackImage: '/assets/duck_hunt.jpg',
        scoreBadge: 'JavaFX Client/Server Project',
        desc: '2D arcade game based on the MVC pattern, with client-server architecture (JSON/XML), 2D JavaFX animations, and internationalization (i18n).',
        highlights: [
          "MVC & Multi-Model Architecture: Strict separation between the FXML interface, concurrent data models, and business logic.",
          "Client/Server Network: Structured data exchanges (JSON/XML) and network communication protocols between client and server modules.",
          "Observer Pattern & Events: Reactive UI event handling, state observation, and real-time synchronization between models and views.",
          "2D Graphics & JavaFX Animations: Dynamic 2D rendering on Canvas, game loop, and CSS-styled declarative FXML interface.",
          "Custom Components & Internationalization: Reusable controls, responsive elastic layout, and multi-language support (i18n).",
          "Tooling & Quality Assurance: Version and branch management on GitLab with Gradle, formal code review, and bug testing plan."
        ]
      },
      {
        id: 'station-meteo',
        title: 'Automated Weather Station',
        subtitle: 'Tkinter Python UI, Embedded IoT Multi-Thread System & MVC Architecture',
        date: 'May 2026',
        tech: ['Python', 'Tkinter UI', 'Multi-Threading', 'SQLite', 'Raspberry Pi 5', 'SSH', 'ADC/I2C'],
        image: meteoModuleImg,
        fallbackImage: '/assets/meteomodule.png',
        wiringImage: meteoWiringImg,
        scoreBadge: 'IoT / Embedded Systems Project',
        desc: 'Tkinter graphical interface with multi-threaded Python MVC architecture for real-time control and reading of electrical components on a Raspberry Pi 5.',
        highlights: [
          "Python Tkinter GUI & Threads: Responsive control of electrical components and multi-threaded execution for simultaneous sensor reading.",
          "Electrical Component Control: Hardware management and real-time acquisition (I2C ADC converter for brightness, temperature/humidity sensor, LCD screen).",
          "MVC Design & SQLite Persistence: Model-View-Controller modeling with local logging of weather history in an SQLite database.",
          "Assembly & Electronic Wiring: Rigorous assembly and wiring of electrical circuits on a breadboard connected to the Raspberry Pi 5."
        ]
      },
      {
        id: 'app-collab',
        title: 'Collaborative Web App (MERN Stack)',
        subtitle: 'Introduction to MERN Stack, RESTful API, JWT Auth & Vercel Hosting',
        date: 'February 2026',
        tech: ['React.js', 'Express.js', 'MongoDB', 'Node.js', 'JWT Auth', 'REST API', 'Vercel', 'Git'],
        image: collabMaquetteImg,
        fallbackImage: '/assets/MaquetteCollaboration.png',
        scoreBadge: 'Foundational MERN Project',
        desc: "Pioneering team project introducing the MERN architecture (MongoDB, Express, React, Node), serving as an essential technical stepping stone for the subsequent ABC Agency project.",
        highlights: [
          "MERN Stepping Stone & ABC Agency Foundation: First team project that allowed the class to master the MERN architecture, laying the groundwork for skills reused on the ABC Travel Agency.",
          "Full-Stack MERN Architecture: Structuring between the React.js user interface, the Express.js / Node.js REST API, and the MongoDB NoSQL database.",
          "Security & REST Exchanges: Development of RESTful endpoints and secure access control via JWT (JSON Web Tokens) authentication.",
          "Vercel Cloud Deployment: Continuous hosting on the Vercel platform (accessible and beginner-friendly solution for MERN projects).",
          "Git Collaborative Workflow: Teamwork focused on Git branch management, code reviews, pull requests, and conflict resolution."
        ]
      }
    ],
    experiences: [
      {
        id: 'auto-accessories',
        role: "Independent Automotive Accessories Installer",
        company: "Independent Project / Freelance • Laval, Qc",
        dates: "2025 -- Present",
        badge: "12V Automotive Electronics & Multimedia",
        bullets: [
          "Installation, electrical wiring, and integration of electronic equipment (Apple CarPlay multimedia screens, F1 lights, DRL lighting) on vehicles.",
          "Diagnostics and testing of 12V low-voltage circuits using a multimeter for clean and secure wiring.",
          "Customer relationship management: needs analysis, cost estimation, and strict adherence to deadlines."
        ],
        details: {
          summary: "Independent work specializing in the diagnosis, integration, and electrical wiring of low-voltage (12V) automotive accessories with an OEM-level clean finish.",
          highlights: [
            "2016 Subaru Impreza: Installation, console integration, and full electrical wiring of an Apple CarPlay multimedia unit.",
            "F1 Style Brake Lights: Mounting and electrical wiring of dynamic F1-style brake/fog lights.",
            "2018 Honda Accord: Installation of a dynamic Honda emblem and integration of DRL daytime running lights/dynamic turn signals on mirrors.",
            "12V Wiring & Security: Multimeter testing, 12V low-voltage circuit diagnostics, and neat integration of electrical harnesses."
          ],
          media: [
            {
              type: 'video',
              title: 'F1 Style Brake / Fog Lights',
              desc: 'Demonstration of the operation and dynamic blinking of the installed F1-style lights.',
              src: carVideo
            },
            {
              type: 'image',
              title: 'Apple CarPlay Integration — 2016 Subaru Impreza',
              desc: 'Overview of the Apple CarPlay multimedia unit integration and wiring in a 2016 Subaru Impreza.',
              src: carplayImg
            }
          ]
        }
      },
      {
        id: 'benevole-obn',
        role: "Volunteer at the NBO Tournament (Tennis Canada)",
        company: "Fan Experience • Montreal, Qc",
        dates: "Summer 2026",
        badge: "Named Most Enthusiastic Volunteer",
        bullets: [
          "Named the most enthusiastic volunteer of the tournament and described as a true source of inspiration for the team by the captains.",
          "Animation of interactive game booths and distribution of promotional items to a large volume of visitors.",
          "Welcoming, guiding fans, and providing operational assistance on-site to ensure smooth activities."
        ],
        details: {
          summary: "Volunteer involvement at the prestigious National Bank Open (NBO) of Tennis Canada in Montreal, rewarded with the distinction of the most enthusiastic volunteer and praised by team management.",
          quote: "I had the honor of serving as a volunteer at the Tennis Canada tournament in Montreal (National Bank Open). I was named the most enthusiastic volunteer and my captains called me a true source of inspiration for the other volunteers.",
          highlights: [
            "NBO Tournament Honor: Pride and honor of being part of the official volunteer team during the international Tennis Canada tournament in Montreal.",
            "Most Enthusiastic Volunteer: Recipient of the honorable mention awarded to the most enthusiastic volunteer of the tournament.",
            "Captains' Recognition: Praised by team captains as a constant source of inspiration for all volunteers on site.",
            "Fan Service & Animation: Warm welcome to spectators, dynamic game animation, and flow management on the tournament site."
          ],
          media: [
            {
              type: 'image',
              title: 'Official Volunteer — National Bank Open (Tennis Canada)',
              desc: 'Presence and involvement on the site of the international Tennis Canada tournament in Montreal.',
              src: benevoleImg
            }
          ]
        }
      }
    ],
    education: [
      {
        institution: "Montmorency College",
        degree: "DEC in Computer Science — Application Development Techniques",
        location: "Laval, Qc",
        dates: "August 2024 -- December 2027",
        details: "Data Structures and Algorithms, OOP, Web Development, Database Systems, Networks, and OS."
      },
      {
        institution: "Citoyen College",
        degree: "High School Diploma (Involvement: Robotics Club)",
        location: "Laval, Qc",
        dates: ""
      }
    ]
  }
};
