import { m as motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle Scroll Appearance
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Active Section Spy
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -35% 0px" } // Adjusted for better accuracy
    );
    sections.forEach(section => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const logoText = "yogesh".split("");

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'h-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100' 
            : 'h-24 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          
          {/* Logo */}
          <a 
            href="#home"
            className="relative z-50 group cursor-pointer flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
          >
            <motion.div className="text-3xl font-bold font-display tracking-tight flex gap-0.5 overflow-hidden">
               {logoText.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-stone-900 inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ 
                    y: -5,
                    color: "#059669", // emerald-600
                    transition: { duration: 0.2 }
                    }}
                >
                  {letter}
                </motion.span>
               ))}
               <motion.span 
                 className="text-emerald-500"
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.5, type: 'spring' }}
               >.</motion.span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => {
                         e.preventDefault();
                         document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                         setActiveSection(link.href.substring(1));
                      }}
                      className={`relative z-10 block px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {link.name}
                      
                      {/* Active Pill Background */}
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-stone-900 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 p-2 text-stone-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
             {isMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
          >
             <ul className="space-y-6 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-4xl font-display font-medium block ${
                      activeSection === link.href.substring(1) 
                        ? 'text-stone-900' 
                        : 'text-stone-400 hover:text-stone-900 transition-colors'
                    }`}
                  >
                     {link.name}
                  </a>
                </motion.li>
              ))}
             </ul>

             <motion.div 
               className="absolute bottom-12 text-stone-400 text-sm font-mono"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
             >
                Designed & Built by Yogesh
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
