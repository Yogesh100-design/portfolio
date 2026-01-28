import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiTerminal } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Yogesh100-design/', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yogesh-chavan-494196316/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:yogeshchavan1209@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 md:py-20 relative overflow-hidden border-t border-stone-900">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-5 space-y-6">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-stone-100 mb-2 tracking-tight">Yogesh Chavan<span className="text-emerald-500">.</span></h3>
              <p className="text-stone-500 leading-relaxed max-w-sm">
                Software Engineer focused on building scalable, performant, and user-centric digital experiences.
              </p>
            </motion.div>

            {/* Developer Status Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-stone-900/50 rounded-lg border border-stone-800 backdrop-blur-sm"
            >
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
               </span>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider leading-none mb-0.5">Current Status</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">Open to Work</span>
               </div>
            </motion.div>
          </div>

          {/* COLUMN 2: LINKS */}
          <div className="md:col-span-3 md:pl-8">
             <h4 className="text-stone-100 font-bold mb-6">Navigation</h4>
             <ul className="space-y-4">
               {quickLinks.map((link) => (
                 <li key={link.name}>
                   <a 
                     href={link.href} 
                     className="text-stone-500 hover:text-emerald-500 transition-colors text-sm font-medium flex items-center gap-2 group"
                   >
                     <span className="w-1.5 h-1.5 rounded-full bg-stone-800 group-hover:bg-emerald-500 transition-colors" />
                     {link.name}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* COLUMN 3: CONNECT */}
          <div className="md:col-span-4">
             <h4 className="text-stone-100 font-bold mb-6">Connect</h4>
             <div className="flex gap-4 mb-8">
               {socialLinks.map((social) => {
                 const Icon = social.icon;
                 return (
                   <a
                     key={social.label}
                     href={social.href}
                     target="_blank"
                     rel="noreferrer"
                     className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-stone-800 hover:border-emerald-600"
                     aria-label={social.label}
                   >
                     <Icon size={18} />
                   </a>
                 );
               })}
             </div>

             <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-3 mb-2 text-stone-200 font-mono text-sm">
                   <FiTerminal className="text-emerald-500" />
                   <span>Start a project?</span>
                </div>
                <p className="text-xs text-stone-500 mb-3">
                   Let's discuss how we can help your business grow.
                </p>
                <a href="mailto:yogeshchavan1209@gmail.com" className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1">
                   run_init.sh <span className="animate-pulse">_</span>
                </a>
             </div>
          </div>

        </div>

        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-stone-600">
           <p className="flex items-center gap-2">
              <span className="text-emerald-600">const</span> YEAR = {year};
           </p>
           <p>
              // Designed & Built by <span className="text-stone-400">Yogesh Chavan</span>
           </p>
        </div>

      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center z-50 group"
          >
            <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
