
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteCarousel from './components/InfiniteCarousel';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <InfiniteCarousel />
      </main>

      <Footer />
    </div>
  );
};

export default App;
