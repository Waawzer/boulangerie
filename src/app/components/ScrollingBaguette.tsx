'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  
  // First content section appears at 25% and fades out at 60%
  const firstSectionOpacity = scrollProgress > 0.25 
    ? (scrollProgress < 0.6 
        ? Math.min((scrollProgress - 0.25) * 2.5, 1) // Slower fade in
        : Math.max(1 - (scrollProgress - 0.6) * 10, 0)) // Fade out faster at 60%
    : 0;
  
  // Second content section appears at 60% and fades out at 80%
  const secondSectionOpacity = scrollProgress > 0.6 
    ? (scrollProgress < 0.8 
        ? Math.min((scrollProgress - 0.6) * 5, 1) 
        : Math.max(1 - (scrollProgress - 0.8) * 10, 0))
    : 0;
    
  // CTA button appears at the end, after everything else has faded
  const ctaButtonOpacity = scrollProgress > 0.85 ? Math.min((scrollProgress - 0.85) * 6.67, 1) : 0;
  
  return (
    <div className="relative h-[300vh]" ref={baguetteRef}>
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
          
          
          
          {/* "Découvrir nos créations" CTA button - appears at the end */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              opacity: ctaButtonOpacity,
              pointerEvents: ctaButtonOpacity > 0.5 ? 'auto' : 'none',
              transition: 'opacity 1s ease, transform 1s ease',
              zIndex: 15,
              transform: `translateY(${(1 - ctaButtonOpacity) * 30}px)`,
            }}
          >
            <div className="text-center">
              <h3 
                className="text-white/90 mb-8 text-2xl font-light"
                style={{
                  opacity: ctaButtonOpacity,
                  transform: `translateY(${(1 - ctaButtonOpacity) * 20}px)`,
                  transition: 'transform 1s ease, opacity 1s ease',
                }}
              >
                Découvrez notre univers
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/nos-creations" 
                  className="button text-lg px-8 py-4 hover-lift"
                  style={{
                    opacity: ctaButtonOpacity,
                    transform: `translateY(${(1 - ctaButtonOpacity) * 20}px)`,
                    transition: 'transform 1s ease, opacity 1s ease',
                    transitionDelay: '0.5s',
                  }}
                >
                  Nos Créations
                </Link>
                <Link 
                  href="/contact" 
                  className="button button-outline text-lg px-8 py-4 hover-lift"
                  style={{
                    opacity: ctaButtonOpacity,
                    transform: `translateY(${(1 - ctaButtonOpacity) * 20}px)`,
                    transition: 'transform 1s ease, opacity 1s ease',
                    transitionDelay: '0.8s',
                  }}
                >
                  Rencontrons-nous
                </Link>
              </div>
            </div>
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
        {/* First section - appears at about 25% scroll and fades out at 60% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: firstSectionOpacity,
            transform: `translateY(${scrollProgress > 0.25 ? '0' : '50px'}) translateX(${scrollProgress > 0.6 ? (scrollProgress - 0.6) * -200 : 0}px)`,
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
        
        {/* Second section - appears at about 60% scroll and fades out at 80% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: secondSectionOpacity,
            transform: `translateY(${scrollProgress > 0.6 ? '0' : '50px'}) translateX(${scrollProgress > 0.8 ? (scrollProgress - 0.8) * 200 : 0}px)`,
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
    </div>
  );
} 