import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, 
  FaGithub, FaNpm, FaDatabase, FaCode, FaServer, FaTools, FaLayerGroup,
  FaDocker, FaAws
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostman, SiTypescript, SiVite
} from 'react-icons/si';
import { skillCategories } from '../../data/skills'; 

// --- Icon Mapping ---
const skillIconMap = {
  'HTML5': FaHtml5, 'CSS3': FaCss3Alt, 'JavaScript (ES6+)': FaJs,
  'React.js': FaReact, 'Tailwind CSS': SiTailwindcss, 'Bootstrap': FaBootstrap,
  'Node.js': FaNodeJs, 'Express.js': SiExpress, 'MongoDB (Mongoose)': SiMongodb,
  'MySQL (using PHP)': SiMysql, 'Git & GitHub': FaGithub, 'npm / yarn': FaNpm,
  'Postman': SiPostman, 'CRUD Operations': FaDatabase, 'MERN Stack': FaReact,
  'XAMPP': FaDatabase, 'MondoDB Compass': SiMongodb, 'Responsive Design': FaCss3Alt,
  'API Integration': FaJs, 'React Hooks (useState, useEffect, useContext)': FaReact, 'Vite': SiVite,
  'Authentication (JWT)': FaJs, 'Middleware Handling': FaNodeJs, 'REST APIs': FaServer
};

const SkillCard = ({ skill, index }) => {
  const Icon = skillIconMap[skill] || FaCode;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <div className="h-full p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden z-0">
        <div className="relative z-10 flex items-center gap-4">
           {/* Icon Box */}
           <div className="w-12 h-12 rounded-lg bg-stone-50 text-stone-600 flex items-center justify-center text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
             <Icon />
           </div>
           
           {/* Text */}
           <div>
             <h4 className="text-stone-700 font-semibold text-sm group-hover:text-stone-900 transition-colors">
               {skill}
             </h4>
           </div>
        </div>

        {/* Hover Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredSkills, setFilteredSkills] = useState([]);

  // Flatten all skills for "All" view with category metadata
  const allSkills = skillCategories.reduce((acc, cat) => {
    return [...acc, ...cat.skills.map(s => ({ name: s, category: cat.category }))];
  }, []);

  const categories = ["All", ...skillCategories.map(c => c.category)];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredSkills(allSkills);
    } else {
      const categoryData = skillCategories.find(c => c.category === activeCategory);
      setFilteredSkills(categoryData ? categoryData.skills.map(s => ({ name: s, category: activeCategory })) : []);
    }
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 bg-stone-50/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
           <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-900 mb-4"
           >
             Technical <span className="text-emerald-600">Arsenal</span>
           </motion.h2>
           <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600"
           >
             Explore the technologies I use to craft exceptional digital experiences. 
             Filter by category to see specific skill sets.
           </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? 'text-white' : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-stone-900 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat === 'Full-Stack / Tools' ? 'Tools' : cat.replace(' Skills', '')}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode='popLayout'>
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill.name} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
