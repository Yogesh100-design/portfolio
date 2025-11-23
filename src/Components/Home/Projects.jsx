import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaStar } from 'react-icons/fa';
import { useState } from 'react';
// Assuming this path is correct
import { projects } from '../../data/projects'; 

// === 1. LOCAL IMAGE IMPORTS (CRITICAL FOR VISIBILITY) ===
import eduimage from '../../assets/images/Edumedia.jpg';
import money from '../../assets/images/money.jpeg';
import textUtils from '../../assets/images/textutils.jpeg';
import college from '../../assets/images/college.jpeg';
import news from '../../assets/images/news.webp';
import notes from '../../assets/images/notes.jpeg';

// --- CONFIGURATION ---
const PLACEHOLDER = 'https://via.placeholder.com/1200x800?text=Image+Unavailable';

const techEmojis = {
  React: '⚛️', Node: '🟢', MongoDB: '🍃', Express: '🚄', Tailwind: '🎨',
  JavaScript: '🟨', TypeScript: '🔷', MySQL: '🐬', Git: '📦', Vite: '⚡', JWT: '🔐',
  HTML: '📝', CSS: '🎨', Bootstrap: '🅱️', Postman: '📬', API: '🔌',
  Webhook: '🪝', CRUD: '💾', Responsive: '📱', MERN: '🚀', Hooks: '⚓'
};

// === IMAGE MAPPING LOGIC ===
const projectImageMap = {
  edumedia: eduimage,
  moneymanager: money,
  textutils: textUtils,
  svitcollegewebsiteclone: college, // Corrected key based on project.js titles
  newsappreact: news,              // Ensure keys match sanitized titles
  notenestmern: notes,
};

// Helper: sanitize a title -> key
const titleToKey = (title = '') =>
  title.toString().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

// Robust image getter: ensures a bundled path is always returned
const getProjectImage = (project) => {
  if (!project || !project.title) return PLACEHOLDER;

  // 1. Map lookup using sanitized title
  const key = titleToKey(project.title);
  if (projectImageMap[key]) return projectImageMap[key];
 
  // 2. Final fallback
  return PLACEHOLDER;
};


// --- Reusable Link Button Component ---
const LinkButton = ({ icon, text, href, variant = "default", onClick }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, x: 2 }}
    whileTap={{ scale: 0.95 }}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
      variant === "primary" 
        ? "bg-blue-500 text-white hover:bg-blue-600" 
        : "bg-gray-900 text-white hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </motion.a>
);

// --- Project Card Component ---
const ProjectCard = ({ project, index, onOpen }) => {
  // Determine image source using the robust getter
  const resolvedImage = getProjectImage(project);
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{ 
        scale: 1.03,
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.06, // Slightly faster stagger
        ease: [0.22, 1, 0.36, 1]
      }}
      onClick={() => onOpen(project)}
      style={{ willChange: 'transform' }} 
      className="relative group bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Animated gradient aura */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Image Section: Guaranteed visible image */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
        <motion.img
          src={resolvedImage} 
          alt={project.title || 'Project Image'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          // If the resolved local import fails, this will fall back to the generic PLACEHOLDER URL
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = PLACEHOLDER;
          }} 
          loading="lazy"
        />

        {/* Floating tech emojis */}
        <motion.div className="absolute top-4 left-4 flex gap-2">
          {techStack.slice(0, 4).map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.3, y: -5, rotate: 360 }}
              className="bg-white/90 p-2 rounded-lg shadow-md backdrop-blur-sm text-lg"
            >
              {techEmojis[tech] || '🛠️'}
            </motion.div>
          ))}
        </motion.div>

        {/* Featured badge */}
        {project.status === 'featured' && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3, stiffness: 300 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            <FaStar className="inline mr-1" /> Featured
          </motion.div>
        )}
      </div>

      {/* Content with staggered reveal */}
      <div className="p-5 md:p-6 relative z-10">
        
        {/* PROJECT INFO */}
        <motion.div 
          className="flex justify-between items-center mb-3 text-xs text-gray-500 bg-gray-50 rounded-lg p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, ease: "easeOut" }}
        >
          <span className="flex items-center gap-1">📅 {project.year || '—'}</span>
          <span className="flex items-center gap-1">🔧 {techStack.length} Technologies</span>
          <span className="flex items-center gap-1">⭐ {project.stars || 'New'}</span>
        </motion.div>
        
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {project.title || 'Untitled Project'}
        </motion.h3>
        
        <motion.p 
          className="text-sm md:text-base text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {project.description || 'No description provided.'}
        </motion.p>
        
        {/* Tech tags with unique stagger */}
        <motion.div className="flex flex-wrap gap-1.5 mb-5">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                delay: 0.5 + (i * 0.03), 
                type: "spring",
                stiffness: 350, 
                damping: 20
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-all hover:bg-blue-600 hover:text-white"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Links with sleek hover */}
        <div className="flex gap-2">
          {/* Added stopPropagation to prevent the card click from firing */}
          <LinkButton icon={<FaGithub />} text="Code" href={project.github} onClick={(e) => e.stopPropagation()} />
          {project.live && <LinkButton icon={<FaExternalLinkAlt />} text="Demo" href={project.live} variant="primary" onClick={(e) => e.stopPropagation()} />}
        </div>
      </div>
    </motion.div>
  );
};

// --- Project Modal Component ---
const ProjectModal = ({ project, onClose }) => {
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className="bg-slate-900/90 backdrop-blur-2xl text-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-white/10 z-10">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-3 bg-white/10 rounded-full transition-colors">
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-8">
          {/* MODAL IMAGE RENDERING LOGIC */}
          <motion.div 
            className="w-full h-96 object-cover rounded-2xl mb-8 shadow-2xl flex items-center justify-center bg-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
                src={getProjectImage(project)} 
                alt={project.title} 
                className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = PLACEHOLDER;
              }} 
            />
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium text-sm"
                >
                  {techEmojis[tech] || '🛠️'} {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            {/* Added target="_blank" and rel="noopener noreferrer" */}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-slate-900 px-6 py-3 rounded-xl text-center font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <FaGithub /> View Code
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-center font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Projects Component ---
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -30], { clamp: true });

  return (
    <section id="projects" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="container mx-auto px-4">
        
        {/* Animated Header */}
        <motion.div className="text-center mb-16 md:mb-20 relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
          >
            {projects.length} Innovations
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 mb-4"
          >
            Featured Projects
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '6rem' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore my latest work and innovations</p>
        </motion.div>

        {/* Dynamic Masonry Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
          ))}
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            key={selectedProject.id} 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}