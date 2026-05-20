import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, ShieldCheck, Zap, Globe, Compass } from 'lucide-react';

const WritingText = ({ text, className, delay = 0, speed = 0.03 }: { text: string; className?: string; delay?: number; speed?: number }) => {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + (i * speed),
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

export const FeaturedArticle = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
    const imageScale = useSpring(1.05, { stiffness: 200, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <section className="relative w-full py-12 md:py-16 bg-[#faf9f6] overflow-hidden">
            {/* Ambient Detail: Kinetic Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="featuredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#featuredGrid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">


                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => { setIsHovered(true); imageScale.set(1.15); }}
                    onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); imageScale.set(1.05); }}
                    style={{ rotateX, rotateY, perspective: 1500 }}
                    className="relative grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] border border-[#1a1a1a]/5"
                >
                    {/* Image Layer with Parallax */}
                    <div className="relative h-96 lg:h-auto overflow-hidden bg-[#1a1a1a]">
                        <motion.img 
                            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                            alt="Featured Article"
                            style={{ scale: imageScale }}
                            className="w-full h-full object-cover transition-transform duration-700 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/40 to-transparent" />
                        
                        {/* Interactive Scanline */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent w-40 skew-x-12"
                                />
                            )}
                        </AnimatePresence>


                    </div>

                    {/* Content Layer */}
                    <div className="p-12 md:p-20 flex flex-col justify-center space-y-12 relative">
                        {/* Writing Animation Subtitle */}
                        <div className="space-y-4">
                            <div className="w-12 h-[1px] bg-[#d4af37]" />
                            <WritingText 
                                text="WEDDING PLANNING // ARCHIVAL STRATEGY" 
                                className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase" 
                                delay={0.5}
                            />
                        </div>

                        {/* Title: Cinematic Word Stagger */}
                        <h2 
                            className="text-4xl md:text-6xl font-bold text-[#1a1a1a] tracking-tighter leading-[1.3]"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            {["10", "Essential", "Tips", "for", "Crafting", "Your", "Dream", "Wedding", "in", "2026"].map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden mr-3 pb-2 -mb-2">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xl text-[#1a1a1a]/60 font-light italic leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
                            "Planning a wedding can be overwhelming, but with the right approach and expert guidance, you can create the celebration of your dreams."
                        </p>

                        {/* Meta Protocol Cluster */}
                        <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-[#1a1a1a]/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#faf9f6] flex items-center justify-center">
                                    <User className="w-4 h-4 text-[#d4af37]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-[#d4af37] uppercase tracking-widest">Architect</span>
                                    <span className="text-[11px] font-bold text-[#1a1a1a] uppercase">Sarah Johnson</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#faf9f6] flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-[#d4af37] uppercase tracking-widest">Temporal</span>
                                    <span className="text-[11px] font-bold text-[#1a1a1a]/40 uppercase">MAR_10_2026</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#faf9f6] flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-[#d4af37]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-[#d4af37] uppercase tracking-widest">Duration</span>
                                    <span className="text-[11px] font-bold text-[#1a1a1a]/40 uppercase">08_MIN_READ</span>
                                </div>
                            </div>
                        </div>

                        {/* Read More Button: Magnetic Lift */}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-6 bg-[#1a1a1a] text-white rounded-full font-bold tracking-[0.3em] uppercase text-[11px] overflow-hidden self-start"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                Read Full Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </span>
                            <motion.div 
                                className="absolute inset-0 bg-[#d4af37]"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.button>
                    </div>
                </motion.div>
            </div>


        </section>
    );
};
