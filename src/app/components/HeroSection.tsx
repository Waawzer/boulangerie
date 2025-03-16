'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <h1 className="text-white mb-6">
            <span className="block text-sm uppercase tracking-widest text-[var(--accent)] mb-3">Bienvenue chez</span>
            L&apos;Artisan Moderne
            <span className="block text-base font-light mt-4 text-white/80">Boulangerie d&apos;exception</span>
          </h1>
          
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Découvrez notre vision futuriste de la boulangerie artisanale, où tradition séculaire 
            et innovation avant-gardiste se rencontrent pour créer une expérience gustative unique.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="button">Découvrir nos créations</button>
            <button className="text-white hover:text-[var(--accent)] transition-colors">
              En savoir plus &rarr;
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div 
          className={`flex flex-col items-center transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <p className="text-white/50 text-sm mb-2">Découvrez notre histoire</p>
          <div className="w-0.5 h-12 bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 