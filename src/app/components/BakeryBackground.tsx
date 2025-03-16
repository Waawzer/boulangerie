'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BakeryBackground() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Calculate scroll progress for effects
      // We want to start the effect when the user enters this section
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Start effect when the section is 20% in view
        const startPoint = -viewportHeight * 0.8;
        // End effect when the section is 40% in view
        const endPoint = -viewportHeight * 0.4;
        
        let progress = 0;
        if (rect.top <= startPoint) {
          progress = Math.min((startPoint - rect.top) / (startPoint - endPoint), 1);
        }
        
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once to initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate the opacity for the initial fade-in effect
  const fadeInOpacity = Math.min(scrollProgress * 3, 1);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0"
    >
      <div className="relative w-full h-full">
        {/* Bakery image with reveal effect */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: fadeInOpacity,
            transition: 'opacity 0.8s ease-out',
          }}
        >
          <div 
            className="relative w-full h-full overflow-hidden"
            style={{
              maskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
              WebkitMaskImage: `linear-gradient(90deg, transparent ${scrollProgress * 100}%, black 100%)`,
              transform: `scale(${1 + scrollProgress * 0.1})`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            <Image
              src="/images/boulangerie.jpg"
              alt="Intérieur de notre boulangerie"
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                filter: `brightness(0.4) contrast(1.2)`,
              }}
              priority
              className="transition-all duration-500"
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
        
        {/* Gold accent line that follows scroll */}
        <div 
          className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
          style={{ 
            transform: `translateX(${scrollProgress * 100}vw)`,
            opacity: scrollProgress > 0.05 ? 1 : 0,
            boxShadow: `0 0 20px 2px var(--accent)`,
          }}
        ></div>
        
        {/* Subtle text overlay that appears with scroll */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: scrollProgress * 0.7,
            top: '-10%',
          }}
        >
          <h2 
            className="text-[var(--accent)] text-8xl font-light tracking-widest uppercase"
            style={{
              transform: `translateX(${(1 - scrollProgress) * 50}px)`,
              textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
            }}
          >
            Moderne
          </h2>
        </div>
      </div>
    </div>
  );
} 