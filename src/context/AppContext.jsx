import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../translations';

export const AppContext = createContext();

export function AppProvider({ children }) {
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

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        toggleLang,
        t,
        techStack,
        hobbies,
        projects,
        experiences,
        education
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
