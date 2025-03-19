import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';
import ProductsSection from './components/ProductsSection';
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
      
      {/* Massive spacer to completely separate content - this ensures that ScrollingBaguette 
          animations are fully completed before the next section appears */}
      <div className="h-[300vh] bg-gradient-to-b from-black to-black/95"></div>
      
      {/* Products showcase section - With extreme distance from previous content */}
      <section className="relative py-40 bg-black" id="products">
        <ProductsSection />
      </section>
      
      {/* Spacer between Products and Contact sections */}
      <div className="h-[50vh] bg-gradient-to-b from-black/95 to-black/90"></div>
      
      {/* Contact section */}
      <section className="relative py-32 bg-gradient-to-b from-black/90 to-black/85" id="contact">
        <ContactSection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
