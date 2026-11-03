import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Looping GIF assets converted from root videos
import promotionnelGif from '../assets/promotionnel.gif';
import engagementGif from '../assets/engagement.gif';
import showcaseGif from '../assets/showcase.gif';
import kababgyGif from '../assets/kababgy.gif';

const HERO_VIDEOS = [
  { id: 'engagement', src: engagementGif, alt: 'Vidéo engageante' },
  { id: 'promotionnel', src: promotionnelGif, alt: 'Vidéo promotionnelle' },
  { id: 'showcase', src: showcaseGif, alt: 'Vidéo présentation plats' },
];

function shuffleVideos(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Marketing() {
  const [activeSection, setActiveSection] = useState(0);
  const [isDispersed, setIsDispersed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [heroCards] = useState(() => shuffleVideos(HERO_VIDEOS));
  const containerRef = useRef(null);

  const sections = [
    { id: 'hero', label: 'Agence' },
    { id: 'pourquoi', label: 'Pourquoi?' },
    { id: 'vision', label: 'Ma vision' },
    { id: 'exemples', label: 'Exemples' },
    { id: 'mauvais', label: 'À éviter' },
  ];

  // Prevent horizontal swiping on mobile strictly while on this page
  useEffect(() => {
    const origHtmlOverflowX = document.documentElement.style.overflowX;
    const origBodyOverflowX = document.body.style.overflowX;
    const origBodyTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.touchAction = 'pan-y';

    return () => {
      document.documentElement.style.overflowX = origHtmlOverflowX;
      document.body.style.overflowX = origBodyOverflowX;
      document.body.style.touchAction = origBodyTouchAction;
    };
  }, []);

  // Initial deck dispersion shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDispersed(true);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  // Smooth position rotation animation every 3.4 seconds on the first page
  useEffect(() => {
    if (!isDispersed || isHovered || activeSection !== 0) return;

    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % 3);
    }, 3400);

    return () => clearInterval(interval);
  }, [isDispersed, isHovered, activeSection]);

  const scrollToSection = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    const targetSection = container.querySelector(`[data-index="${index}"]`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Magnetic scroll listener & Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = container.querySelectorAll('.mkt-snap-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
            entry.target.classList.add('mkt-in-view');
          }
        });
      },
      {
        root: container,
        threshold: 0.45,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        scrollToSection((activeSection + 1) % sections.length);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.max(0, activeSection - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, sections.length, scrollToSection]);

  return (
    <div className="marketing-page-root">
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/uncut-sans@5.0.0/index.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/uncut-sans@5.0.0/500.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/uncut-sans@5.0.0/700.css');

        .marketing-page-root {
          --mkt-bg: #ececed;
          --mkt-card-bg: #d4d5da;
          --mkt-fg: #141416;
          --mkt-fg-muted: #55575e;
          --mkt-font: 'Uncut Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          
          /* Mathematical exponential ease-out curve */
          --mkt-ease: cubic-bezier(0.16, 1, 0.3, 1);
          --mkt-ease-expo: cubic-bezier(0.19, 1, 0.22, 1);
          --mkt-duration: 1.25s;

          position: fixed;
          inset: 0;
          width: 100vw;
          max-width: 100vw;
          background-color: var(--mkt-bg);
          color: var(--mkt-fg);
          font-family: var(--mkt-font);
          overflow: hidden;
          overflow-x: hidden;
          touch-action: pan-y;
          z-index: 9999;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Top Minimal Navigation Bar */
        .mkt-topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          z-index: 100;
          pointer-events: none;
        }
        .mkt-topbar > * {
          pointer-events: auto;
        }
        .mkt-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--mkt-fg);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          opacity: 0.6;
          transition: opacity 0.3s ease, transform 0.3s var(--mkt-ease-expo);
        }
        .mkt-back-btn:hover {
          opacity: 1;
          transform: translateX(-4px);
        }

        /* Right Magnetic Navigation Dots */
        .mkt-snap-nav {
          position: absolute;
          right: 2.2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 100;
        }
        .mkt-snap-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.28);
          background: transparent;
          cursor: pointer;
          transition: all 0.5s var(--mkt-ease-expo);
          padding: 0;
        }
        .mkt-snap-dot:hover {
          transform: scale(1.4);
          border-color: var(--mkt-fg);
        }
        .mkt-snap-dot.active {
          height: 28px;
          border-radius: 14px;
          background: var(--mkt-fg);
          border-color: var(--mkt-fg);
          transform: scale(1.05);
        }

        /* Completely hide scrollbars across all browsers */
        .marketing-page-root,
        .mkt-scroll-container,
        .mkt-snap-section,
        .mkt-content-wrap,
        .mkt-exemples-grid {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .marketing-page-root::-webkit-scrollbar,
        .mkt-scroll-container::-webkit-scrollbar,
        .mkt-snap-section::-webkit-scrollbar,
        .mkt-content-wrap::-webkit-scrollbar,
        .mkt-exemples-grid::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Magnetic Scrolling Container */
        .mkt-scroll-container {
          width: 100%;
          max-width: 100vw;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          overscroll-behavior-y: contain;
          overscroll-behavior-x: none;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }

        /* Snap Section */
        .mkt-snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          height: 100vh;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: clamp(1.8rem, 4vh, 3.2rem) clamp(1rem, 2.5vw, 2.5rem);
          box-sizing: border-box;
          user-select: none;
          overflow: visible;
        }

        /* Generous Content Container */
        .mkt-content-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1080px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          overflow: visible;
        }

        /* Section Headings with Slow Mathematical Deceleration */
        .mkt-title {
          font-family: var(--mkt-font);
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--mkt-fg);
          margin: 0 0 clamp(2.2rem, 4.5vh, 3.6rem) 0;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(45px) scale(0.96);
          transition: opacity var(--mkt-duration) var(--mkt-ease-expo), transform var(--mkt-duration) var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-title {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* --- PURE INSTAGRAM REEL SIZED CARD (9:16 Aspect Ratio) --- */
        .mkt-reel-card {
          aspect-ratio: 9 / 16;
          border-radius: 22px;
          background: var(--mkt-card-bg);
          box-shadow: 
            0 24px 50px -15px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
          display: block;
          transition: transform 0.6s var(--mkt-ease-expo), box-shadow 0.6s var(--mkt-ease-expo);
          cursor: pointer;
        }
        .mkt-reel-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 32px 64px -18px rgba(0, 0, 0, 0.18);
        }
        .mkt-reel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: inherit;
        }

        /* --- SECTION 1: HERO DECK OF CARDS & SMOOTH ROTATING POSITIONS --- */
        .mkt-hero-fan-container {
          position: relative;
          width: 100%;
          max-width: 580px;
          height: clamp(340px, 48vh, 440px);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .mkt-fan-reel {
          position: absolute;
          height: 100%;
          border-radius: 22px;
          will-change: transform, box-shadow;
          transition: transform 1.25s var(--mkt-ease-expo), box-shadow 1.25s var(--mkt-ease-expo);
        }

        /* Initial stacked state */
        .mkt-fan-reel.mkt-stack-0 {
          z-index: 1;
          transform: translate(0, 0) rotate(0deg) scale(1);
          box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.14);
        }
        .mkt-fan-reel.mkt-stack-1 {
          z-index: 3;
          transform: translate(0, 0) rotate(0deg) scale(1.01);
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.18);
        }
        .mkt-fan-reel.mkt-stack-2 {
          z-index: 2;
          transform: translate(0, 0) rotate(0deg) scale(1);
          box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.16);
        }

        /* Dispersed Position Slots (Rotating every few seconds) */
        /* Slot 0: Left tilted card */
        .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-0 {
          transform: translate(-130px, 22px) rotate(-9.5deg) scale(0.95);
          z-index: 1;
          box-shadow: 0 22px 48px -14px rgba(0, 0, 0, 0.14);
        }

        /* Slot 1: Center highlighted card */
        .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-1 {
          transform: translate(0, -6px) rotate(0deg) scale(1.05);
          z-index: 3;
          box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.22);
        }

        /* Slot 2: Right tilted card */
        .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-2 {
          transform: translate(130px, 22px) rotate(9.5deg) scale(0.95);
          z-index: 2;
          box-shadow: 0 22px 48px -14px rgba(0, 0, 0, 0.14);
        }

        /* Subtle interactive hover spread */
        .mkt-hero-fan-container.dispersed:hover .mkt-fan-reel.mkt-slot-0 {
          transform: translate(-145px, 20px) rotate(-11deg) scale(0.96);
        }
        .mkt-hero-fan-container.dispersed:hover .mkt-fan-reel.mkt-slot-1 {
          transform: translate(0, -12px) rotate(0deg) scale(1.07);
        }
        .mkt-hero-fan-container.dispersed:hover .mkt-fan-reel.mkt-slot-2 {
          transform: translate(145px, 20px) rotate(11deg) scale(0.96);
        }

        /* --- SECTION 2: POURQUOI (Simple & Direct) --- */
        .mkt-pourquoi-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4rem, 8vw, 9rem);
          width: 100%;
          max-width: 860px;
          margin-top: 1rem;
        }
        .mkt-col-traditional,
        .mkt-col-nouveau {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 1.3s var(--mkt-ease-expo), transform 1.3s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-col-traditional {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.18s;
        }
        .mkt-in-view .mkt-col-nouveau {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.34s;
        }
        .mkt-col-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--mkt-fg);
          margin-bottom: 2rem;
        }
        .mkt-minimal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          text-align: left;
          width: 100%;
        }
        .mkt-minimal-item {
          font-size: clamp(1.05rem, 1.55vw, 1.25rem);
          line-height: 1.45;
          letter-spacing: -0.015em;
          color: var(--mkt-fg-muted);
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }
        .mkt-col-nouveau .mkt-minimal-item {
          color: var(--mkt-fg);
          font-weight: 500;
        }

        /* --- SECTION 3: MA VISION & BUT --- */
        .mkt-vision-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(3.5rem, 6vw, 7rem);
          width: 100%;
          max-width: 1040px;
        }
        .mkt-vision-card-wrap {
          height: clamp(420px, 58vh, 520px);
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-50px) scale(0.94);
          transition: opacity 1.3s var(--mkt-ease-expo), transform 1.3s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-vision-card-wrap {
          opacity: 1;
          transform: translateX(0) scale(1);
          transition-delay: 0.15s;
        }
        .mkt-vision-card-wrap .mkt-reel-card {
          height: 100%;
        }
        .mkt-vision-text {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2vh, 1.4rem);
        }
        .mkt-vision-item {
          font-size: clamp(1.05rem, 1.55vw, 1.3rem);
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: var(--mkt-fg);
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 1.1s var(--mkt-ease-expo), transform 1.1s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-vision-item:nth-child(1) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.22s;
        }
        .mkt-in-view .mkt-vision-item:nth-child(2) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.35s;
        }

        /* "But" Card Container */
        .mkt-goal-card {
          margin-top: 0.4rem;
          padding: 1.2rem 1.4rem;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.04);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s var(--mkt-ease-expo), transform 1.2s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-goal-card {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.48s;
        }
        .mkt-goal-title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--mkt-fg);
          margin: 0 0 0.75rem 0;
        }
        .mkt-goal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .mkt-goal-item {
          font-size: clamp(0.95rem, 1.35vw, 1.15rem);
          line-height: 1.4;
          color: #222328;
          display: flex;
          align-items: baseline;
          gap: 0.65rem;
        }
        .mkt-goal-check {
          color: #1b8144;
          font-weight: 800;
          font-size: 0.95rem;
        }

        /* --- SECTION 4: EXEMPLE DE VIDEO (3 Columns) --- */
        .mkt-exemples-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(2.5rem, 4vw, 4rem);
          width: 100%;
          max-width: 1020px;
        }
        .mkt-exemple-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(60px) scale(0.94);
          transition: opacity 1.3s var(--mkt-ease-expo), transform 1.3s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-exemple-col:nth-child(1) {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.15s;
        }
        .mkt-in-view .mkt-exemple-col:nth-child(2) {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.3s;
        }
        .mkt-in-view .mkt-exemple-col:nth-child(3) {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.45s;
        }
        .mkt-exemple-heading {
          font-size: clamp(1.2rem, 1.8vw, 1.55rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: var(--mkt-fg);
          margin-bottom: 1.2rem;
        }
        .mkt-exemple-col .mkt-reel-card {
          height: clamp(260px, 36vh, 340px);
        }
        .mkt-exemple-bullets {
          list-style: none;
          padding: 0;
          margin: 1.4rem 0 0 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
          max-width: 230px;
        }
        .mkt-exemple-bullet {
          font-size: clamp(0.85rem, 1.1vw, 1rem);
          line-height: 1.4;
          color: #3e4046;
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
        }

        /* --- SECTION 5: QU'EST CE QUE VOUS FAITE MAUVAIS --- */
        .mkt-mauvais-title {
          font-size: clamp(2.1rem, 4.4vw, 3.4rem);
        }
        .mkt-mauvais-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4rem, 7vw, 8rem);
          width: 100%;
          max-width: 920px;
        }
        .mkt-mauvais-card-wrap {
          height: clamp(340px, 48vh, 440px);
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-50px) scale(0.94);
          transition: opacity 1.3s var(--mkt-ease-expo), transform 1.3s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-mauvais-card-wrap {
          opacity: 1;
          transform: translateX(0) scale(1);
          transition-delay: 0.15s;
        }
        .mkt-mauvais-card-wrap .mkt-reel-card {
          height: 100%;
        }
        .mkt-mauvais-text {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }
        .mkt-mauvais-item {
          font-size: clamp(1.05rem, 1.7vw, 1.4rem);
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: #2b2c30;
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.1s var(--mkt-ease-expo), transform 1.1s var(--mkt-ease-expo);
        }
        .mkt-in-view .mkt-mauvais-item:nth-child(1) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.22s;
        }
        .mkt-in-view .mkt-mauvais-item:nth-child(2) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.35s;
        }
        .mkt-in-view .mkt-mauvais-item:nth-child(3) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.48s;
        }
        .mkt-in-view .mkt-mauvais-item:nth-child(4) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.61s;
        }

        /* Responsive Layout Adjustments */
        @media (max-width: 860px) {
          .mkt-topbar {
            padding: 0 1.5rem;
          }
          .mkt-snap-nav {
            display: none;
          }
          .mkt-pourquoi-wrap {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .mkt-vision-layout,
          .mkt-mauvais-layout {
            flex-direction: column;
            gap: 1.5rem;
          }
          .mkt-vision-text,
          .mkt-mauvais-text {
            text-align: center;
          }
          .mkt-vision-item,
          .mkt-mauvais-item {
            justify-content: center;
          }

          /* Bigger video on mobile for Ma vision while keeping "Le But" compact */
          .mkt-vision-card-wrap {
            height: clamp(280px, 38vh, 350px);
          }
          .mkt-vision-layout {
            gap: 1.25rem;
          }
          .mkt-vision-text {
            gap: 0.65rem;
            max-width: 360px;
          }
          .mkt-vision-item {
            font-size: 0.85rem;
            line-height: 1.35;
            gap: 0.5rem;
            text-align: left;
            justify-content: flex-start;
          }
          .mkt-goal-card {
            padding: 0.7rem 0.9rem;
            border-radius: 13px;
            margin-top: 0.25rem;
            max-width: 340px;
            margin-left: auto;
            margin-right: auto;
            background: rgba(255, 255, 255, 0.75);
          }
          .mkt-goal-title {
            font-size: 0.9rem;
            margin-bottom: 0.35rem;
            text-align: left;
          }
          .mkt-goal-list {
            gap: 0.32rem;
          }
          .mkt-goal-item {
            font-size: 0.78rem;
            line-height: 1.32;
            gap: 0.45rem;
            text-align: left;
          }
          .mkt-goal-check {
            font-size: 0.8rem;
          }
          .mkt-exemples-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            max-height: none;
            overflow: visible;
          }
          .mkt-hero-fan-container {
            max-width: 280px;
            width: 100%;
          }
          .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-0 {
            transform: translate(-48px, 12px) rotate(-6.5deg) scale(0.85);
          }
          .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-1 {
            transform: translate(0, -4px) rotate(0deg) scale(0.96);
          }
          .mkt-hero-fan-container.dispersed .mkt-fan-reel.mkt-slot-2 {
            transform: translate(48px, 12px) rotate(6.5deg) scale(0.85);
          }
          .mkt-snap-section {
            min-height: 100vh;
            height: auto;
            padding: 4rem 1.25rem 3.5rem;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
            overflow: visible;
          }
          .mkt-content-wrap {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow: visible;
          }
        }
      `}</style>

      {/* Top Navigation */}
      <header className="mkt-topbar">
        <Link to="/" className="mkt-back-btn" aria-label="Retour au Portfolio">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </Link>
      </header>

      {/* Right Magnetic Navigation Dots */}
      <nav className="mkt-snap-nav" aria-label="Navigation magnétique">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            className={`mkt-snap-dot ${activeSection === idx ? 'active' : ''}`}
            onClick={() => scrollToSection(idx)}
            aria-label={`Section ${sec.label}`}
            title={sec.label}
          />
        ))}
      </nav>

      {/* Magnetic Scroll Snapping Container */}
      <div className="mkt-scroll-container" ref={containerRef}>
        
        {/* ================= SECTION 1: HERO ================= */}
        <section className="mkt-snap-section mkt-in-view" data-index="0" id="hero">
          <div className="mkt-content-wrap">
            <h1 className="mkt-title">Agence the marketing</h1>
            
            {/* Interactive Card Deck with Smooth Position Switching Every Couple Seconds */}
            <div
              className={`mkt-hero-fan-container ${isDispersed ? 'dispersed' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setRotationIndex((prev) => (prev + 1) % 3)}
              title="Cliquer pour faire tourner les cartes ou survolez pour mettre en pause"
            >
              {heroCards.map((card, i) => {
                const slot = (i + rotationIndex) % 3;
                const slotClass = isDispersed ? `mkt-slot-${slot}` : `mkt-stack-${i}`;
                return (
                  <div
                    key={card.id}
                    className={`mkt-reel-card mkt-fan-reel ${slotClass}`}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="mkt-reel-img"
                      loading="eager"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: POURQUOI ================= */}
        <section className="mkt-snap-section" data-index="1" id="pourquoi">
          <div className="mkt-content-wrap">
            <h2 className="mkt-title">Pourquoi?</h2>

            <div className="mkt-pourquoi-wrap">
              {/* Traditionelle Column */}
              <div className="mkt-col-traditional">
                <h3 className="mkt-col-title">Traditionelle</h3>
                <ul className="mkt-minimal-list">
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Longues vidéos ou affiches que personne ne regarde</span>
                  </li>
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Coûte cher pour presque aucun nouveau client en salle</span>
                  </li>
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Les jeunes ne voient jamais votre restaurant</span>
                  </li>
                </ul>
              </div>

              {/* Nouveau Column */}
              <div className="mkt-col-nouveau">
                <h3 className="mkt-col-title">Nouveau</h3>
                <ul className="mkt-minimal-list">
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Vidéos courtes sur les téléphones (TikTok & Instagram)</span>
                  </li>
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Montré gratuitement à des milliers de personnes autour de vous</span>
                  </li>
                  <li className="mkt-minimal-item">
                    <span>—</span>
                    <span>Donne faim et attire du monde dès les premières secondes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: MA VISION & BUT ================= */}
        <section className="mkt-snap-section" data-index="2" id="vision">
          <div className="mkt-content-wrap">
            <h2 className="mkt-title">Ma vision</h2>

            <div className="mkt-vision-layout">
              {/* Left Reel Card (Promotionnel) */}
              <div className="mkt-vision-card-wrap">
                <div className="mkt-reel-card">
                  <img
                    src={promotionnelGif}
                    alt="Ma vision - Promotionnel"
                    className="mkt-reel-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="mkt-vision-text">
                <div className="mkt-vision-item">
                  <span>-</span>
                  <span>Vraie caméra Sony a6300 avec de bonnes lentilles (qualité bien plus belle et nette qu'un téléphone)</span>
                </div>
                <div className="mkt-vision-item">
                  <span>-</span>
                  <span>Vrai montage propre fait par un professionnel (titres faciles à lire, musique et bon son)</span>
                </div>

                {/* Le But Box */}
                <div className="mkt-goal-card">
                  <h3 className="mkt-goal-title">Le But :</h3>
                  <ul className="mkt-goal-list">
                    <li className="mkt-goal-item">
                      <span className="mkt-goal-check">✓</span>
                      <span>Attirer la jeunesse et les étudiants des campus proches</span>
                    </li>
                    <li className="mkt-goal-item">
                      <span className="mkt-goal-check">✓</span>
                      <span>Agrandir vos pages sur les réseaux (plus d'abonnés et de visibilité)</span>
                    </li>
                    <li className="mkt-goal-item">
                      <span className="mkt-goal-check">✓</span>
                      <span>Encourager les clients à visiter durant les journées lentes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: EXEMPLE DE VIDEO ================= */}
        <section className="mkt-snap-section" data-index="3" id="exemples">
          <div className="mkt-content-wrap">
            <h2 className="mkt-title">Exemple de video</h2>

            <div className="mkt-exemples-grid">
              {/* Column 1: Promotionnel */}
              <div className="mkt-exemple-col">
                <h3 className="mkt-exemple-heading">Promotionnel</h3>
                <div className="mkt-reel-card">
                  <img
                    src={promotionnelGif}
                    alt="Exemple Promotionnel"
                    className="mkt-reel-img"
                    loading="lazy"
                  />
                </div>
                <ul className="mkt-exemple-bullets">
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Montré directement aux gens qui habitent ou travaillent près du resto</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Vos vidéos sont vues par de vrais clients de votre quartier</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Donne une image propre, sérieuse et accueillante</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Engageant */}
              <div className="mkt-exemple-col">
                <h3 className="mkt-exemple-heading">Engageant</h3>
                <div className="mkt-reel-card">
                  <img
                    src={engagementGif}
                    alt="Exemple Engageant"
                    className="mkt-reel-img"
                    loading="lazy"
                  />
                </div>
                <ul className="mkt-exemple-bullets">
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Vidéo amusante que les jeunes s'envoient entre amis</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Fait parler de votre restaurant de manière naturelle</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Montre l'ambiance chaleureuse et familiale de votre resto</span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Show case */}
              <div className="mkt-exemple-col">
                <h3 className="mkt-exemple-heading">Show case</h3>
                <div className="mkt-reel-card">
                  <img
                    src={showcaseGif}
                    alt="Exemple Showcase"
                    className="mkt-reel-img"
                    loading="lazy"
                  />
                </div>
                <ul className="mkt-exemple-bullets">
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Montre vos plats de très près pour donner faim tout de suite</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Met en valeur la fraîcheur de vos ingrédients et portions</span>
                  </li>
                  <li className="mkt-exemple-bullet">
                    <span>-</span>
                    <span>Donne envie de venir commander dès aujourd'hui</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: QU'EST CE QUE VOUS FAITE MAUVAIS ================= */}
        <section className="mkt-snap-section" data-index="4" id="mauvais">
          <div className="mkt-content-wrap">
            <h2 className="mkt-title mkt-mauvais-title">Qu’est ce que vous faite de mauvais</h2>

            <div className="mkt-mauvais-layout">
              {/* Left Reel Card (Kababgy) */}
              <div className="mkt-mauvais-card-wrap">
                <div className="mkt-reel-card">
                  <img
                    src={kababgyGif}
                    alt="Kababgy - À éviter"
                    className="mkt-reel-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Bullets */}
              <div className="mkt-mauvais-text">
                <div className="mkt-mauvais-item">
                  <span style={{ color: '#b83b3b' }}>-</span>
                  <span>Pas de vidéos fréquentes (les gens finissent par vous oublier)</span>
                </div>
                <div className="mkt-mauvais-item">
                  <span style={{ color: '#b83b3b' }}>-</span>
                  <span>Vos vidéos n'attirent pas la jeunesse et les étudiants</span>
                </div>
                <div className="mkt-mauvais-item">
                  <span style={{ color: '#b83b3b' }}>-</span>
                  <span>Qualité d'image trop basse (vidéos sombres ou floues faites au téléphone)</span>
                </div>
                <div className="mkt-mauvais-item">
                  <span style={{ color: '#b83b3b' }}>-</span>
                  <span>Utilisation d'intelligence artificielle bizarre qui sonne faux</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
