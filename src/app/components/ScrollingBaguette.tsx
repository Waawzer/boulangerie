'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollingBaguette() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fonction pour gérer le défilement
    const handleScroll = () => {
      // Position de défilement actuelle
      const currentScrollPos = window.scrollY;
      
      // Hauteur du viewport
      const viewportHeight = window.innerHeight;
      
      // Position par rapport au conteneur
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        
        // Calculer la progression du défilement dans ce conteneur (0 à 1)
        const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - top) / (viewportHeight + height)));
        
        setScrollPosition(scrollProgress);
        
        // Déterminer la section active basée sur la progression
        if (scrollProgress < 0.3) {
          setActiveSection(0); // Introduction et baguette
        } else if (scrollProgress < 0.6) {
          setActiveSection(1); // L'Artisan
        } else if (scrollProgress < 0.9) {
          setActiveSection(2); // Moderne
        } else {
          setActiveSection(3); // Section finale/transition
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initialiser
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  // Calculer les opacités pour les transitions entre sections
  const introOpacity = activeSection === 0 
    ? Math.min(scrollPosition * 3, 1) 
    : (activeSection > 0 ? 0 : 1);
  
  const section1Opacity = activeSection === 1 
    ? Math.min((scrollPosition - 0.3) * 3, 1) 
    : (activeSection > 1 ? 0 : (activeSection < 1 ? 0 : 1));
  
  const section2Opacity = activeSection === 2 
    ? Math.min((scrollPosition - 0.6) * 3, 1) 
    : (activeSection > 2 ? 0 : (activeSection < 2 ? 0 : 1));
  
  const finalSectionOpacity = activeSection === 3 
    ? Math.min((scrollPosition - 0.9) * 10, 1) 
    : 0;
  
  // Transformations 3D pour chaque section
  const transformSection1 = activeSection === 0 
    ? `perspective(1000px) rotateY(0deg)` 
    : `perspective(1000px) rotateY(-20deg) translateX(-100px) scale(0.8)`;
  
  const transformSection2 = activeSection === 1 
    ? `perspective(1000px) rotateY(0deg)` 
    : `perspective(1000px) rotateY(${activeSection < 1 ? '20deg' : '-20deg'}) translateX(${activeSection < 1 ? '100px' : '-100px'}) scale(0.8)`;
  
  const transformSection3 = activeSection === 2 
    ? `perspective(1000px) rotateY(0deg)` 
    : `perspective(1000px) rotateY(${activeSection < 2 ? '20deg' : '-20deg'}) translateX(${activeSection < 2 ? '100px' : '-100px'}) scale(0.8)`;
  
  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] overflow-hidden"
    >
      {/* Conteneur fixe pour garder le contenu en vue */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        {/* Sections empilées avec z-index contrôlé par l'état actif */}
        
        {/* Section d'introduction - Baguette en plein écran */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{ 
            opacity: introOpacity,
            zIndex: activeSection === 0 ? 30 : 10,
            pointerEvents: activeSection === 0 ? 'auto' : 'none'
          }}
        >
          <div className="relative w-full max-w-6xl h-[80vh] mx-auto overflow-hidden">
            {/* Image de la baguette avec effet de révélation */}
            <div className="relative w-full h-full">
              <Image
                src="/images/baguette.jpg"
                alt="Baguette artisanale"
                fill
                style={{ 
                  objectFit: 'contain',
                  transition: 'transform 1.2s ease-out, filter 1.2s ease-out',
                  transform: `scale(${1 + scrollPosition * 0.05})`,
                  filter: `brightness(${1 - scrollPosition * 0.3}) contrast(${1 + scrollPosition * 0.3})`
                }}
                priority
              />
              {/* Overlay pour ajouter une ambiance */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"
                style={{
                  opacity: scrollPosition * 0.7
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Section 1 - L'Artisan */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{ 
            opacity: section1Opacity,
            transform: transformSection2,
            zIndex: activeSection === 1 ? 30 : 20,
            pointerEvents: activeSection === 1 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 
              className="text-[var(--accent)] text-7xl md:text-8xl font-light tracking-widest uppercase mb-12"
              style={{
                textShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
              }}
            >
              L&apos;Artisan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-left">
                <h3 className="text-[var(--accent)] text-3xl mb-6">Tradition</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Notre boulangerie perpétue les méthodes ancestrales, où chaque baguette est façonnée à la main 
                  avec passion et savoir-faire. La transmission de ces gestes précis est au cœur de notre engagement.
                </p>
              </div>
              
              <div className="text-left">
                <h3 className="text-[var(--accent)] text-3xl mb-6">Excellence</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  La recherche constante de la perfection guide notre travail quotidien. 
                  Nous sélectionnons rigoureusement nos ingrédients pour garantir une qualité irréprochable 
                  à chacune de nos créations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section 2 - Moderne */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{ 
            opacity: section2Opacity,
            transform: transformSection3,
            zIndex: activeSection === 2 ? 30 : 20,
            pointerEvents: activeSection === 2 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 
              className="text-[var(--accent)] text-7xl md:text-8xl font-light tracking-widest uppercase mb-12"
              style={{
                textShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
              }}
            >
              Moderne
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-left">
                <h3 className="text-[var(--accent)] text-3xl mb-6">Innovation</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Notre vision contemporaine de la boulangerie nous pousse à innover constamment, 
                  en intégrant les avancées technologiques pour sublimer les recettes traditionnelles 
                  tout en préservant leur authenticité.
                </p>
              </div>
              
              <div className="text-left">
                <h3 className="text-[var(--accent)] text-3xl mb-6">Saveurs Authentiques</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Notre levain naturel, cultivé avec soin, confère à nos pains des arômes complexes 
                  et une mie alvéolée parfaite. L'équilibre entre tradition et modernité se retrouve 
                  dans chaque bouchée.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section finale - Transition vers la suite */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{ 
            opacity: finalSectionOpacity,
            zIndex: activeSection === 3 ? 40 : 0,
            background: 'black',
            pointerEvents: activeSection === 3 ? 'auto' : 'none'
          }}
        >
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-[var(--accent)] text-5xl md:text-6xl font-light mb-8">
              Notre Engagement
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-3xl mx-auto">
              Découvrez une expérience gustative unique, fruit de notre passion pour l'excellence 
              et l'innovation dans le respect des traditions boulangères.
            </p>
            <div className="inline-block">
              <button className="button text-lg px-8 py-3">
                Découvrir nos créations
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marqueur invisible pour le scrolljacking - contrôle la hauteur du composant */}
      <div className="opacity-0">
        {/* Ce contenu est invisible mais définit la hauteur du composant pour le défilement */}
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
} 