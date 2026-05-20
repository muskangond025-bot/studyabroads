import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Calendar, ArrowRight, Phone, Mail, ShieldCheck, Zap, Radio, Globe } from 'lucide-react';

export const CTASectionBookEvent = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics for the main card
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <section className="relative w-full py-8 md:py-12 bg-[#0a0a0a] overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="ctaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ctaGrid)" />
                </svg>
            </div>

            {/* Kinetic Scanline */}
            <motion.div 
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none opacity-[0.05] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent h-40"
            />

            <div className="container mx-auto px-8 relative z-10">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
                    style={{ rotateX, rotateY, perspective: 1500 }}
                    className="relative max-w-5xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-6 md:p-10 overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)]"
                >
                    {/* Background Light Reconstruction */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 blur-[120px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-5">


                        {/* Title: Cinematic Stagger */}
                        <h2 
                            className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            {["Ready", "to", "Shape", "Your", "Academic", "Future?"].map((word, i) => (
                                <span key={i} className="inline-block mr-4">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className={`inline-block ${i === 4 ? 'text-[#d4af37] italic font-light' : ''}`}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl italic" style={{ fontFamily: '"Playfair Display", serif' }}>
                            "Systematizing the art of academic strategy through architectural precision and global placement."
                        </p>

                        {/* CTA Cluster */}
                        <div className="flex flex-col md:flex-row gap-8 items-center pt-8">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-16 py-8 bg-white text-[#1a1a1a] rounded-full font-bold tracking-[0.2em] uppercase text-[12px] overflow-hidden transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:text-white"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Your Strategy <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                                <motion.div 
                                    className="absolute inset-0 bg-[#d4af37]"
                                    initial={{ y: "100%" }}
                                    whileHover={{ y: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.button>

                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                            >
                                <Calendar className="w-5 h-5 text-[#d4af37]" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Schedule Consultation</span>
                            </motion.button>
                        </div>

                        {/* Technical Footer HUD */}
                        <div className="w-full pt-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 gap-8">
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-start gap-1">
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <a href="tel:+1234567890" className="group flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#d4af37] transition-transform group-hover:scale-125" />
                                    <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors tracking-widest">+1 (234) 567-8900</span>
                                </a>
                                <a href="mailto:admissions@globalpath.com" className="group flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#d4af37] transition-transform group-hover:scale-125" />
                                    <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors tracking-widest">admissions@globalpath.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Scanline Overlay */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent w-20 skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>


        </section>
    );
};
