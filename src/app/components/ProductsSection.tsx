'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ProductsSection() {
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
  
  const products = [
    {
      name: "La Tradition",
      description: "Notre baguette signature, parfaite alliance de croustillant et de moelleux.",
      image: "/images/baguette.jpg"
    },
    {
      name: "Le Rustique",
      description: "Pain de campagne à la mie dense et au goût prononcé de levain.",
      image: "/images/boulangerie.jpg"
    },
    {
      name: "Le Céréales",
      description: "Pain complet aux cinq céréales pour une expérience gustative unique.",
      image: "/images/baguette.jpg"
    }
  ];
  
  return (
    <div 
      ref={sectionRef}
      className="container mx-auto px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`mb-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-[var(--accent)] mb-6">Nos Créations</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Découvrez notre sélection de pains artisanaux, élaborés chaque jour avec passion 
            et savoir-faire pour vous offrir une expérience gustative exceptionnelle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <div 
              key={product.name}
              className={`bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-1000 delay-${index * 200} ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 0.2}s`
              }}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-all duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl mb-3">{product.name}</h3>
                <p className="text-white/60 mb-4">{product.description}</p>
                <button className="text-[var(--accent)] text-sm hover:text-white transition-colors">
                  Découvrir →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`} style={{ transitionDelay: '0.6s' }}>
          <button className="button">Voir toute notre gamme</button>
        </div>
      </div>
    </div>
  );
} 