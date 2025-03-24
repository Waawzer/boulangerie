'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ScrollingBaguette() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollTop = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress as percentage through the section
      // Starting when the section top reaches viewport bottom
      // Ending when section bottom reaches viewport top
      const visibleSectionHeight = sectionHeight - viewportHeight;
      const progress = (scrollTop - sectionTop + viewportHeight) / visibleSectionHeight;
      
      // Clamp progress between 0 and 1
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Initial fade in and baguette reveal 
  const initialOpacity = Math.min(scrollProgress * 2.5, 1);
  const baguetteReveal = Math.min(scrollProgress * 1.5, 1);
  
  // Text reveal animations
  // First section: L'Artisan fades in at 10%, reaches full opacity at 25%, stays until 40%, then fades out
  const lArtisanOpacity = scrollProgress > 0.1 
    ? (scrollProgress < 0.4 
      ? Math.min((scrollProgress - 0.1) * 6.67, 1) 
      : Math.max(1 - (scrollProgress - 0.4) * 6.67, 0)) 
    : 0;
  
  // First content text appears between 20% and 50% 
  const firstContentOpacity = scrollProgress > 0.2 
    ? (scrollProgress < 0.5 
      ? Math.min((scrollProgress - 0.2) * 5, 1) 
      : Math.max(1 - (scrollProgress - 0.5) * 5, 0)) 
    : 0;
  
  // Second text: Moderne appears at 45%, full opacity at 60%, stays until 75%, then fades out
  const moderneOpacity = scrollProgress > 0.45 
    ? (scrollProgress < 0.75 
      ? Math.min((scrollProgress - 0.45) * 6.67, 1) 
      : Math.max(1 - (scrollProgress - 0.75) * 6.67, 0)) 
    : 0;
  
  // Second content text appears between 55% and 85%
  const secondContentOpacity = scrollProgress > 0.55 
    ? (scrollProgress < 0.85 
      ? Math.min((scrollProgress - 0.55) * 5, 1) 
      : Math.max(1 - (scrollProgress - 0.85) * 5, 0)) 
    : 0;
    
  // Final text "Notre Engagement" appears at 85% and stays
  const finalTextOpacity = scrollProgress > 0.85 ? Math.min((scrollProgress - 0.85) * 6.67, 1) : 0;
  
  // Calculate transforms
  const baguetteScale = 1 + scrollProgress * 0.15;
  const baguetteContrast = 1 + scrollProgress * 0.3;
  const baguetteBrightness = 1 - scrollProgress * 0.3;
  
  // Calculate the first and second content position
  const firstContentX = scrollProgress > 0.5 ? (scrollProgress - 0.5) * -200 : 0; 
  const secondContentX = scrollProgress > 0.85 ? (scrollProgress - 0.85) * 200 : 0;
  
  return (
    <div className="relative h-[300vh]" ref={sectionRef}>
      {/* Fixed position content that stays on screen during scroll */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Background layer - fades in first */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ opacity: initialOpacity }}
        >
          {/* Baguette with progressive reveal effect */}
          <div className="relative w-full max-w-6xl h-[80vh] mx-auto overflow-hidden">
            {/* Baguette image */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${baguetteScale})`,
                transition: 'transform 0.5s ease-out',
              }}
            >
              <div 
                className="relative w-full h-full overflow-hidden"
                style={{
                  maskImage: `linear-gradient(90deg, transparent ${Math.max(0, (1 - baguetteReveal) * 100)}%, black 100%)`,
                  WebkitMaskImage: `linear-gradient(90deg, transparent ${Math.max(0, (1 - baguetteReveal) * 100)}%, black 100%)`,
                }}
              >
                <Image
                  src="/images/baguette.jpg"
                  alt="Baguette artisanale"
                  fill
                  style={{ 
                    objectFit: 'contain',
                    filter: `brightness(${baguetteBrightness}) contrast(${baguetteContrast})`,
                  }}
                  priority
                  className="transition-all duration-500"
                />
              </div>
            </div>
            
            {/* Overlay text elements */}
            
            {/* L'Artisan text */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ 
                opacity: lArtisanOpacity,
                transform: `translateY(-60px)`,
              }}
            >
              <h2 className="text-[var(--accent)] text-7xl md:text-8xl font-light tracking-widest uppercase"
                  style={{ textShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
                L&apos;Artisan
              </h2>
            </motion.div>
            
            {/* Moderne text */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ 
                opacity: moderneOpacity,
                transform: `translateY(60px)`,
              }}
            >
              <h2 className="text-[var(--accent)] text-7xl md:text-8xl font-light tracking-widest uppercase"
                  style={{ textShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
                Moderne
              </h2>
            </motion.div>
            
            {/* Final message - "Notre Philosophie" */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ 
                opacity: finalTextOpacity,
                transition: 'opacity 0.7s ease',
              }}
            >
              <div className="text-center max-w-lg px-6">
                <h3 className="text-[var(--accent)] text-3xl md:text-4xl font-light mb-6">Notre Philosophie</h3>
                <p className="text-white/90 text-lg">
                  Passion, authenticité et innovation. Ces valeurs guident chacune de nos créations, 
                  des méthodes ancestrales aux techniques modernes, pour vous offrir une expérience gustative unique.
                </p>
                
                {/* Scroll indicator at the end of the section */}
                <motion.div 
                  className="mt-12 flex justify-center"
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    opacity: finalTextOpacity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative borders that appear gradually */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: Math.min(scrollProgress * 2, 0.25),
              }}
            >
              <div className="absolute top-[10%] left-[10%] w-24 h-24 border-t border-l border-[var(--accent)]"></div>
              <div className="absolute bottom-[10%] right-[10%] w-24 h-24 border-b border-r border-[var(--accent)]"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating content elements that appear and disappear */}
      {/* First content section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen flex items-center pointer-events-none"
        style={{ 
          opacity: firstContentOpacity,
          transform: `translateX(${firstContentX}px)`,
          transition: 'opacity 0.7s ease, transform 0.5s ease',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="absolute md:relative bottom-[40%] md:bottom-auto md:top-0 left-[10%] md:left-[15%] max-w-md text-left">
            <h2 className="text-[var(--accent)] mb-4 text-xl md:text-2xl">Tradition & Innovation</h2>
            <p className="text-white/90 leading-relaxed text-base md:text-lg">
              Notre boulangerie marie l&apos;excellence artisanale à une vision résolument moderne.
              Chaque baguette est façonnée à la main selon des méthodes ancestrales, adaptées 
              aux exigences contemporaines.
            </p>
          </div>
        </div>
      </div>
      
      {/* Second content section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen flex items-center pointer-events-none"
        style={{ 
          opacity: secondContentOpacity,
          transform: `translateX(${secondContentX}px)`,
          transition: 'opacity 0.7s ease, transform 0.5s ease',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="absolute md:relative top-[40%] md:top-0 right-[10%] md:right-[15%] max-w-md text-right">
            <h2 className="text-[var(--accent)] mb-4 text-xl md:text-2xl">Saveurs Authentiques</h2>
            <p className="text-white/90 leading-relaxed text-base md:text-lg">
              Des ingrédients soigneusement sélectionnés pour une expérience gustative incomparable.
              Notre levain naturel confère à nos pains des arômes complexes et une texture parfaite,
              résultat d&apos;un lent processus de fermentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 