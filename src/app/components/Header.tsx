'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg shadow-black/10' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-white font-light text-2xl tracking-tighter transition-all duration-500">
            <span className={`text-[var(--accent)] transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-90'}`}>L&apos;</span>
            Artisan Moderne
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          {[
            { name: 'Accueil', path: '/' },
            { name: 'Nos Créations', path: '/nos-creations' },
            { name: 'Contact', path: '/#contact' }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`text-white/80 hover:text-white transition-all duration-300 text-sm uppercase tracking-widest border-b-2 ${
                scrolled ? 'border-transparent hover:border-[var(--accent)]/50' : 'border-transparent'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white transition-colors duration-300 hover:text-[var(--accent)]" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-500 ease-in-out ${
          menuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '60px' }}
      >
        <div className="container mx-auto px-6 py-10">
          <nav className="flex flex-col space-y-6">
            {[
              { name: 'Accueil', path: '/' },
              { name: 'Nos Créations', path: '/nos-creations' },
              { name: 'Contact', path: '/#contact' }
            ].map((item, index) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="text-white/70 hover:text-white text-xl transition-colors duration-300"
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease'
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-10 pt-10 border-t border-white/10 transition-all duration-500" style={{ 
            transitionDelay: '0.4s',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)'
          }}>
            <button className="button w-full">Contactez-nous</button>
          </div>
        </div>
      </div>
    </header>
  );
} 