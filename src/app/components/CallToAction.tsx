'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'motion/react';
import { Calendar, Phone, Mail, ArrowRight, ShieldCheck, Globe, Activity, Compass } from 'lucide-react';

export const CallToAction = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isDesktop, setIsDesktop] = useState(false);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

    // 3D Tilt Physics (for mobile/flat card hover only)
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
        setMousePos({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#fdfaf3] pt-4 pb-8 md:pt-4 md:pb-12 overflow-hidden flex flex-col items-center">
            
            {/* Background Atmosphere & Drifting Particles */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] opacity-50" />
                <DriftingParticles />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseCTAEx">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseCTAEx)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-8 relative z-10 flex flex-col items-center">
                
                {isDesktop ? (
                    /* Desktop View: Premium 3D Tri-Fold Map Unfolding */
                    <div className="relative w-full max-w-[1000px] mx-auto h-[380px] mb-6" style={{ perspective: 3500, transformStyle: "preserve-3d" }}>
                        <motion.div
                            initial={{ 
                                opacity: 0, 
                                scale: 0.88, 
                                rotateX: 8, 
                                translateZ: -200,
                                boxShadow: "0 0px 0px rgba(212,175,55,0)"
                            }}
                            animate={isInView ? { 
                                opacity: 1, 
                                scale: 1, 
                                rotateX: 0, 
                                translateZ: 0,
                                boxShadow: "0 60px 100px -30px rgba(212,175,55,0.14)"
                            } : { 
                                opacity: 0, 
                                scale: 0.88, 
                                rotateX: 8, 
                                translateZ: -200,
                                boxShadow: "0 0px 0px rgba(212,175,55,0)"
                            }}
                            transition={{ duration: 2.0, ease: "easeOut" }}
                            className="w-full h-full relative rounded-[30px]"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            
                            {/* PANEL 1: Leftmost Hinge (Anchor) */}
                            <motion.div
                                initial={{ rotateY: -75 }}
                                animate={isInView ? { rotateY: 0 } : { rotateY: -75 }}
                                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                                style={{
                                    transformOrigin: "left center",
                                    transformStyle: "preserve-3d",
                                    backfaceVisibility: "hidden",
                                    width: "33.333%",
                                    height: "100%",
                                }}
                                className="absolute left-0 top-0 py-6 px-7 flex flex-col justify-between bg-white border-y border-l border-[#d4af37]/35 rounded-l-[30px] relative group"
                            >
                                {/* Background wrapper to clip decorative elements without clipping children */}
                                <div className="absolute inset-0 overflow-hidden rounded-l-[30px] pointer-events-none z-0">
                                    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_transparent_40%,_#d4af37_100%)]" />
                                    <div className="absolute -left-12 -bottom-12 w-48 h-48 border border-[#d4af37]/15 rounded-full" />
                                    <div className="absolute -left-8 -bottom-8 w-40 h-40 border border-dashed border-[#d4af37]/15 rounded-full animate-[spin_120s_linear_infinite]" />
                                </div>

                                {/* Crease shadow on the right edge of Panel 1 (Fades out completely when flat) */}
                                <motion.div 
                                    initial={{ opacity: 0.65 }}
                                    animate={isInView ? { opacity: 0 } : { opacity: 0.65 }}
                                    transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-20" 
                                />
                                
                                <div className="flex items-center gap-2 text-[#d4af37] border-b border-[#d4af37]/20 pb-3 relative z-10">
                                    <Compass className="w-4 h-4 text-[#d4af37]" />
                                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase">01 / DISCOVERY PLAN</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center py-4 relative z-10">
                                    <h2 
                                        className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] tracking-tighter leading-[1.05]"
                                        style={{ fontFamily: '"Playfair Display", serif' }}
                                    >
                                        Initiate Your <br />
                                        <span className="text-[#d4af37] drop-shadow-sm">Journey</span>
                                    </h2>
                                    <div className="w-12 h-[1.5px] bg-[#d4af37] mt-4" />
                                </div>

                                <div className="relative z-10 flex items-center justify-between text-[9px] text-[#1a1a1a]/40 font-mono tracking-widest uppercase">
                                    <span>LAT. 51.5074° N</span>
                                    <span>GLOBAL PATHWAYS</span>
                                </div>

                                {/* PANEL 2: Middle Hinge (Connected to Panel 1 Right Edge) */}
                                <motion.div
                                    initial={{ rotateY: 145 }}
                                    animate={isInView ? { rotateY: 0 } : { rotateY: 145 }}
                                    transition={{ duration: 2.4, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
                                    style={{
                                        transformOrigin: "left center",
                                        transformStyle: "preserve-3d",
                                        backfaceVisibility: "hidden",
                                        position: "absolute",
                                        left: "100%",
                                        top: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    className="py-6 px-7 flex flex-col justify-between bg-white border-y border-[#d4af37]/35 relative"
                                >
                                    {/* Background wrapper to clip decorative elements without clipping children */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                                        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_transparent_40%,_#d4af37_100%)]" />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-[#d4af37]/10 rounded-full" />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-[#d4af37]/10 rounded-full animate-[spin_180s_linear_infinite]" />
                                    </div>

                                    {/* Crease shadow on the right edge of Panel 2 (Fades out completely when flat) */}
                                    <motion.div 
                                        initial={{ opacity: 0.65 }}
                                        animate={isInView ? { opacity: 0 } : { opacity: 0.65 }}
                                        transition={{ duration: 2.4, ease: [0.25, 1, 0.5, 1] }}
                                        className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-20" 
                                    />

                                    <div className="flex items-center gap-2 text-[#d4af37] border-b border-[#d4af37]/20 pb-3 relative z-10">
                                        <Activity className="w-3.5 h-3.5 text-[#d4af37]" />
                                        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">02 / CORE METRICS</span>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center py-4 relative z-10">
                                        <p 
                                            className="text-sm lg:text-base text-[#1a1a1a]/85 font-medium italic leading-relaxed"
                                            style={{ fontFamily: '"Playfair Display", serif' }}
                                        >
                                            "Where elite academic strategy meets the curated pathways of world-class educational leadership."
                                        </p>
                                    </div>

                                    {/* Counters block nested nicely in Panel 2 */}
                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#d4af37]/20 relative z-10">
                                        {[
                                            { val: 500, suffix: "+", label: "PLACEMENTS" },
                                            { val: 99, suffix: "%", label: "SUCCESS" },
                                            { val: 10, suffix: "YRS", label: "LEADERSHIP" }
                                        ].map((stat, i) => (
                                            <Counter key={i} target={stat.val} suffix={stat.suffix} label={stat.label} />
                                        ))}
                                    </div>

                                    {/* PANEL 3: Rightmost Hinge (Connected to Panel 2 Right Edge) */}
                                    <motion.div
                                        initial={{ rotateY: -145 }}
                                        animate={isInView ? { rotateY: 0 } : { rotateY: -145 }}
                                        transition={{ duration: 2.6, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
                                        style={{
                                            transformOrigin: "left center",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            position: "absolute",
                                            left: "100%",
                                            top: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        className="py-6 px-7 flex flex-col justify-between bg-white border-y border-r border-[#d4af37]/35 rounded-r-[30px] relative"
                                    >
                                        {/* Background wrapper to clip decorative elements without clipping children */}
                                        <div className="absolute inset-0 overflow-hidden rounded-r-[30px] pointer-events-none z-0">
                                            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_transparent_40%,_#d4af37_100%)]" />
                                            <div className="absolute -right-12 -top-12 w-48 h-48 border border-[#d4af37]/15 rounded-full" />
                                            <div className="absolute -right-8 -top-8 w-40 h-40 border border-dashed border-[#d4af37]/15 rounded-full animate-[spin_100s_linear_infinite]" />
                                        </div>

                                        <div className="flex items-center justify-between text-[#d4af37] border-b border-[#d4af37]/20 pb-3 relative z-10">
                                            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">03 / GATEWAY TERMINAL</span>
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                        </div>

                                        {/* Dynamic interactive elements inside Panel 3 */}
                                        <div className="flex-1 flex flex-col justify-center items-center lg:items-end gap-4 py-4 relative z-10">
                                            <motion.button 
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                className="group relative w-full py-3 bg-[#d4af37] text-white rounded-full flex items-center justify-center gap-3 shadow-[0_12px_30px_-8px_rgba(212,175,55,0.45)] hover:shadow-[0_20px_50px_-8px_rgba(212,175,55,0.6)] transition-all duration-700 overflow-hidden cursor-pointer"
                                            >
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-xs font-bold tracking-[0.2em] uppercase">Begin Consultation</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                                                
                                                <motion.div 
                                                    animate={{ x: ["-100%", "200%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                                                />
                                            </motion.button>
                                        </div>

                                        <div className="space-y-2 relative z-10 w-full">
                                            <motion.div 
                                                whileHover={{ x: -6 }}
                                                className="flex items-center gap-2.5 group cursor-pointer justify-end"
                                            >
                                                <div className="text-right">
                                                    <p className="text-[7px] font-bold text-[#d4af37] tracking-[0.6em] uppercase">Hotline</p>
                                                    <p className="text-xs md:text-sm font-bold text-[#1a1a1a] tracking-widest">+1 (555) 123-4567</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center group-hover:border-[#d4af37] bg-white transition-all duration-500 shadow-sm group-hover:shadow-md">
                                                    <Phone className="w-3.5 h-3.5 text-[#1a1a1a]/60 group-hover:text-[#d4af37] transition-colors" />
                                                </div>
                                            </motion.div>
                                            
                                            <motion.div 
                                                whileHover={{ x: -6 }}
                                                className="flex items-center gap-2.5 group cursor-pointer justify-end"
                                            >
                                                <div className="text-right">
                                                    <p className="text-[7px] font-bold text-[#d4af37] tracking-[0.6em] uppercase">Admissions Desk</p>
                                                    <p className="text-xs md:text-sm font-bold text-[#1a1a1a] tracking-widest">advisors@globalpath.com</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center group-hover:border-[#d4af37] bg-white transition-all duration-500 shadow-sm group-hover:shadow-md">
                                                    <Mail className="w-3.5 h-3.5 text-[#1a1a1a]/60 group-hover:text-[#d4af37] transition-colors" />
                                                </div>
                                            </motion.div>
                                        </div>

                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                ) : (
                    /* Mobile View: Premium Standard Responsive Card */
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{ 
                            rotateX: isHovered ? rotateX : 0, 
                            rotateY: isHovered ? rotateY : 0,
                            perspective: 2000
                        }}
                        className="relative w-full max-w-[1000px] bg-white/80 backdrop-blur-3xl rounded-3xl border border-[#d4af37]/30 py-8 px-6 shadow-[0_60px_100px_-30px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col items-center justify-center gap-6 transition-all duration-700 hover:border-[#d4af37]/60 group"
                    >
                        {/* Interactive Reveal Glow */}
                        <motion.div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            animate={{
                                background: isHovered 
                                    ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.08) 0%, transparent 40%)`
                                    : `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0) 0%, transparent 40%)`
                            }}
                        />

                        {/* Mobile Content */}
                        <div className="w-full space-y-6 relative z-10 text-center">
                            <div className="space-y-4">
                                <div className="overflow-hidden pb-1">
                                    <h2 
                                        className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tighter leading-[1.1] flex flex-wrap justify-center gap-x-3"
                                        style={{ fontFamily: '"Playfair Display", serif' }}
                                    >
                                        Initiate Your <span className="text-[#d4af37]">Journey</span>
                                    </h2>
                                </div>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-[#1a1a1a]/80 font-medium italic max-w-xl mx-auto"
                                    style={{ fontFamily: '"Playfair Display", serif' }}
                                >
                                    "Where elite academic strategy meets the curated pathways of world-class educational leadership."
                                </motion.p>
                            </div>

                            {/* Animated Stats HUD */}
                            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                                {[
                                    { val: 500, suffix: "+", label: "PLACEMENTS" },
                                    { val: 99, suffix: "%", label: "SUCCESS" },
                                    { val: 10, suffix: "YRS", label: "LEADERSHIP" }
                                ].map((stat, i) => (
                                    <Counter key={i} target={stat.val} suffix={stat.suffix} label={stat.label} />
                                ))}
                            </div>
                        </div>

                        {/* Mobile Action Hub */}
                        <div className="w-full flex flex-col gap-4 items-center relative z-10">
                            <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative w-full max-w-md py-3.5 bg-[#d4af37] text-white rounded-full flex items-center justify-center gap-4 shadow-[0_15px_40px_-10px_rgba(212,175,55,0.45)] transition-all duration-700 overflow-hidden cursor-pointer"
                            >
                                <Calendar className="w-5 h-5" />
                                <span className="text-base font-bold tracking-[0.2em] uppercase">Begin Consultation</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                
                                <motion.div 
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                                />
                            </motion.button>

                            <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <motion.div 
                                    whileHover={{ y: -4 }}
                                    className="flex items-center gap-3 group cursor-pointer justify-center p-2 rounded-2xl bg-white border border-[#1a1a1a]/5 hover:border-[#d4af37] transition-all duration-300 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/5 flex items-center justify-center bg-[#fdfaf3]">
                                        <Phone className="w-4 h-4 text-[#d4af37]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[7px] font-bold text-[#d4af37] tracking-[0.3em] uppercase">Hotline</p>
                                        <p className="text-sm font-bold text-[#1a1a1a] tracking-wider">+1 (555) 123-4567</p>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    whileHover={{ y: -4 }}
                                    className="flex items-center gap-3 group cursor-pointer justify-center p-2 rounded-2xl bg-white border border-[#1a1a1a]/5 hover:border-[#d4af37] transition-all duration-300 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/5 flex items-center justify-center bg-[#fdfaf3]">
                                        <Mail className="w-4 h-4 text-[#d4af37]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[7px] font-bold text-[#d4af37] tracking-[0.3em] uppercase">Admissions</p>
                                        <p className="text-sm font-bold text-[#1a1a1a] tracking-wider">advisors@globalpath.com</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Ambient Light Bloom Detail */}
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>
                )}

            </div>
        </section>
    );
};

const Counter = ({ target, suffix, label }: { target: number, suffix: string, label: string }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (isInView && nodeRef.current) {
            animate(0, target, {
                duration: 2,
                ease: "circOut",
                onUpdate: (latest) => {
                    if (nodeRef.current) {
                        nodeRef.current.textContent = Math.round(latest).toString();
                    }
                }
            });
        }
    }, [isInView, target]);

    return (
        <div className="flex flex-col gap-0.5 min-w-[75px] text-left">
            <div className="flex items-baseline">
                <span ref={nodeRef} className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: '"Playfair Display", serif' }}>0</span>
                <span className="text-lg font-bold text-[#d4af37]" style={{ fontFamily: '"Playfair Display", serif' }}>{suffix}</span>
            </div>
            <span className="text-[6.5px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">{label}</span>
        </div>
    );
};

const DriftingParticles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.35
                    }}
                    animate={{ 
                        y: [null, "-=120", "+=120"],
                        opacity: [0.1, 0.35, 0.1]
                    }}
                    transition={{ 
                        duration: 6 + Math.random() * 8, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="absolute w-1 h-1 bg-[#d4af37] rounded-full"
                />
            ))}
        </div>
    );
};