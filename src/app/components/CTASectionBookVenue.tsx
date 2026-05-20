import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, Phone, Mail, Globe } from 'lucide-react';

export const CTASectionBookVenue = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <section className="relative w-full py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="venueCtaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#venueCtaGrid)" />
                </svg>
            </div>

            {/* Kinetic Scanline */}
            <motion.div 
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-white to-transparent h-40"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
                    style={{ 
                        rotateX, 
                        rotateY, 
                        perspective: 1500,
                        background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)'
                    }}
                    className="relative max-w-5xl mx-auto border border-[#d4af37]/20 rounded-[40px] p-8 md:p-14 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                >
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#d4af37]/5 blur-[120px] pointer-events-none rounded-full" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        {/* Top HUD Telemetry */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-1"
                        >
                            <div className="w-8 h-[1px] bg-[#d4af37]/50" />
                            <span className="text-[9px] font-bold tracking-[0.4em] text-[#d4af37] uppercase">Funding Appraisal</span>
                            <div className="w-8 h-[1px] bg-[#d4af37]/50" />
                        </motion.div>

                        {/* Title: Cinematic Stagger */}
                        <h2 
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-white tracking-tight leading-[1.05] max-w-4xl"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            {["Ready", "to", "Secure", "Your", "Global", "Scholarship?"].map((word, i) => (
                                <span key={i} className="inline-block mr-3 sm:mr-4">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className={`inline-block ${i === 4 ? 'text-[#d4af37] italic font-medium' : ''}`}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h2>

                        {/* Description */}
                        <p 
                            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed italic" 
                            style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        >
                            "Systematizing elite academic placements and fully-endowed merit funding frameworks."
                        </p>

                        {/* CTA Cluster */}
                        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center pt-6 pb-2 w-full justify-center">
                            <motion.button 
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative px-10 py-5 bg-white text-[#1a1a1a] rounded-full font-bold tracking-[0.25em] uppercase text-[11px] overflow-hidden transition-all duration-300 shadow-[0_20px_45px_-10px_rgba(255,255,255,0.12)] hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.3)] hover:text-white hover:bg-[#d4af37]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Request Funding Appraisal <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </motion.button>

                            <motion.button 
                                whileHover={{ scale: 1.03, y: -2 }}
                                className="flex items-center gap-4 text-[#d4af37] transition-colors group cursor-pointer"
                            >
                                <div className="p-3.5 rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <Globe className="w-4.5 h-4.5 text-[#d4af37]" />
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/90 group-hover:text-white transition-colors">
                                    Download Funding Guides
                                </span>
                            </motion.button>
                        </div>

                        {/* Technical Footer HUD */}
                        <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between border-t border-[#d4af37]/15 gap-6">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#d4af37] uppercase">Portal ID</span>
                                    <span className="text-[11px] font-bold text-white tracking-wider uppercase">SCH-APP-2026</span>
                                </div>
                                <div className="w-[1px] h-8 bg-[#d4af37]/20" />
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#d4af37] uppercase">Status</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                                        <span className="text-[11px] font-bold text-white tracking-wider uppercase">Appraisals Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                                <a href="tel:+442079460192" className="group flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-[#d4af37] transition-transform duration-300 group-hover:scale-110" />
                                    <span className="text-[10px] font-bold text-white/70 group-hover:text-white transition-colors tracking-[0.2em] uppercase">+44 (20) 7946 0192</span>
                                </a>
                                <a href="mailto:admissions@globalpath.com" className="group flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 text-[#d4af37] transition-transform duration-300 group-hover:scale-110" />
                                    <span className="text-[10px] font-bold text-white/70 group-hover:text-white transition-colors tracking-[0.2em] uppercase">admissions@globalpath.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Scanline Overlay */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.08 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

