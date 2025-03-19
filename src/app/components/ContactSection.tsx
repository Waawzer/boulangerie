'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="container mx-auto px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`mb-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-[var(--accent)] mb-6">Rencontrons-nous</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Venez nous rendre visite pour déguster nos créations et découvrir notre univers. 
            Vous pouvez également nous contacter pour toute commande spéciale ou demande particulière.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div 
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-20'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-white text-xl mb-6">Contactez-nous</h3>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm mb-2">Nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-black/30 border border-white/10 rounded-md p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-black/30 border border-white/10 rounded-md p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full bg-black/30 border border-white/10 rounded-md p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors" 
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="button w-full">Envoyer</button>
            </form>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-20'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <h3 className="text-white text-xl mb-6">Horaires d&apos;ouverture</h3>
            <div className="space-y-4 mb-10">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Lundi - Vendredi</span>
                <span className="text-white">7h00 - 19h30</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Samedi</span>
                <span className="text-white">7h00 - 20h00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/70">Dimanche</span>
                <span className="text-white">8h00 - 13h00</span>
              </div>
            </div>
            
            <h3 className="text-white text-xl mb-6">Nous trouver</h3>
            <address className="not-italic text-white/70 space-y-2 mb-6">
              <p>42 Avenue des Champs-Élysées</p>
              <p>75008 Paris, France</p>
              <p>
                <a href="tel:+33123456789" className="text-[var(--accent)] hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </p>
              <p>
                <a href="mailto:contact@artisanmoderne.fr" className="text-[var(--accent)] hover:text-white transition-colors">
                  contact@artisanmoderne.fr
                </a>
              </p>
            </address>
            
            <div className="h-48 bg-black/20 border border-white/10 rounded-lg flex items-center justify-center">
              <p className="text-white/50 text-sm">Carte interactive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 