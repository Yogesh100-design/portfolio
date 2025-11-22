import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Yogesh100-design/' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yogesh-chavan-494196316/' },
    { icon: FiMail, href: 'mailto:yogeshchavan1209@gmail.com' },
  ];

  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="container text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-300 mb-6">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-400 text-sm">
            © 2024 Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}