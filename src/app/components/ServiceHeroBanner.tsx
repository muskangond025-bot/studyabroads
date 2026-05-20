'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Cpu, Terminal, Activity, ShieldCheck, ArrowRight } from 'lucide-react';

export function ServiceHeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const springY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    // Parallax Transforms
    const yText = useTransform(springY, [0, 1], [0, 200]);
    const opacityText = useTransform(springY, [0, 0.5], [1, 0]);
    const scaleImage = useTransform(springY, [0, 1], [1, 1.2]);
    const yImage = useTransform(springY, [0, 1], [0, 100]);

    return (
        <section 
            ref={containerRef}
            className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
        >
            {/* Background Atmosphere & High-Fidelity Imagery */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    style={{ scale: scaleImage, y: yImage }}
                    className="relative w-full h-full"
                >
                    <div className="absolute inset-0 bg-[#0a0a0a]/50 z-10" />
                    <img 
                        src="/service_banner_dark_bg.png" 
                        alt="Service Environment 3D Animation" 
                        className="w-full h-full object-cover opacity-80 scale-110"
                    />
                </motion.div>
                


                {/* Atmospheric Noise */}
                <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseHero">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseHero)" />
                    </svg>
                </div>
            </div>

            {/* Cinematic Content Sequence */}
            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="relative z-30 container mx-auto px-8 max-w-6xl text-center"
            >
                <div className="flex flex-col items-center mb-16">

                    <h1 
                        className="text-7xl md:text-[10rem] font-bold text-white tracking-tighter leading-[0.85] mb-12"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        <motion.span 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="block"
                        >
                            Admissions
                        </motion.span>
                        <motion.span 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="block text-[#d4af37] italic"
                        >
                            Strategy
                        </motion.span>
                    </h1>

                    <div className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-16 overflow-hidden">
                        {"From tailored Ivy League essays to complete visa and relocation portfolios, we engineer every milestone of your global admissions journey with uncompromised strategic integrity.".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8 + (i * 0.05),
                                    ease: [0.33, 1, 0.68, 1]
                                }}
                                className="inline-block mr-[0.3em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-8"
                    >
                        <button className="group relative px-10 py-5 bg-white text-[#1a1a1a] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl">
                            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase">
                                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        

                    </motion.div>
                </div>


            </motion.div>

            {/* Scroll Interaction Node */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
                <span className="text-[8px] font-bold tracking-[0.6em] text-[#d4af37] uppercase animate-pulse">Discover Services</span>
                <ArrowDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
            </motion.div>
        </section>
    );
}