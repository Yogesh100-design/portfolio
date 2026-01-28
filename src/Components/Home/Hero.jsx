import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import profileImg from '../../assets/images/edu.jpg';

// A simple, elegant geometric background pattern
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-stone-50" />
    <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
  </div>
);

const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="whitespace-nowrap">
          {word.split("").map((character, charIndex) => (
             <motion.span
              key={charIndex}
              variants={child}
              className="inline-block cursor-pointer"
              whileHover={{
                 scale: 1.2,
                 y: -5,
                 color: "#059669", 
                 rotate: Math.random() * 8 - 4,
                 transition: { type: "spring", stiffness: 300 }
              }}
            >
              {character}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

// --- Antigravity/Magnetic Image Component ---
const GravityImage = () => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  
  // Magnetic pull effect
  const moveX = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(y, [-100, 100], [-20, 20]), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-80 h-96 md:w-96 md:h-[30rem] mx-auto perspective-1000 cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* Floating container that holds the image */}
      <motion.div
        className="w-full h-full relative rounded-2xl shadow-2xl overflow-hidden bg-stone-200 border border-white/50"
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          transformStyle: "preserve-3d",
        }}
        // Idle float animation (pauses on hover)
        animate={hover ? {} : { y: [0, -15, 0] }}
        transition={hover ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full transform-style-3d bg-stone-900">
           {/* The Image */}
           <motion.img 
             src={profileImg} 
             alt="Yogesh Chavan - Software Engineer and Full Stack Developer" 
             className="w-full h-full object-cover opacity-90 transition-transform duration-500 scale-105"
             style={{
               // Parallax effect for the image inside the card
               translateX: useTransform(x, [-100, 100], [-10, 10]),
               translateY: useTransform(y, [-100, 100], [-10, 10]),
             }}
           />
           
           {/* Glass overlay reflection */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
           
           {/* Dark gradient at bottom */}
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900/80 to-transparent pointer-events-none" />
           
           {/* Floating Badge inside 3D space */}
           <motion.div 
             className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg z-20"
             style={{ 
               transform: "translateZ(30px)", 
             }}
           >
             Developer
           </motion.div>
        </div>
      </motion.div>
      
      {/* Background Glow / Shadow */}
      <motion.div 
        className="absolute -inset-10 bg-emerald-500/20 blur-3xl -z-10 rounded-full opacity-60 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-stone-50">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-emerald-600 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-3 w-fit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ letterSpacing: "0.2em", transition: { duration: 0.3 } }}
              >
                <span className="w-8 h-[1px] bg-emerald-600 inline-block"></span>
                Software Engineer
              </motion.h2>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-8">
                <AnimatedText text="Building solid," delay={0.1} />
                <AnimatedText text="scalable digital" delay={0.3} />
                <div className="overflow-hidden">
                   <motion.div
                     initial={{ y: "100%" }}
                     animate={{ y: 0 }}
                     transition={{ delay: 0.5, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                     className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
                   >
                     solutions.
                   </motion.div>
                </div>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl text-stone-600 max-w-2xl leading-relaxed mb-10"
              >
                I'm Yogesh Chavan. I specialize in full-stack architecture, crafting high-performance web applications that bridge the gap between complex engineering and intuitive user experience.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                <a 
                  href="#projects" 
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-stone-900 px-8 font-medium text-white transition-all duration-300 hover:bg-stone-800 hover:w-40 w-36 neon-border-card"
                >
                  <div className="inline-flex whitespace-nowrap opacity-100 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-0">
                    My Work
                  </div>
                  <div className="absolute right-3.5 inline-flex opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                      <title>Arrow Right</title>
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </a>
                
                <a href="#contact" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">
                  Contact Me
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5 relative hidden lg:block perspective-1000">
             <GravityImage />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-400 opacity-0"
      >
        <div className="w-[1px] h-16 bg-stone-300 mx-auto mb-2"></div>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
