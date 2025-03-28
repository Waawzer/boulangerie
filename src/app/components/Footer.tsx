import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-black to-black/95 border-t border-white/5 py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div className="md:col-span-2">
            <Link href="/" className="text-white font-light text-xl tracking-tighter mb-8 inline-block">
              <span className="text-[var(--accent)]">L&apos;</span>Artisan Moderne
            </Link>
            <p className="text-white/60 max-w-md mt-6 mb-8">
              Notre boulangerie artisanale réinvente l&apos;art du pain en mariant tradition et innovation.
              Chaque création est le fruit d&apos;un savoir-faire d&apos;exception et d&apos;une quête permanente d&apos;excellence.
            </p>
            <div className="flex space-x-6 mt-8">
              {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--accent)] transition-colors hover-lift"
                >
                  <span className="sr-only">{social}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['Accueil', 'Notre Histoire', 'Produits', 'Savoir-faire', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/60 hover:text-white transition-colors hover-lift block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-8">Contact</h3>
            <address className="not-italic text-white/60 space-y-4">
              <p className="mb-4">42 Avenue des Champs-Élysées</p>
              <p className="mb-4">75008 Paris, France</p>
              <p className="mb-4">
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </p>
              <p>
                <a href="mailto:contact@artisanmoderne.fr" className="hover:text-white transition-colors">
                  contact@artisanmoderne.fr
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} L&apos;Artisan Moderne. Tous droits réservés.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/mentions-legales" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="relative mt-16 opacity-10">
          <div className="absolute left-0 top-0 w-16 h-16 border-l border-t border-[var(--accent)]"></div>
          <div className="absolute right-0 top-0 w-16 h-16 border-r border-t border-[var(--accent)]"></div>
        </div>
      </div>
    </footer>
  );
} 