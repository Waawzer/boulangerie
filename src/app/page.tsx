import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingBaguette from './components/ScrollingBaguette';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <ScrollingBaguette />
      <Footer />
    </main>
  );
}
