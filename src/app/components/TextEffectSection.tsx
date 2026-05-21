'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { Sparkles, Shield, Clock, Award, Activity, ArrowUpRight, Globe, GraduationCap, UserCheck } from 'lucide-react';

interface Metric {
    id: string;
    value: string;
    label: string;
    detail: string;
    icon: React.ReactNode;
    coordinates: string;
    tag: string;
}

const metrics: Metric[] = [
    {
        id: "01",
        value: "15+",
        label: "GLOBAL DESTINATIONS",
        tag: "COUNTRIES",
        detail: "Elite study opportunities across the USA, UK, Canada, Australia, and Europe's top academic hubs.",
        icon: <Globe className="w-5 h-5" />,
        coordinates: "USA, UK, CAN, AUS, EUR"
    },
    {
        id: "02",
        value: "500+",
        label: "UNIVERSITY PLACEMENTS",
        tag: "ALUMNI",
        detail: "Scholars successfully admitted to Ivy League, Russell Group, and top-tier global institutions.",
        icon: <GraduationCap className="w-5 h-5" />,
        coordinates: "Ivy League, Russell Group"
    },
    {
        id: "03",
        value: "99.2%",
        label: "VISA SUCCESS RATE",
        tag: "SUCCESS",
        detail: "Uncompromised track record in securing global student visas and study permits with expert guidance.",
        icon: <Shield className="w-5 h-5" />,
        coordinates: "Embassy Verified Records"
    },
    {
        id: "04",
        value: "$18.5M",
        label: "SCHOLARSHIPS SECURED",
        tag: "FINANCES",
        detail: "Substantial merit fellowships, research grants, and financial aid secured for our student cohorts.",
        icon: <Sparkles className="w-5 h-5" />,
        coordinates: "Merit Aid & Grants"
    },
    {
        id: "05",
        value: "1-ON-1",
        label: "END-TO-END MENTORSHIP",
        tag: "GUIDANCE",
        detail: "Personalized portfolio styling, essay review, and mock interviews with top academic advisors.",
        icon: <UserCheck className="w-5 h-5" />,
        coordinates: "Direct Strategic Prep"
    }
];

export const TextEffectSection = () => {
    return (
        <section className="relative w-full bg-[#fdfaf3] pt-3 pb-6 md:pt-4 md:pb-8 overflow-hidden">
            {/* Background Texture & Spotlight */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseGridEffect">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseGridEffect)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-8 md:px-24 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-start gap-2 md:gap-3 mb-6 md:mb-8">
                    <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Admissions <span className="font-light italic text-shimmer-gold">Integrity</span>
                    </h2>
                    <div className="max-w-2xl">
                        <p 
                            className="text-base md:text-lg text-[#1a1a1a]/50 font-light italic leading-relaxed" 
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            "A commitment to elite global standards of portfolio mentoring and university placement success."
                        </p>
                    </div>
                </div>

                {/* Grid of Archival Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {metrics.map((metric, index) => (
                        <ArchivalCard key={metric.id} metric={metric} index={index} />
                    ))}
                </div>
            </div>

            {/* Bottom HUD Detail */}

            <style>{`
                @keyframes gold-shine-effect {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .text-shimmer-gold {
                    background: linear-gradient(to right, #d4af37 0%, #f7e7c4 25%, #d4af37 50%, #f7e7c4 75%, #d4af37 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gold-shine-effect 6s linear infinite;
                    text-shadow: 0 0 15px rgba(212,175,55,0.1);
                }
            `}</style>
        </section>
    );
};

const AnimatedCounter = ({ value, triggerInView }: { value: string; triggerInView: boolean }) => {
    const [displayVal, setDisplayVal] = useState("0");
    const hasAnimated = useRef(false);

    React.useEffect(() => {
        if (!triggerInView || hasAnimated.current) return;
        hasAnimated.current = true;

        if (value === "1-ON-1") {
            setDisplayVal("1-ON-1");
            return;
        }

        let prefix = "";
        let suffix = "";
        let workingVal = value;

        if (workingVal.startsWith("$")) {
            prefix = "$";
            workingVal = workingVal.slice(1);
        }

        if (workingVal.endsWith("+")) {
            suffix = "+";
            workingVal = workingVal.slice(0, -1);
        } else if (workingVal.endsWith("%")) {
            suffix = "%";
            workingVal = workingVal.slice(0, -1);
        } else if (workingVal.endsWith("M")) {
            suffix = "M";
            workingVal = workingVal.slice(0, -1);
        }

        const target = parseFloat(workingVal);
        if (isNaN(target)) {
            setDisplayVal(value);
            return;
        }

        const decimals = workingVal.includes(".") ? workingVal.split(".")[1].length : 0;

        const controls = animate(0, target, {
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1], // cinematic cubic-bezier ease out
            delay: 0.2, // aligned with card roll delay
            onUpdate: (latest) => {
                setDisplayVal(`${prefix}${latest.toFixed(decimals)}${suffix}`);
            }
        });

        return () => controls.stop();
    }, [value, triggerInView]);

    return <span>{displayVal}</span>;
};

