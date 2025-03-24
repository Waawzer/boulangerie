'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';

export default function Home() {
  // Précharger le modèle 3D dès la page d'accueil
  useEffect(() => {
    // Préchargement du modèle bread.glb pour la page Nos Créations via fetch
    const preloadModel = async () => {
      try {
        // Faire un fetch pour mettre le modèle en cache
        const modelCache = await fetch('/images/bread.glb');
        console.log('Modèle 3D préchargé avec succès via fetch');
        
        // Marquer comme préchargé pour les futures navigations
        try {
          sessionStorage.setItem('modelPreloaded', 'true');
        } catch (e) {
          console.log('Impossible d\'utiliser sessionStorage:', e);
        }
        
        // Précharger également le JavaScript nécessaire pour la page Nos Créations
        const sceneModule = await import('../app/nos-creations/Scene3D');
        sceneModule.preloadBreadModel(); // Utilise la fonction exportée
        console.log('Module Scene3D préchargé avec succès');
      } catch (error) {
        console.log('Erreur lors du préchargement:', error);
      }
    };
    
    // Lancer le préchargement après un court délai pour ne pas bloquer le rendu initial
    const timer = setTimeout(() => {
      preloadModel();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <Header />
      
      {/* Hero section - Full height */}
      <section className="relative">
        <HeroSection />
      </section>
      
      {/* Baguette scrolling experience - Larger height for smooth transitions */}
      <section className="relative">
        <ScrollingBaguette />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
