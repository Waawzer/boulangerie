'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
          className={`max-w-4xl mx-auto text-center mt-[-5vh] transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <h1 className="text-white mb-8">
            <span className="block text-sm uppercase tracking-widest text-[var(--accent)] mb-3">Bienvenue chez</span>
            L&apos;Artisan Moderne
            <span className="block text-base font-light mt-4 text-white/80">Boulangerie d&apos;exception</span>
          </h1>
          
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Découvrez notre vision futuriste de la boulangerie artisanale, où tradition séculaire 
            et innovation avant-gardiste se rencontrent pour créer une expérience gustative unique.
          </p>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isVisible ? 0.7 : 0, 
          y: isVisible ? 0 : 10 
        }}
        transition={{ 
          delay: 1, 
          duration: 0.8,
        }}
      >
        <div className="flex flex-col items-center">
          <motion.div 
            className="h-16 w-8 border-2 border-white/20 rounded-full flex justify-center overflow-hidden"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.div 
              className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2"
              animate={{ 
                y: [0, 20, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-1 opacity-20">
        <div className="w-12 h-48 border-l border-t border-[var(--accent)]"></div>
      </div>
      
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-1 opacity-20">
        <div className="w-12 h-48 border-r border-b border-[var(--accent)]"></div>
      </div>
    </section>
  );
} 