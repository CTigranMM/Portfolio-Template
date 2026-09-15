import React, { useState, useEffect, useRef } from 'react';

// Dedicated VideoPlayer component ensuring smooth HTML5 playback
export function VideoPlayer({ src, title }) {
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
export function ImgWithSkeleton({ src, alt, className, wrapperClassName, fallbackImage, style }) {
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
