import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import profileImage from '../../assets/images/edu.jpg';

export default function Hero() {
  const yourName = "Yogesh Chavan";
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack Developer | Web Developer";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-primary-50 to-white py-16 md:py-24 relative overflow-hidden md:ml-20 md:mr-16">
      
      {/* Animated background elements */}
      <motion.div className="absolute top-20 right-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-10 pointer-events-none"
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-20 left-10 w-56 h-56 bg-primary-400 rounded-full blur-3xl opacity-5 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={`particle-${i}`} className="absolute w-1.5 h-1.5 bg-primary-400 rounded-full opacity-20"
          style={{ left: `${15 + i * 12}%`, top: `${15 + i * 10}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}

      <div className="container px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left order-2 md:order-1 space-y-6">
            <motion.h1 initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <motion.span variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } } }}
                className="text-primary-900 block">
                Hi, I'm
              </motion.span>
              <motion.span variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.1 } } }}
                className="text-primary-700 block mt-2">
                {yourName}
              </motion.span>
            </motion.h1>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium h-10 flex items-center justify-center md:justify-start">
              <span>{displayText}</span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-1 text-primary-500">
                |
              </motion.span>
            </motion.div>
            
            {/* Skill badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {['React', 'Node.js',  'MongoDB', 'JavaScript'].map((skill, i) => (
                <motion.span key={skill} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 + i * 0.07, type: "spring", stiffness: 300 }}
                  className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}>
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              className="text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              I build modern, responsive, and high-performing web applications. Let's create something amazing together.
            </motion.p>

            {/* Buttons with ripple effect */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <motion.a href="#projects" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-full shadow-xl shadow-primary-500/20 flex items-center gap-2 group relative overflow-hidden">
                <span>View Projects</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-lg">→</motion.span>
                <motion.span className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.4 }} />
              </motion.a>
              
              
            </motion.div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
              className="flex items-center justify-center md:justify-start gap-8 mt-6 pt-6 border-t border-primary-100">
              {[
                
              ].map((stat, i) => (
                <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.05 }}>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 + i * 0.1, type: "spring", stiffness: 400 }}
                    className="text-2xl font-bold text-primary-600 block">
                    {stat.number}
                  </motion.span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Glass Frame Profile Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 w-full max-w-sm md:max-w-lg">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
              className="relative group" whileHover={{ scale: 1.02 }}>
              
              {/* Main glass container */}
              <div className="relative p-4 bg-white/30 rounded-3xl border border-primary-200 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:shadow-primary-500/20 group-hover:border-primary-300">
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-primary-400/10 to-primary-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
      
                {/* Profile Image */}
                <img src={profileImage} alt={`${yourName} - Profile Photo`}
                  className="w-full aspect-square object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500?text=Profile+Image'; }} />
                
                {/* Hover ripple effect */}
                <motion.div className="absolute inset-4 rounded-2xl bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Corner decorative elements */}
              <motion.div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-primary-300/30 rounded-2xl pointer-events-none"
                animate={{ rotate: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute -bottom-6 -right-6 w-20 h-20 border-2 border-primary-300/30 rounded-2xl pointer-events-none"
                animate={{ rotate: [0, -15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}