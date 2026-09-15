import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ImgWithSkeleton } from '../components/Shared';

export default function Home() {
  const { 
    theme, toggleTheme, lang, toggleLang, 
    t, techStack, hobbies, projects, experiences, education 
  } = useContext(AppContext);
  
  const navigate = useNavigate();

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
            <div key={project.id} className="project-card" onClick={() => navigate(`/project/${project.id}`)}>
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
                    onClick={() => navigate(`/experience/${exp.id}`)}
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
