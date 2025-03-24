'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import dynamique des composants 3D pour éviter les erreurs d'hydratation
const Scene3D = dynamic(() => import('./Scene3D'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-[var(--accent)] border-opacity-20 rounded-full animate-spin"></div>
    </div>
  )
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Produit component with animations
interface ProduitProps {
  name: string;
  description: string;
  image: string;
  index: number;
}

const Produit = ({ name, description, image, index }: ProduitProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="product-card relative"
      style={{ 
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-light mb-2">{name}</h3>
          <p className="text-white/80 text-sm md:text-base">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function NosCreationsPage() {
  const quoteRef = useRef(null);
  const infoRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isModelPreloaded, setIsModelPreloaded] = useState(false);
  
  // Effet pour s'assurer que le rendu se fait uniquement côté client
  useEffect(() => {
    setIsMounted(true);
    
    // Préchargement des ressources
    const preloadTimer = setTimeout(() => {
      fetch('/images/bread.glb')
        .then(() => setIsModelPreloaded(true))
        .catch(() => setIsModelPreloaded(true)); // Préchargé même en cas d'erreur
    }, 10);
    
    return () => clearTimeout(preloadTimer);
  }, []);
  
  // Products data
  const products = [
    {
      name: "La Tradition",
      description: "Notre baguette emblématique, l'équilibre parfait entre croûte croustillante et mie aérée.",
      image: "/images/baguette.jpg"
    },
    {
      name: "Le Pain Complet",
      description: "Riche en fibres et en saveurs, idéal pour accompagner vos repas.",
      image: "/images/boulangerie.jpg"
    },
    {
      name: "Le Rustique",
      description: "Pain de campagne à la mie dense et au goût prononcé de levain naturel.",
      image: "/images/baguette.jpg"
    },
    {
      name: "Le Céréales",
      description: "Un mélange harmonieux de graines et céréales pour une texture unique.",
      image: "/images/boulangerie.jpg"
    },
    {
      name: "La Ficelle",
      description: "Fine et croustillante, parfaite pour vos apéritifs et plateaux de fromages.",
      image: "/images/baguette.jpg"
    },
    {
      name: "La Focaccia",
      description: "Inspirée de l'Italie, garnie d'huile d'olive et d'herbes aromatiques.",
      image: "/images/boulangerie.jpg"
    }
  ];
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.1], [0, -50]);
  
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <Header />
      
      {/* Hero Section with 3D Model */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Le modèle 3D est rendu uniquement côté client pour éviter les erreurs d'hydratation */}
        {isMounted && isModelPreloaded && <Scene3D scrollYProgress={smoothProgress} />}
        
        {/* Indicateur de chargement pendant le préchargement */}
        {isMounted && !isModelPreloaded && (
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-[var(--accent)] border-opacity-20 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[var(--accent)] text-sm">Chargement du modèle...</p>
            </div>
          </div>
        )}
        
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center"
            style={{ 
              opacity: titleOpacity,
              y: titleY
            }}
          >
            <motion.span 
              className="inline-block text-sm uppercase tracking-widest text-[var(--accent)] mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              L&apos;Artisan Moderne
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Collection
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Des créations artisanales uniques, façonnées avec passion et savoir-faire
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="white" fillOpacity="0.5">
              <animate attributeName="cy" from="12" to="24" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      </section>
      
      {/* Quote Section with Parallax */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div 
            ref={quoteRef}
            className="relative z-10 max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-10">
              Nous créons des pains d&apos;exception qui conjuguent <span className="text-[var(--accent)]">tradition ancestrale</span> et <span className="text-[var(--accent)]">innovation contemporaine</span>
            </h2>
            <div className="w-16 h-[1px] bg-[var(--accent)] mx-auto"></div>
          </motion.div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">Nos créations</h2>
            <p className="text-white/70 max-w-xl">
              Chaque jour, nos artisans boulangers façonnent avec passion des créations uniques, 
              alliant respect des traditions et recherche de nouvelles saveurs.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <Produit 
                key={product.name} 
                {...product} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 md:py-32 bg-black/90">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div 
            ref={infoRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <motion.h2 className="text-3xl md:text-4xl font-light mb-8 text-[var(--accent)]">
                Notre processus
              </motion.h2>
              <motion.div className="space-y-8">
                {[
                  { title: "Sélection", description: "Nos ingrédients sont choisis avec soin pour leur qualité exceptionnelle." },
                  { title: "Fermentation", description: "Nos levains naturels fermentent lentement pour développer des arômes complexes." },
                  { title: "Façonnage", description: "Chaque pièce est façonnée à la main, avec patience et précision." },
                  { title: "Cuisson", description: "La cuisson au feu de bois confère à nos pains leur caractère unique." }
                ].map((step, index) => (
                  <motion.div 
                    key={step.title}
                    className="flex gap-6"
                    variants={fadeInUp}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl mb-1 text-white">{step.title}</h3>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative aspect-square"
              variants={fadeIn}
            >
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/boulangerie.jpg"
                  alt="Notre processus artisanal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              <div className="absolute top-6 right-6 w-32 h-32 border-t border-r border-[var(--accent)] opacity-30"></div>
              <div className="absolute bottom-6 left-6 w-32 h-32 border-b border-l border-[var(--accent)] opacity-30"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span 
              className="inline-block text-sm uppercase tracking-widest text-[var(--accent)] mb-3"
              variants={fadeInUp}
            >
              Rencontrons-nous
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-6"
              variants={fadeInUp}
            >
              Venez déguster nos créations
            </motion.h2>
            <motion.p 
              className="text-white/70 mb-10"
              variants={fadeInUp}
            >
              Rien ne vaut l&apos;expérience de déguster nos pains fraîchement sortis du four.
              Venez nous rendre visite pour découvrir toutes nos créations.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={fadeInUp}
            >
              <Link href="/contact" className="button px-8 py-4">
                Nous contacter
              </Link>
              <Link href="/" className="text-white hover:text-[var(--accent)] transition-colors">
                Retour à l&apos;accueil &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 