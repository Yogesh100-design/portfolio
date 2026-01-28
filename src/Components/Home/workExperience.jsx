import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { FaBuilding, FaCheck, FaArrowRight, FaLaptopCode, FaTrophy } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    title: "College Website Developer",
    subtitle: "Frontend Engineering & Git Excellence",
    role: "Frontend Developer",
    period: "2023 - Present",
    type: "Development",
    icon: FaLaptopCode,
    description: "Led the redevelopment of my college's official website with modern, scalable architecture and enterprise-grade version control.",
    achievements: [
      "Built modular, reusable component architecture",
      "Established clean folder structures and naming conventions",
      "Implemented responsive design across all breakpoints",
      "Maintained 100% Git hygiene with semantic commits"
    ],
    tech: ["React", "Tailwind CSS", "Git", "GitHub", "Vite"]
  },
  {
    id: 2,
    title: "Smart India Hackathon",
    subtitle: "Full-Stack Innovation Under Pressure",
    role: "Full-Stack Developer",
    period: "2024",
    type: "Competition",
    icon: FaTrophy,
    description: "Engineered production-ready full-stack solutions in 48-hour sprints, competing against 500+ teams nationwide.",
    achievements: [
      "Shipped 2 complete MERN stack applications",
      "Implemented JWT auth with 99.9% security score",
      "Optimized API response times by 60%",
      "Built real-time collaborative features"
    ],
    tech: ["React", "Node.js", "MongoDB", "JWT", "WebSocket"]
  }
];

const TimelineCard = ({ exp, index }) => {
  const isOdd = index % 2 !== 0;
  const Icon = exp.icon;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
       
       {/* Card Content Section */}
       <div className={`flex items-center w-full md:w-[calc(50%-40px)] ${isOdd ? 'justify-start' : 'justify-end'}`}>
          <motion.div
            initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className={`w-full bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-shadow duration-300 relative z-10
                before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:border-t before:border-r before:border-stone-100 before:rotate-45 
                ${isOdd ? 'before:-left-2 md:before:-left-2' : 'before:-left-2 md:before:-right-2 md:before:border-t md:before:border-r'}
                before:top-8 md:before:border-stone-100
            `}
          >
             {/* Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                   <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1 block">{exp.type}</span>
                   <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-600 transition-colors">{exp.title}</h3>
                </div>
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-mono font-bold whitespace-nowrap">
                   {exp.period}
                </span>
             </div>

             <div className="flex items-center gap-2 mb-4 text-sm font-medium text-stone-500">
               <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md"><Icon size={12} /></span>
               {exp.role}
             </div>

             <p className="text-stone-600 text-sm leading-relaxed mb-6">
               {exp.description}
             </p>

             <ul className="space-y-2 mb-6 bg-stone-50/50 p-4 rounded-lg">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-stone-700">
                     <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" size={10} /> 
                     <span>{item}</span>
                  </li>
                ))}
             </ul>

             <div className="flex flex-wrap gap-2">
               {exp.tech.map(t => (
                 <span key={t} className="px-2 py-1 bg-white border border-stone-200 rounded text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-wide">
                   {t}
                 </span>
               ))}
             </div>
          </motion.div>
       </div>

       {/* Center Node (Absolute on Mobile, Relative on Desktop) */}
       <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex flex-col items-center justify-center md:relative md:w-20 h-full">
         
         <motion.div 
           initial={{ scale: 0, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ delay: 0.2, type: "spring" }}
           className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500 border-4 border-stone-100 z-20 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
         />
       </div>

    </div>
  );
};

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-24 bg-stone-50/50 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
           <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-900 mb-6"
           >
             Professional <span className="text-emerald-600">Journey</span>
           </motion.h2>
           <p className="text-lg text-stone-600 leading-relaxed max-w-xl mx-auto">
             Tracing the path from foundational learning to complex full-stack engineering and hackathon victories.
           </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
           {/* THE TIMELINE TRACK (Grey Background Line) */}
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 -translate-x-1/2 md:translate-x-[-1px]" />

           {/* THE PROGRESS LINE (Animated Colored Line) */}
           <motion.div 
             className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 origin-top -translate-x-1/2 md:translate-x-[-1px] z-10"
             style={{ height: "100%", scaleY }}
           >
             {/* The "Spark" at the tip of the line */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_4px_rgba(16,185,129,0.6)] z-30">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
             </div>
           </motion.div>

           <div className="space-y-12 md:space-y-24 pb-24">
             {experiences.map((exp, index) => (
               <TimelineCard key={exp.id} exp={exp} index={index} />
             ))}
           </div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
        >
            <a href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 group px-6 py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-emerald-500/20">
                <span>Resume / CV</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </a>
        </motion.div>
      </div>
    </section>
  );
}