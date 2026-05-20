'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ShieldCheck, Globe, ArrowDown, Fingerprint, Compass, Radio } from 'lucide-react';

export const AboutUsBanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track scroll for deep cinematic parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollYShift1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const scrollYShift2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const scaleFactor = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

    // Motion values for interactive 3D Mouse Parallax
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const mouseSpringX = useSpring(mX, { stiffness: 120, damping: 25 });
    const mouseSpringY = useSpring(mY, { stiffness: 120, damping: 25 });

    // Shifts for background images
    const imgParallaxX = useTransform(mouseSpringX, [-0.5, 0.5], [-25, 25]);
    const imgParallaxY = useTransform(mouseSpringY, [-0.5, 0.5], [-25, 25]);

    // Opposite shifts for overlay text to generate intense visual depth
    const textParallaxX = useTransform(mouseSpringX, [-0.5, 0.5], [20, -20]);
    const textParallaxY = useTransform(mouseSpringY, [-0.5, 0.5], [20, -20]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        mX.set(relativeX);
        mY.set(relativeY);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        mX.set(0);
        mY.set(0);
    };

    return (
        <section 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-[100vh] bg-[#0d0d0d] overflow-hidden select-none"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Advanced Technical Grid Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="aboutBannerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#D4AF37" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#aboutBannerGrid)" />
                    </svg>
                </div>

                {/* 3D Interactive Mouse Spotlight Shadow */}
                <div 
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`
                    }}
                />

                {/* Split Parallax Composition Panels */}
                <div className="absolute inset-0 z-0 grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Panel: Oxbridge Architecture */}
                    <motion.div 
                        style={{ y: scrollYShift1 }}
                        className="relative h-full overflow-hidden border-r border-white/5"
                    >
                        <motion.div 
                            style={{ 
                                x: imgParallaxX,
                                y: imgParallaxY,
                            }}
                            className="relative w-full h-[120%] -top-[10%]"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
                                className="w-full h-full object-cover opacity-35 grayscale hover:grayscale-0 transition-all duration-[2s] scale-105" 
                                alt="Collegiate Heritage Left" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
                        </motion.div>
                    </motion.div>
                    
                    {/* Right Panel: Academic Library detail */}
                    <motion.div 
                        style={{ y: scrollYShift2 }}
                        className="relative h-full overflow-hidden"
                    >
                        <motion.div 
                            style={{ 
                                x: imgParallaxX,
                                y: imgParallaxY,
                            }}
                            className="relative w-full h-[120%] -top-[10%]"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop" 
                                className="w-full h-full object-cover opacity-35 grayscale hover:grayscale-0 transition-all duration-[2s] scale-105" 
                                alt="Collegiate Prestige Right" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>



                {/* Main Kinetic Typography Layer */}
                <motion.div 
                    style={{ 
                        opacity: 1, 
                        scale: scaleFactor,
                        x: textParallaxX,
                        y: textParallaxY
                    }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    {/* Character-expanded Subtitle */}
                    <motion.div 
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.8em" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="mb-8 text-[#D4AF37] text-[10px] uppercase font-bold tracking-[0.8em]"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        Architecting Futures
                    </motion.div>
                    
                    {/* Large Split-Letter Title Reveal */}
                    <h1 
                        className="text-7xl md:text-[10rem] font-bold text-white leading-[0.9] tracking-tighter mb-12"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        {"Elevating".split('').map((char, index) => (
                            <motion.span
                                key={`elevating-${index}`}
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: index * 0.05, 
                                    ease: [0.22, 1, 0.36, 1] 
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                        <br />
                        <span className="text-[#D4AF37]">
                            {"Success.".split('').map((char, index) => (
                                <motion.span
                                    key={`success-${index}`}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ 
                                        duration: 0.8, 
                                        delay: (index + 9) * 0.05, 
                                        ease: [0.22, 1, 0.36, 1] 
                                    }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </h1>
                    
                    {/* Staggered descriptive paragraph */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-16 flex items-center justify-center gap-8"
                    >
                        <div className="hidden sm:block w-16 h-[1px] bg-[#D4AF37]/30" />
                        <p 
                            className="text-sm md:text-lg text-white/70 font-light italic tracking-widest max-w-xl leading-relaxed"
                            style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                            "A decade of pioneering academic advisory where strategic precision meets the global dreams of elite scholars."
                        </p>
                        <div className="hidden sm:block w-16 h-[1px] bg-[#D4AF37]/30" />
                    </motion.div>
                </motion.div>

                {/* Hardware-accelerated cinematic Scanline & Grain Detail */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.01] mix-blend-overlay">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <filter id="aboutBannerNoise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#aboutBannerNoise)" />
                    </svg>
                </div>

                {/* Animated Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
                    <motion.div 
                        animate={{ height: [40, 80, 40] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" 
                    />
                    <span className="text-[8px] font-mono tracking-[0.6em] text-[#D4AF37] uppercase">Traverse</span>
                </div>

            </div>
        </section>
    );
};