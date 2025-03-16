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
      setScrollProgress(Math.min(scrollPercent * 1.5, 1)); // Multiply by 1.5 to make the effect happen faster
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
  
  // Calculate opacity for the engagement section - appears later at 85% scroll
  const engagementOpacity = scrollProgress > 0.85 ? Math.min((scrollProgress - 0.85) * 6.67, 1) : 0;
  
  // Calculate opacity for the first and second sections with more spacing
  // First section appears at 20% and fades out at 65%
  const firstSectionOpacity = scrollProgress > 0.2 
    ? (scrollProgress < 0.65 
        ? Math.min((scrollProgress - 0.2) * 3.33, 1) // Fade in more slowly (3.33 instead of 5)
        : Math.max(1 - (scrollProgress - 0.65) * 5, 0)) // Fade out at 65%
    : 0;
    
  // Second section appears at 50% and fades out at 75%  
  const secondSectionOpacity = scrollProgress > 0.5 
    ? (scrollProgress < 0.75 
        ? Math.min((scrollProgress - 0.5) * 4, 1) 
        : Math.max(1 - (scrollProgress - 0.75) * 5, 0))
    : 0;
    
  // Calculate opacity for the boulangerie image at the end - appears at 95%
  const boulangerieOpacity = scrollProgress > 0.99 ? Math.min((scrollProgress - 0.99) * 20, 1) : 0;
  
  // L'Artisan text only appears after initial scroll (10%) to avoid overlap with HeroSection
  const lArtisanOpacity = scrollProgress > 0.1 && scrollProgress < 0.4 
    ? Math.min((scrollProgress - 0.1) * 3.33, 1) 
    : (scrollProgress >= 0.4 && scrollProgress < 0.5 
        ? 1 
        : (scrollProgress >= 0.5 
            ? Math.max(1 - (scrollProgress - 0.5) * 10, 0) 
            : 0));
  
  // Moderne text appears later, after L'Artisan starts fading
  const moderneOpacity = scrollProgress > 0.55 && scrollProgress < 0.75 
    ? Math.min((scrollProgress - 0.55) * 5, 1) 
    : (scrollProgress >= 0.75 
        ? Math.max(1 - (scrollProgress - 0.75) * 10, 0) 
        : 0);
  
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
              transition: 'opacity 0.5s ease-out',
            }}
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                maskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
                WebkitMaskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
                transform: `scale(${1 + scrollProgress * 0.1})`,
                opacity: 1 - scrollProgress * 0.3,
                transition: 'transform 0.5s ease-out',
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
                className="transition-all duration-500"
              />
            </div>
          </div>
          
          {/* Boulangerie image that appears at the end */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: boulangerieOpacity,
              transition: 'opacity 0.8s ease-out',
              zIndex: 5,
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/boulangerie.jpg"
                alt="Notre boulangerie"
                fill
                style={{ 
                  objectFit: 'cover',
                }}
                className="transition-all duration-500"
              />
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                style={{
                  opacity: boulangerieOpacity,
                }}
              ></div>
            </div>
          </div>
          
          {/* L'Artisan text - appears after initial scroll */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              opacity: lArtisanOpacity,
              transition: 'opacity 0.5s ease',
              zIndex: 10,
            }}
          >
            <h2 
              className="text-[var(--accent)] text-8xl font-light tracking-widest uppercase"
              style={{
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                transform: `translateY(-30px)`,
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
              transition: 'opacity 0.5s ease',
              zIndex: 10,
            }}
          >
            <h2 
              className="text-[var(--accent)] text-8xl font-light tracking-widest uppercase"
              style={{
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                transform: `translateY(30px)`,
              }}
            >
              Moderne
            </h2>
          </div>
        </div>
      </div>
      
      {/* Content sections that appear as you scroll */}
      <div className="relative">
        {/* First section - appears at about 20% scroll and fades out at 65% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: firstSectionOpacity,
            transform: `translateY(${scrollProgress > 0.2 ? '0' : '50px'}) translateX(${scrollProgress > 0.65 ? (scrollProgress - 0.65) * -200 : 0}px)`,
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            zIndex: 10,
          }}
        >
          <div className="absolute bottom-[30%] left-[10%] max-w-md text-left">
            <h2 className="text-[var(--accent)] mb-4">Tradition & Innovation</h2>
            <p className="text-white/90">
              Notre boulangerie marie l&apos;excellence artisanale à une vision résolument moderne.
              Chaque baguette est façonnée à la main selon des méthodes ancestrales.
            </p>
          </div>
        </div>
        
        {/* Second section - appears at about 50% scroll and fades out at 75% */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: secondSectionOpacity,
            transform: `translateY(${scrollProgress > 0.5 ? '0' : '50px'}) translateX(${scrollProgress > 0.75 ? (scrollProgress - 0.75) * 200 : 0}px)`,
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            zIndex: 10,
          }}
        >
          <div className="absolute top-[30%] right-[10%] max-w-md text-right">
            <h2 className="text-[var(--accent)] mb-4">Saveurs Authentiques</h2>
            <p className="text-white/90">
              Des ingrédients soigneusement sélectionnés pour une expérience gustative incomparable.
              Notre levain naturel confère à nos pains des arômes complexes et une mie alvéolée parfaite.
            </p>
          </div>
        </div>
        
        {/* Notre Engagement section - appears at about 85% scroll */}
        <div 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
          style={{ 
            opacity: engagementOpacity,
            pointerEvents: engagementOpacity > 0.5 ? 'auto' : 'none',
            transition: 'opacity 0.8s ease',
            zIndex: 10,
          }}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 
                className="text-[var(--accent)] mb-8 text-5xl"
                style={{
                  transform: `translateY(${(1 - engagementOpacity) * 30}px)`,
                  transition: 'transform 0.8s ease',
                  opacity: engagementOpacity,
                }}
              >
                Notre Engagement
              </h2>
              <p 
                className="text-white/80 mb-12 text-lg"
                style={{
                  transform: `translateY(${(1 - engagementOpacity) * 40}px)`,
                  transition: 'transform 0.8s ease',
                  transitionDelay: '0.1s',
                  opacity: engagementOpacity,
                }}
              >
                Chez L&apos;Artisan Moderne, nous croyons que le pain est bien plus qu&apos;un simple aliment.
                C&apos;est une expérience sensorielle, un art millénaire que nous réinventons chaque jour
                avec passion et créativité. Notre engagement pour l&apos;excellence se traduit dans chaque
                création qui sort de nos fours.
              </p>
              
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                style={{
                  transform: `translateY(${(1 - engagementOpacity) * 50}px)`,
                  transition: 'transform 0.8s ease',
                  transitionDelay: '0.2s',
                  opacity: engagementOpacity,
                }}
              >
                {[
                  {
                    title: 'Qualité',
                    description: 'Des ingrédients soigneusement sélectionnés pour une expérience gustative incomparable.'
                  },
                  {
                    title: 'Innovation',
                    description: 'Une approche avant-gardiste qui repousse les limites de la boulangerie traditionnelle.'
                  },
                  {
                    title: 'Savoir-faire',
                    description: 'Un artisanat d&apos;exception perpétué et réinventé par nos maîtres boulangers.'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-lg"
                    style={{
                      transitionDelay: `${0.3 + index * 0.1}s`,
                    }}
                  >
                    <h3 className="text-white mb-4">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div 
                className="mt-16"
                style={{
                  transform: `translateY(${(1 - engagementOpacity) * 60}px)`,
                  transition: 'transform 0.8s ease',
                  transitionDelay: '0.6s',
                  opacity: engagementOpacity,
                }}
              >
                <button className="button">Découvrir notre histoire</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 