'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollingBaguette() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const baguetteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!baguetteRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Use a slower multiplier for more gradual transitions
      setScrollProgress(Math.min(scrollPercent * 1.2, 1));
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  // Calculate the opacity for the initial fade-in effect
  // Start at 0 and reach full opacity at 20% scroll
  const initialFadeOpacity = Math.min(scrollProgress * 5, 1);
  
  // Increased spacing between animations with clear boundaries
  // First text appears at 15% and stays until 35%
  const lArtisanOpacity = scrollProgress > 0.15 && scrollProgress < 0.35 
    ? Math.min((scrollProgress - 0.15) * 4, 1) 
    : (scrollProgress >= 0.35 && scrollProgress < 0.4 
        ? 1 
        : (scrollProgress >= 0.4 
            ? Math.max(1 - (scrollProgress - 0.4) * 10, 0) // Fast fade out
            : 0));
  
  // First content section appears at 25% and fades out at 50% - with a gap before next section
  const firstSectionOpacity = scrollProgress > 0.25 
    ? (scrollProgress < 0.5 
        ? Math.min((scrollProgress - 0.25) * 3, 1) 
        : Math.max(1 - (scrollProgress - 0.5) * 15, 0)) // Very fast fade out
    : 0;
  
  // Second text appears at 55% (after first content has disappeared)
  const moderneOpacity = scrollProgress > 0.55 && scrollProgress < 0.7 
    ? Math.min((scrollProgress - 0.55) * 5, 1) 
    : (scrollProgress >= 0.7 
        ? Math.max(1 - (scrollProgress - 0.7) * 10, 0) // Fast fade out
        : 0);
  
  // Second content section appears at 65% (after moderne text has started appearing) and fades out at 80%
  const secondSectionOpacity = scrollProgress > 0.65 
    ? (scrollProgress < 0.8 
        ? Math.min((scrollProgress - 0.65) * 6, 1) // Quick fade in
        : Math.max(1 - (scrollProgress - 0.8) * 15, 0)) // Very fast fade out
    : 0;
  
  return (
    <div className="relative h-[250vh]" ref={baguetteRef}>
      {/* Fixed background */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black">
        <div className="relative w-full max-w-6xl h-[80vh] mx-auto">
          {/* Baguette image with reveal effect */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: initialFadeOpacity, // Initial fade-in effect
              transition: 'opacity 0.7s ease-out',
            }}
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                maskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
                WebkitMaskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
                transform: `scale(${1 + scrollProgress * 0.1})`,
                opacity: 1 - scrollProgress * 0.2, // Slower fade out
                transition: 'transform 0.7s ease-out',
              }}
            >
              <Image
                src="/images/baguette.jpg"
                alt="Baguette artisanale"
                fill
                style={{ 
                  objectFit: 'contain',
                  filter: `brightness(${1 - scrollProgress * 0.2}) contrast(${1 + scrollProgress * 0.3})`,
                }}
                priority
                className="transition-all duration-700"
              />
            </div>
          </div>
          
          {/* L'Artisan text - appears after initial scroll */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              opacity: lArtisanOpacity,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              zIndex: 10,
            }}
          >
            <h2 
              className="text-[var(--accent)] text-8xl font-light tracking-widest uppercase"
              style={{
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                transform: `translateY(-40px) scale(${1 + lArtisanOpacity * 0.1})`,
              }}
            >
              L&apos;Artisan
            </h2>
          </div>
          
          {/* Moderne text - appears later */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              opacity: moderneOpacity,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              zIndex: 10,
            }}
          >
            <h2 
              className="text-[var(--accent)] text-8xl font-light tracking-widest uppercase"
              style={{
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                transform: `translateY(40px) scale(${1 + moderneOpacity * 0.1})`,
              }}
            >
              Moderne
            </h2>
          </div>
          
          {/* Decorative elements */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: Math.min(scrollProgress * 2, 0.2),
              transition: 'opacity 0.7s ease',
            }}
          >
            <div className="absolute top-[10%] left-[10%] w-16 h-16 border-t border-l border-[var(--accent)]"></div>
            <div className="absolute bottom-[10%] right-[10%] w-16 h-16 border-b border-r border-[var(--accent)]"></div>
          </div>
        </div>
      </div>
      
      {/* Content sections that appear as you scroll */}
      <div className="relative">
        {/* First section - appears at about 25% scroll and fades out at 50% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: firstSectionOpacity,
            transform: `translateY(${scrollProgress > 0.25 ? '0' : '50px'}) translateX(${scrollProgress > 0.5 ? (scrollProgress - 0.5) * -300 : 0}px)`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            zIndex: 10,
          }}
        >
          <div className="absolute bottom-[35%] left-[15%] max-w-md text-left">
            <h2 className="text-[var(--accent)] mb-6 text-2xl">Tradition & Innovation</h2>
            <p className="text-white/90 leading-relaxed">
              Notre boulangerie marie l&apos;excellence artisanale à une vision résolument moderne.
              Chaque baguette est façonnée à la main selon des méthodes ancestrales.
            </p>
          </div>
        </div>
        
        {/* Second section - appears at about 65% scroll and fades out at 80% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: secondSectionOpacity,
            transform: `translateY(${scrollProgress > 0.65 ? '0' : '50px'}) translateX(${scrollProgress > 0.8 ? (scrollProgress - 0.8) * 300 : 0}px)`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            zIndex: 10,
          }}
        >
          <div className="absolute top-[35%] right-[15%] max-w-md text-right">
            <h2 className="text-[var(--accent)] mb-6 text-2xl">Saveurs Authentiques</h2>
            <p className="text-white/90 leading-relaxed">
              Des ingrédients soigneusement sélectionnés pour une expérience gustative incomparable.
              Notre levain naturel confère à nos pains des arômes complexes et une mie alvéolée parfaite.
            </p>
          </div>
        </div>
      </div>
      
      {/* Final animation marker - completely invisible but helps track when all animations are done */}
      <div 
        className="fixed top-0 left-0 w-full h-0 opacity-0 pointer-events-none"
        style={{ 
          opacity: scrollProgress > 0.9 ? 1 : 0, // Only becomes "active" at 90% scroll
        }}
      ></div>
    </div>
  );
} 