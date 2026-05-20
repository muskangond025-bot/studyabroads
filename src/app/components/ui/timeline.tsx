'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { cn } from "../../../lib/utils";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

const TimelineCard = ({ content }: { content: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt springs
    const x = useSpring(0, { stiffness: 120, damping: 20 });
    const y = useSpring(0, { stiffness: 120, damping: 20 });

    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

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
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1200
            }}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full bg-white/40 backdrop-blur-md border border-[#c5a56d]/15 p-8 md:p-12 rounded-[36px] shadow-[0_30px_60px_-15px_rgba(26,26,26,0.03)] hover:shadow-[0_50px_90px_-20px_rgba(197,165,109,0.12)] transition-all duration-700 overflow-hidden group"
        >
            {/* Custom Mouse Spotlight Highlight */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(197, 165, 109, 0.05), transparent 80%)`
                }}
            />

            {/* Custom Mouse-Tracking Border Ray */}
            <div 
                className="absolute inset-0 rounded-[36px] pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    padding: '1.5px',
                    background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, #c5a56d, transparent 75%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor'
                }}
            />

            <div className="relative z-10" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                {content}
            </div>
        </motion.div>
    );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(Math.round(latest * 100));
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="w-full bg-[#faf9f6] relative pt-16 cursor-default"
        >
            {/* Filmic Noise Texture */}
            <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.02] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilterTimeline">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterTimeline)" />
                </svg>
            </div>

            {/* Global Progress Terminal (Fixed) */}
            <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-[#1a1a1a]/5">
                <motion.div 
                    className="h-full bg-[#c5a56d] shadow-[0_0_15px_rgba(197,165,109,0.6)]"
                    style={{ scaleX, transformOrigin: 'left' }}
                />
            </div>

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-8 md:px-12 mb-12">
                <div className="flex flex-col gap-8">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            className="h-[1px] bg-[#c5a56d]"
                        />
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <h2 
                                className="text-7xl md:text-9xl font-bold text-[#1a1a1a] leading-[0.9] tracking-tighter"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                Academic <br /> Milestones
                            </h2>
                            <p 
                                className="max-w-xl text-2xl text-[#1a1a1a]/60 leading-relaxed font-light italic"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                "Tracing the evolution of excellence through meticulously curated academic pathways."
                            </p>
                        </div>
                        

                    </div>
                </div>
            </div>

            {/* Sticky Sections Container */}
            <div className="relative w-full">
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative flex flex-col group/section"
                    >
                        {/* Sticky Header with Character Stagger */}
                        <div className="sticky top-0 z-50 w-full bg-[#faf9f6]/95 backdrop-blur-2xl border-y border-[#1a1a1a]/5 py-10 overflow-hidden">
                            <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
                                <div className="flex items-center gap-12">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold text-[#c5a56d] tracking-widest">{index < 9 ? `0${index + 1}` : index + 1}</span>
                                        <div className="w-[1px] h-4 bg-[#c5a56d]/30 mt-1" />
                                    </div>
                                    
                                    <div className="flex overflow-hidden">
                                        {item.title.split('').map((char, charIdx) => (
                                            <motion.span
                                                key={charIdx}
                                                initial={{ y: "100%", rotateX: -90 }}
                                                whileInView={{ y: 0, rotateX: 0 }}
                                                viewport={{ once: true, margin: "-20px" }}
                                                transition={{ duration: 0.8, delay: charIdx * 0.03, ease: [0.215, 0.61, 0.355, 1] }}
                                                className="text-3xl md:text-6xl font-bold text-[#1a1a1a] inline-block"
                                                style={{ fontFamily: '"Playfair Display", serif' }}
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                                

                            </div>
                        </div>

                        {/* Section Content with Depth */}
                        <div className="max-w-7xl mx-auto px-8 md:px-12 pt-4 pb-24 w-full relative">
                            <TimelineCard content={item.content} />
                            
                            {/* Kinetic Archival Watermark */}
                            <motion.div 
                                className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0"
                                style={{ 
                                    x: useTransform(scrollYProgress, (v) => v * (index % 2 === 0 ? 100 : -100))
                                }}
                            >
                                <span className="text-[25vw] font-bold text-[#1a1a1a] tracking-tighter leading-none">ARCHIVE</span>
                            </motion.div>
                        </div>
                        
                        {/* Section Viewfinder brackets */}
                        <div className="absolute inset-x-8 md:inset-x-12 bottom-12 h-24 border-x border-b border-[#1a1a1a]/5 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
};