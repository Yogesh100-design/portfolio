import { Suspense, lazy } from 'react';
import Header from './Components/layouts/Header';
import Hero from './Components/Home/Hero';

// Lazy load components to improve performance
const Projects = lazy(() => import('./Components/Home/Projects'));
const Contact = lazy(() => import('./Components/Home/Contact'));
const Footer = lazy(() => import('./Components/layouts/Footer'));
const Skills = lazy(() => import('./Components/Home/Skills'));
const Experience = lazy(() => import('./Components/Home/workExperience'));

import project from './data/projects';

// Simple fallback loader
const PageLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<PageLoader />}>
          <Skills/>
          <Projects project={project} />
          <Experience/>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 bg-stone-950"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
