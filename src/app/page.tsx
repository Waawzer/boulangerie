import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';

// Nouveau composant pour la section des produits
const ProductsSection = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-[var(--accent)] text-4xl mb-6">Nos Créations</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Découvrez notre sélection de pains artisanaux, élaborés chaque jour avec passion 
            et savoir-faire pour vous offrir une expérience gustative exceptionnelle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
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
          ].map((product, index) => (
            <div 
              key={product.name}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
        
        <div className="mt-16 text-center">
          <button className="button">Voir toute notre gamme</button>
        </div>
      </div>
    </div>
  );
};

// Nouveau composant pour la section de contact
const ContactSection = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-[var(--accent)] text-4xl mb-6">Contact</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Venez nous rencontrer ou contactez-nous pour découvrir notre passion pour la boulangerie artisanale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h3 className="text-white text-xl mb-6">Nos coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-[var(--accent)] text-xl mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-1">Adresse</h4>
                  <p className="text-white/60">42 Rue du Pain Artisanal<br />75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-[var(--accent)] text-xl mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-1">Téléphone</h4>
                  <p className="text-white/60">+33 (0)1 23 45 67 89</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-[var(--accent)] text-xl mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-1">Email</h4>
                  <p className="text-white/60">contact@artisanmoderne.fr</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-[var(--accent)] text-xl mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-1">Horaires</h4>
                  <p className="text-white/60">Lun-Sam: 7h - 19h<br />Dimanche: 7h - 13h</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div>
            <h3 className="text-white text-xl mb-6">Envoyez-nous un message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:border-[var(--accent)] text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:border-[var(--accent)] text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:border-[var(--accent)] text-white"
                ></textarea>
              </div>
              
              <button type="submit" className="button w-full">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative">
      <Header />
      
      {/* Hero section - Full height */}
      <section className="relative">
        <HeroSection />
      </section>
      
      {/* Nouvelle expérience de défilement - 4 écrans de hauteur */}
      <section className="relative">
        <ScrollingBaguette />
      </section>
      
      {/* Espace suffisant pour assurer une séparation complète */}
      <div className="h-[100vh] bg-gradient-to-b from-black to-black/95"></div>
      
      {/* Section des produits */}
      <section className="relative py-40 bg-black" id="products">
        <ProductsSection />
      </section>
      
      {/* Espace entre les sections */}
      <div className="h-[30vh] bg-gradient-to-b from-black/95 to-black/90"></div>
      
      {/* Section de contact */}
      <section className="relative py-32 bg-gradient-to-b from-black/90 to-black/85" id="contact">
        <ContactSection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
