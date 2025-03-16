'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-white font-light text-2xl tracking-tighter">
            <span className="text-[var(--accent)]">L&apos;</span>Artisan Moderne
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Notre Histoire', 'Produits', 'Savoir-faire', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
        </nav>
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
} 