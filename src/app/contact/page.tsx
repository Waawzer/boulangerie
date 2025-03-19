'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      
      <div className="h-28 md:h-36"></div> {/* Spacer for header */}
      
      {/* Interactive Contact Hub */}
      <div className="relative bg-black z-10">
        <div className="absolute inset-0 radial-gradient opacity-30"></div>
        
        <section className="relative py-24 overflow-hidden z-20">
          <motion.div 
            className="container mx-auto px-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-24" variants={itemVariants}>
              <span className="inline-block text-sm uppercase tracking-widest text-[var(--accent)] mb-4">L&apos;Artisan Moderne</span>
              <h1 className="text-5xl md:text-7xl font-light text-white mb-8">Rencontrons-nous</h1>
              <div className="w-32 h-[1px] bg-[var(--accent)]/50 mx-auto"></div>
            </motion.div>
            
            {/* Tab Navigation */}
            <motion.div 
              className="flex justify-center mb-20"
              variants={itemVariants}
            >
              <div className="inline-flex bg-black/50 backdrop-blur-sm rounded-full border border-white/10 p-1.5">
                {['contact', 'horaires', 'localisation'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-[var(--accent)] text-black' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab === 'contact' ? 'Contact' : tab === 'horaires' ? 'Horaires' : 'Nous trouver'}
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Content Container */}
            <div className="max-w-5xl mx-auto">
              {/* Contact Tab */}
              <motion.div 
                className={`${activeTab === 'contact' ? 'block' : 'hidden'}`}
                initial="hidden"
                animate={activeTab === 'contact' ? "visible" : "hidden"}
                variants={containerVariants}
                key="contact-tab"
              >
                <motion.div variants={itemVariants}>
                  <div className="p-10 md:p-16 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/5 shadow-xl">
                    <h2 className="text-[var(--accent)] mb-12 text-3xl font-light text-center">Contactez-nous</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                      {/* Phone Contact */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[var(--accent)]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <h3 className="text-[var(--accent)] mb-4 text-xl font-light">Par téléphone</h3>
                        <a href="tel:+33123456789" className="text-white/80 hover:text-white transition-colors text-lg">
                          +33 1 23 45 67 89
                        </a>
                        <p className="text-white/60 mt-2 text-sm">
                          Du lundi au vendredi<br/>9h00 - 18h00
                        </p>
                      </div>
                      
                      {/* Email Contact */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[var(--accent)]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <h3 className="text-[var(--accent)] mb-4 text-xl font-light">Par email</h3>
                        <a href="mailto:contact@artisanmoderne.fr" className="text-white/80 hover:text-white transition-colors text-lg">
                          contact@artisanmoderne.fr
                        </a>
                        <p className="text-white/60 mt-2 text-sm">
                          Réponse sous 24 à 48h
                        </p>
                      </div>
                      
                      {/* Social Media */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                          <svg viewBox="0 0 24 24" className="w-8 h-8 text-[var(--accent)]">
                            <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                          </svg>
                        </div>
                        <h3 className="text-[var(--accent)] mb-4 text-xl font-light">Réseaux sociaux</h3>
                        <div className="flex justify-center space-x-6 mt-2">
                          {[
                            { icon: 'M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7775 6.84201C12.7435 7.24068 12.0568 8.21534 12.0002 9.33334V10C9.83353 10.0833 7.91353 9.04201 6.66686 7.33334C6.66686 7.33334 3.87353 12.2667 8.00019 14.6667C6.75353 15.4833 5.78019 15.9167 4.66686 16C6.25353 16.9833 8.00019 17.3333 9.66686 17C11.5802 17 13.3072 16.3333 14.7072 15.1833C16.1072 14.0333 17.0002 12.39 17.0002 10.5833C17.0002 10.3333 17.0002 10.0833 16.9535 9.84201C17.7072 9.00001 18.0002 8.00001 18.6668 6.67334Z', name: 'Twitter' },
                            { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', name: 'Instagram' },
                            { icon: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z', name: 'Facebook' }
                          ].map((item, index) => (
                            <a 
                              href="#" 
                              key={index} 
                              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--accent)]/20 flex items-center justify-center transition-all duration-300 group"
                              aria-label={item.name}
                            >
                              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[var(--accent)] group-hover:text-[var(--accent)]">
                                <path fill="currentColor" d={item.icon} />
                              </svg>
                            </a>
                          ))}
                        </div>
                        <p className="text-white/60 mt-4 text-sm">
                          Suivez notre actualité
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-16 pt-8 border-t border-white/10 text-center">
                      <p className="text-white/70 mb-8">
                        Pour toute demande spécifique ou pour commander en grand volume, n&apos;hésitez pas à nous contacter directement.
                      </p>
                      <Link href="/nos-creations" className="button px-10 py-4 hover-lift">
                        Découvrir nos produits
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Horaires Tab */}
              <motion.div 
                className={`${activeTab === 'horaires' ? 'block' : 'hidden'}`}
                initial="hidden"
                animate={activeTab === 'horaires' ? "visible" : "hidden"}
                variants={containerVariants}
                key="horaires-tab"
              >
                <motion.div 
                  className="p-10 md:p-16 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/5 shadow-xl"
                  variants={itemVariants}
                >
                  <h2 className="text-[var(--accent)] mb-12 text-3xl font-light text-center">Nos horaires d&apos;ouverture</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20 max-w-4xl mx-auto">
                    <div className="col-span-2 md:col-span-1">
                      <div className="relative">
                        <div className="absolute -left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent"></div>
                        
                        <h3 className="text-[var(--accent)] mb-8 text-2xl font-light">En semaine</h3>
                        <div className="space-y-8">
                          {[
                            { day: 'Lundi', hours: ['7h00 - 19h30'] },
                            { day: 'Mardi', hours: ['7h00 - 19h30'] },
                            { day: 'Mercredi', hours: ['7h00 - 19h30'] },
                            { day: 'Jeudi', hours: ['7h00 - 19h30'] },
                            { day: 'Vendredi', hours: ['7h00 - 20h00'] }
                          ].map((item, index) => (
                            <div key={index} className="group">
                              <div className="flex justify-between items-center py-3 border-b border-white/10 group-hover:border-[var(--accent)]/30 transition-colors duration-300">
                                <span className="text-white/80 group-hover:text-white transition-colors duration-300 text-lg">{item.day}</span>
                                <span className="text-[var(--accent)] text-lg">{item.hours[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <div className="relative">
                        <div className="absolute -left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent"></div>
                        
                        <h3 className="text-[var(--accent)] mb-8 text-2xl font-light">Weekend & jours fériés</h3>
                        <div className="space-y-8">
                          {[
                            { day: 'Samedi', hours: ['7h00 - 20h00'] },
                            { day: 'Dimanche', hours: ['7h00 - 13h00'] },
                            { day: 'Jours fériés', hours: ['Consultez notre page Facebook'] }
                          ].map((item, index) => (
                            <div key={index} className="group">
                              <div className="flex justify-between items-center py-3 border-b border-white/10 group-hover:border-[var(--accent)]/30 transition-colors duration-300">
                                <span className="text-white/80 group-hover:text-white transition-colors duration-300 text-lg">{item.day}</span>
                                <span className="text-[var(--accent)] text-lg">{item.hours[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-16 text-center">
                    <div className="p-8 bg-white/[0.02] rounded-lg border border-white/5 max-w-2xl mx-auto mb-8">
                      <p className="text-white/70 italic mb-0">
                        Pour les commandes spéciales, nous vous conseillons de nous contacter au minimum 48h à l&apos;avance.
                      </p>
                    </div>
                    <button className="px-10 py-4 button" onClick={() => setActiveTab('contact')}>
                      Nous contacter
                    </button>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Localisation Tab */}
              <motion.div 
                className={`${activeTab === 'localisation' ? 'block' : 'hidden'}`}
                initial="hidden"
                animate={activeTab === 'localisation' ? "visible" : "hidden"}
                variants={containerVariants}
                key="localisation-tab"
              >
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="p-10 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/5 shadow-xl order-2 md:order-1">
                      <h2 className="text-[var(--accent)] mb-8 text-3xl font-light">Notre adresse</h2>
                      
                      <address className="text-white/80 not-italic mb-8 text-xl">
                        123 Rue de la Boulangerie<br />
                        75001 Paris<br />
                        France
                      </address>
                      
                      <div className="space-y-8 mb-10">
                        <div>
                          <h3 className="text-[var(--accent)] mb-3 text-xl">En transport</h3>
                          <p className="text-white/70 text-lg">
                            <span className="inline-block px-2 py-0.5 bg-blue-500 text-white text-xs rounded mr-1">M</span> Station Boulangerie (Ligne 1)<br />
                            <span className="inline-block px-2 py-0.5 bg-green-500 text-white text-xs rounded mr-1">B</span> Arrêt Place du Pain (Bus 42, 73)
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-[var(--accent)] mb-3 text-xl">En voiture</h3>
                          <p className="text-white/70 text-lg">
                            Parking gratuit &quot;Marché Central&quot; à 3 min à pied<br />
                            Places de stationnement disponibles dans la rue
                          </p>
                        </div>
                      </div>
                      
                      <Link href="https://maps.google.com" target="_blank" className="button button-outline px-8 py-3 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Voir sur Google Maps
                      </Link>
                    </div>
                    
                    <div className="relative h-[500px] rounded-xl overflow-hidden order-1 md:order-2 bg-white/[0.03] backdrop-blur-sm border border-white/5 shadow-xl">
                      {/* Placeholder for map - would be replaced with actual Google Maps integration */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/50 text-center p-8">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto mb-6 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <p className="text-2xl font-light mb-3">Carte interactive</p>
                          <p className="text-sm opacity-70">La carte s&apos;affichera ici dans la version finale</p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-6 left-6 w-20 h-20 border-t border-l border-[var(--accent)] opacity-30"></div>
                      <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-[var(--accent)] opacity-30"></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
} 