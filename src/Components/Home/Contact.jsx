import { m as motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('submitting');
    
    // Creating the loading promise for toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("https://formsubmit.co/ajax/chavanyogesh8600@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "New Portfolio Contact",
            message: formData.message,
            _template: 'table'
        })
      });

      if (response.ok) {
        setStatus('success');
        toast.success("Message sent successfully!", { id: loadingToast });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset status after animation
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      toast.error("Something went wrong. Please try again.", { id: loadingToast });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-50 relative overflow-hidden">
      <Toaster position="bottom-center" toastOptions={{
         style: { background: '#333', color: '#fff' },
         duration: 4000
      }}/>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-300/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase mb-2 block">
            // Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Let's start a <span className="text-emerald-600">conversation.</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Interested in working together? I'm always open to discussing new projects, creative ideas, or opportunities, or just having a chat about tech.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Info (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group neon-border-card">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                
                <h3 className="text-2xl font-bold text-stone-900 mb-6 relative z-10">Contact Details</h3>
                
                <div className="space-y-6 relative z-10">
                   <a href="mailto:chavanyogesh8600@gmail.com" className="flex items-start gap-4 group/item">
                      <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                        <FiMail size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-stone-400 block mb-1">Email Me</span>
                        <span className="text-lg font-medium text-stone-900 group-hover/item:text-emerald-600 transition-colors">chavanyogesh8600@gmail.com</span>
                      </div>
                   </a>

                   <div className="flex items-start gap-4 group/item">
                      <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                        <FiMapPin size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-stone-400 block mb-1">Location</span>
                        <span className="text-lg font-medium text-stone-900">India</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-stone-900 p-8 rounded-3xl text-white relative overflow-hidden neon-border-card">
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-4">Availability Status</h3>
                   <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="font-medium text-emerald-400">Open to new opportunities</span>
                   </div>
                   <p className="mt-4 text-stone-400 text-sm leading-relaxed">
                     I'm currently available for freelance projects and full-time roles starting immediately.
                   </p>
                </div>
                {/* Abstract decoration */}
                <div className="absolute bottom-0 right-0 p-8 opacity-10">
                   <FiSend size={120} />
                </div>
             </div>
          </motion.div>

          {/* Form (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 neon-border-card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="relative group">
                   <label htmlFor="name" className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block group-focus-within:text-emerald-600 transition-colors">Your Name</label>
                   <input
                     id="name"
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     disabled={status ===('submitting' || 'success')}
                     className="w-full bg-stone-50 border-2 border-transparent px-4 py-3 rounded-xl text-stone-900 placeholder-stone-300 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                     placeholder="John Doe"
                   />
                 </div>
                 <div className="relative group">
                   <label htmlFor="email" className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block group-focus-within:text-emerald-600 transition-colors">Your Email</label>
                   <input
                     id="email"
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     disabled={status ===('submitting' || 'success')}
                     className="w-full bg-stone-50 border-2 border-transparent px-4 py-3 rounded-xl text-stone-900 placeholder-stone-300 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                     placeholder="john@example.com"
                   />
                 </div>
               </div>
               
               <div className="relative group">
                 <label htmlFor="subject" className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block group-focus-within:text-emerald-600 transition-colors">Subject</label>
                 <input
                   id="subject"
                   type="text"
                   name="subject"
                   value={formData.subject}
                   onChange={handleChange}
                   disabled={status ===('submitting' || 'success')}
                   className="w-full bg-stone-50 border-2 border-transparent px-4 py-3 rounded-xl text-stone-900 placeholder-stone-300 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
                   placeholder="Project Inquiry"
                 />
               </div>
               
               <div className="relative group">
                 <label htmlFor="message" className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block group-focus-within:text-emerald-600 transition-colors">Message</label>
                 <textarea
                   id="message"
                   name="message"
                   rows="4"
                   value={formData.message}
                   onChange={handleChange}
                   disabled={status ===('submitting' || 'success')}
                   className="w-full bg-stone-50 border-2 border-transparent px-4 py-3 rounded-xl text-stone-900 placeholder-stone-300 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all resize-none font-medium"
                   placeholder="Tell me about your project..."
                 />
               </div>
               
               <div className="pt-4">
                 <motion.button
                   whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                   whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                   disabled={status !== 'idle'}
                   type="submit"
                   className={`w-full py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
                     status === 'success' ? 'bg-emerald-500 text-white' : 
                     status === 'error' ? 'bg-red-500 text-white' :
                     'bg-stone-900 text-white hover:bg-stone-800'
                   }`}
                 >
                   <AnimatePresence mode="wait">
                     {status === 'idle' && (
                       <motion.div 
                         key="idle"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="flex items-center gap-2"
                       >
                         <FiSend size={18} />
                         <span>Send Message</span>
                       </motion.div>
                     )}
                     
                     {status === 'submitting' && (
                       <motion.div 
                         key="loading"
                         initial={{ opacity: 0, scale: 0.5 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.5 }}
                       >
                         <FiLoader className="animate-spin" size={24} />
                       </motion.div>
                     )}

                     {status === 'success' && (
                       <motion.div 
                         key="success"
                         initial={{ opacity: 0, scale: 0.5 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="flex items-center gap-2"
                       >
                         <FiCheck size={24} />
                         <span>Message Sent!</span>
                       </motion.div>
                     )}

                     {status === 'error' && (
                        <motion.div 
                          key="error"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2"
                        >
                          <FiAlertCircle size={24} />
                          <span>Failed. Try again.</span>
                        </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.button>
               </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}