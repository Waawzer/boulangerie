import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';

export default function Home() {
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
