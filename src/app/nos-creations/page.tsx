import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import Image from 'next/image';
import Link from 'next/link';

export default function NosCreationsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/baguette.jpg"
            alt="Nos créations artisanales"
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
            Nos Créations
            <span className="block text-base font-light mt-4 text-white/80">Découvrez notre savoir-faire</span>
          </h1>
          
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Un voyage gustatif entre tradition et modernité. Chaque création est le fruit 
            d&apos;un savoir-faire transmis de génération en génération et d&apos;une passion sans cesse renouvelée.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[var(--accent)] opacity-50"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[var(--accent)] opacity-50"></div>
      </section>
      
      {/* Introduction */}
      <section className="py-24 bg-gradient-to-b from-black to-black/95">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-[var(--accent)] mb-6">L&apos;Art du Pain</h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Créer un pain d&apos;exception demande patience, expertise et passion. 
                Nos artisans boulangers perpétuent des techniques ancestrales tout en innovant 
                constamment pour vous offrir des créations uniques.
              </p>
              <p className="text-white/70 mb-10 leading-relaxed">
                Chaque matin, nos fournils s&apos;animent dès l&apos;aube pour vous proposer des pains
                frais, croustillants et savoureux. Nos levains naturels, notre farine sélectionnée
                avec soin et notre cuisson au feu de bois confèrent à nos pains une saveur incomparable.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-[1px] bg-[var(--accent)]"></div>
                <span className="text-[var(--accent)] text-sm uppercase tracking-widest">Depuis 1987</span>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/boulangerie.jpg"
                  alt="Notre savoir-faire"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[var(--accent)] opacity-50"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-32 bg-black">
        <ProductsSection />
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-black/95 to-black/90">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[var(--accent)] mb-6">Venez Déguster Nos Créations</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Rien ne vaut l&apos;expérience de déguster nos pains fraîchement sortis du four.
            Venez nous rendre visite ou commandez en ligne pour découvrir notre gamme complète.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/#contact" className="button">Nous contacter</Link>
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