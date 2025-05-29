import React from 'react';
import Navbar from './components/Navbar';
import Hero from './HomePageSection/Hero';
import About from './HomePageSection/About';
import Services from './HomePageSection/Services';
import Projects from './HomePageSection/Projects';
import Testimonials from './HomePageSection/Testimonials';
import Skills from './HomePageSection/Skills';
import Contact from './HomePageSection/Contact';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      <main className='pt-10'>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Toaster/>
    </div>
  );
}

export default Home;