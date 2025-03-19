import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';

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
      
      {/* Spacer to separate ScrollingBaguette from Contact section */}
      <div className="h-[30vh] bg-gradient-to-b from-black to-black/95"></div>
      
      {/* Contact section */}
      <section className="relative py-32 bg-gradient-to-b from-black/95 to-black/90" id="contact">
        <ContactSection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
