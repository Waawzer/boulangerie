import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/boulangerie.jpg"
            alt="Contactez notre boulangerie"
            fill
            className="object-cover"
            style={{
              objectPosition: 'center',
              filter: 'brightness(0.4) contrast(1.2)',
            }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-white mb-6">
            <span className="block text-sm uppercase tracking-widest text-[var(--accent)] mb-3">L&apos;Artisan Moderne</span>
            Rencontrons-nous
            <span className="block text-base font-light mt-4 text-white/80">Venez nous rendre visite</span>
          </h1>
          
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Notre équipe se tient à votre disposition pour répondre à toutes vos questions
            et vous accueillir dans notre boulangerie pour partager notre passion du pain.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[var(--accent)] opacity-50"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[var(--accent)] opacity-50"></div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-black to-black/95">
        <ContactSection />
      </section>
      
      {/* Map and Hours Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="order-2 md:order-1">
              <h2 className="text-[var(--accent)] mb-8">Horaires d&apos;ouverture</h2>
              
              <div className="space-y-4 mb-12">
                {[
                  { day: 'Lundi - Vendredi', hours: '7h00 - 19h30' },
                  { day: 'Samedi', hours: '7h00 - 20h00' },
                  { day: 'Dimanche', hours: '7h00 - 13h00' },
                  { day: 'Jours fériés', hours: 'Horaires spéciaux' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">{item.day}</span>
                    <span className="text-[var(--accent)]">{item.hours}</span>
                  </div>
                ))}
              </div>
              
              <h2 className="text-[var(--accent)] mb-6">Comment nous trouver</h2>
              <p className="text-white/70 mb-4 leading-relaxed">
                Notre boulangerie est située en plein cœur du centre-ville,
                à deux pas de la place principale et facilement accessible en transports en commun.
              </p>
              <p className="text-white/70 mb-10 leading-relaxed">
                Un parking gratuit est à votre disposition à proximité.
              </p>
              
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-[1px] bg-[var(--accent)]"></div>
                <span className="text-[var(--accent)] text-sm uppercase tracking-widest">Adresse</span>
              </div>
              
              <address className="text-white/70 not-italic mb-8">
                123 Rue de la Boulangerie<br />
                75001 Paris<br />
                France
              </address>
              
              <Link href="https://maps.google.com" target="_blank" className="button button-sm button-outline">
                Voir sur Google Maps
              </Link>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 rounded-lg overflow-hidden">
                {/* Placeholder for map - would be replaced with actual Google Maps integration */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white/50 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p>Carte interactive</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[var(--accent)] opacity-50"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-black/95 to-black/90">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[var(--accent)] mb-6">Envie de découvrir nos créations ?</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Venez déguster nos pains artisanaux et découvrir l'ensemble de notre gamme de produits faits maison.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/nos-creations" className="button">Voir nos créations</Link>
            <Link href="/" className="text-white hover:text-[var(--accent)] transition-colors">
              Retour à l&apos;accueil &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 