const ArchivalCard = ({ metric, index }: { metric: Metric, index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 320, height: 400 });
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(false);

    // Dynamic dimension tracking for absolute 3D alignment
    React.useEffect(() => {
        if (!containerRef.current) return;
        const updateDimensions = () => {
            const rect = containerRef.current!.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                setDimensions({ width: rect.width, height: rect.height });
            }
        };
        updateDimensions();

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    // Mouse movement values for high-fidelity 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const halfHeight = dimensions.height / 2;
    const halfWidth = dimensions.width / 2;
    const depth = dimensions.height; // Square profile depth for rotation
    const halfDepth = depth / 2;

    return (
        <div
            ref={containerRef}
            className="relative aspect-[4/4.5] w-full"
            style={{ perspective: 2000 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* Outer Container: Scroll-Triggered Forward Roll */}
            <motion.div
                initial={{ rotateX: -270, rotateY: -90, rotateZ: -45, scale: 0.82, opacity: 0 }}
                whileInView={{ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                onViewportEnter={() => setIsInView(true)}
                transition={{
                    duration: 1.8,
                    delay: index * 0.32, // Perfect one-by-one sequential delay
                    ease: [0.16, 1, 0.3, 1] // Heavy luxurious spring-like cubic bezier
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full"
            >
                {/* Inner Container: Mouse Hover 3D Tilt */}
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        rotateX: tiltX,
                        rotateY: tiltY,
                    }}
                    className="relative w-full h-full transition-shadow duration-500"
                >
                    {/* 1. FRONT FACE (The Metric Details Card) */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            transform: `translateZ(${halfDepth}px)`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                        className="group relative w-full h-full bg-white rounded-sm border border-[#1a1a1a]/10 p-6 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)]"
                    >
                        {/* Archival Background ID */}
                        <div className="absolute top-0 right-0 p-4 flex flex-col items-end opacity-[0.03] pointer-events-none">
                            <span className="text-[85px] font-bold text-[#1a1a1a] leading-none tracking-tighter">{metric.id}</span>
                        </div>

                        {/* Top Section: Icon & Log ID */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/5 flex items-center justify-center bg-[#faf9f6] group-hover:border-[#d4af37]/40 transition-colors duration-500">
                                    <motion.div
                                        animate={isHovered ? { rotate: [0, 15, -15, 0] } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {metric.icon}
                                    </motion.div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">LOG ENTRY</span>
                                    <span className="text-xs font-bold text-[#1a1a1a]/30 uppercase">ID_{metric.id}</span>
                                </div>
                            </div>
                            <div className="px-2 py-0.5 border border-[#1a1a1a]/10 rounded-full bg-[#faf9f6]">
                                <span className="text-[6.5px] font-bold text-[#1a1a1a]/40 tracking-widest uppercase">{metric.tag}</span>
                            </div>
                        </div>

                        {/* Middle Section: Massive Metric */}
                        <div className="relative z-10 py-5">
                            <motion.h3
                                style={{
                                    transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
                                    fontFamily: '"Playfair Display", serif'
                                }}
                                className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tighter leading-none transition-transform duration-500"
                            >
                                <AnimatedCounter value={metric.value} triggerInView={isInView} />
                            </motion.h3>
                            <div className="w-12 h-[1px] bg-[#d4af37] mt-2 group-hover:w-24 transition-all duration-700" />
                        </div>

                        {/* Bottom Section: Details & Coordinates */}
                        <div className="relative z-10 space-y-3">
                            <div className="space-y-2">
                                <span className="text-[9px] font-bold text-[#1a1a1a]/80 tracking-[0.4em] uppercase">{metric.label}</span>
                                <p className="text-[#1a1a1a]/50 text-xs leading-relaxed font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                                    {metric.detail}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]/5">
                                <span className="text-[8px] font-bold text-[#1a1a1a]/20 tabular-nums">{metric.coordinates}</span>
                                <ArrowUpRight className="w-4 h-4 text-[#d4af37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                            </div>
                        </div>

                        {/* Hover Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                animate={isHovered ? { y: ["-100%", "200%"] } : { y: "-100%" }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#d4af37]/[0.03] to-transparent"
                            />
                        </div>

                        {/* Magnetic Glow */}
                        <div className="absolute -inset-px bg-gradient-to-br from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    {/* 2. TOP FACE (The Prestige Gold Cover Plaque) */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            transform: `rotateX(90deg) translateZ(${halfHeight}px)`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                        className="relative w-full h-full bg-[#121212] border border-[#d4af37]/30 p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                        {/* Elite Double-Border Border Line */}
                        <div className="absolute inset-[6px] border border-[#d4af37]/15 rounded-sm pointer-events-none" />

                        {/* Decorative Corner Ornaments */}
                        <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#d4af37]/40" />
                        <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#d4af37]/40" />
                        <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#d4af37]/40" />
                        <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#d4af37]/40" />

                        {/* Cover Top Section */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="space-y-2">
                                <span className="text-[8px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">LOG ENTRY</span>
                                <div className="text-[9px] font-bold text-white/40 font-mono">SECURE ARCHIVE</div>
                            </div>
                            <div className="px-2 py-0.5 border border-[#d4af37]/20 rounded-full bg-black/40">
                                <span className="text-[6.5px] font-bold text-[#d4af37] tracking-widest uppercase">{metric.tag}</span>
                            </div>
                        </div>

                        {/* Cover Middle Section: Massive Golden Serif Numeral ID and Glowing Icon */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 space-y-2">
                            <div className="text-white/10 group-hover:text-[#d4af37]/40 transition-colors duration-500 mb-1">
                                {metric.icon}
                            </div>
                            <span
                                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f7e7c4] to-[#aa802c] tracking-tighter drop-shadow-[0_4px_12px_rgba(212,175,55,0.2)]"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                {metric.id}
                            </span>
                            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                        </div>

                        {/* Cover Bottom Section */}
                        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#d4af37]/10">
                            <span className="text-[8px] font-medium text-[#d4af37]/50 font-mono tracking-widest uppercase">ID_{metric.id} // ACTIVE</span>
                            <span className="text-[8px] font-bold text-white/30 tabular-nums tracking-wider">{metric.coordinates}</span>
                        </div>

                        {/* Diagonal Glass Sheen Reflection */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "200%"], y: ["-100%", "200%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                                className="absolute -inset-y-12 -inset-x-24 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent rotate-[35deg]"
                            />
                        </div>
                    </div>

                    {/* 3. BOTTOM FACE (Metallic Plate) */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            transform: `rotateX(-90deg) translateZ(${halfHeight}px)`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                        className="w-full h-full bg-[#1c1c1c] border border-[#d4af37]/15 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />
                        <div className="w-8 h-8 rounded-full border border-[#d4af37]/10 flex items-center justify-center opacity-20">
                            <div className="w-4 h-4 rounded-full bg-[#d4af37]/10" />
                        </div>
                    </div>

                    {/* 4. LEFT FACE (obsidian plate with pinstripes) */}
                    {dimensions.width > 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: `${depth}px`,
                                height: `${dimensions.height}px`,
                                transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${halfWidth}px)`,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                            }}
                            className="bg-[#0e0e0e] border-l border-r border-[#d4af37]/20 flex items-center justify-center overflow-hidden"
                        >
                            {/* Gold-tinted vertical scan grids */}
                            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,transparent_49%,#d4af37_50%,transparent_51%)] bg-[length:16px_16px]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                            <div className="w-[1px] h-full bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/30 to-[#d4af37]/10" />
                        </div>
                    )}

                    {/* 5. RIGHT FACE (obsidian plate with pinstripes) */}
                    {dimensions.width > 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: `${depth}px`,
                                height: `${dimensions.height}px`,
                                transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${halfWidth}px)`,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                            }}
                            className="bg-[#0e0e0e] border-l border-r border-[#d4af37]/20 flex items-center justify-center overflow-hidden"
                        >
                            {/* Gold-tinted vertical scan grids */}
                            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,transparent_49%,#d4af37_50%,transparent_51%)] bg-[length:16px_16px]" />
                            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black" />
                            <div className="w-[1px] h-full bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/30 to-[#d4af37]/10" />
                        </div>
                    )}

                    {/* 6. BACK FACE (OBSIDIAN BACKING PLATE) */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            transform: `rotateX(180deg) translateZ(${halfDepth}px)`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                        className="w-full h-full bg-[#0a0a0a] border border-white/5"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};