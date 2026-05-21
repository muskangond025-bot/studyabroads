'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface EventCard {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    coordinates: string;
    logId: string;
}

const eventCards: EventCard[] = [
    {
        id: 1,
        title: "University of Oxford",
        category: "ELITE ACADEMIA",
        coordinates: "51.7548° N, 1.2544° W",
        logId: "EDU-OXF-001",
        description: "Pioneering collegiate heritage offering elite academic rigor and historic research leadership in the heart of the UK.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1080"
    },
    {
        id: 2,
        title: "Harvard University",
        category: "IVY LEAGUE PRESTIGE",
        coordinates: "42.3770° N, 71.1167° W",
        logId: "EDU-HAR-002",
        description: "The peak of international Ivy League excellence, driving cutting-edge leadership, research, and global prestige.",
        image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1080"
    },
    {
        id: 3,
        title: "University of Toronto",
        category: "RESEARCH INSPIRED",
        coordinates: "43.6629° N, 79.3957° W",
        logId: "EDU-TOR-003",
        description: "A world-renowned public research powerhouse in Canada, fostering multicultural innovation and deep career readiness.",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1080"
    },
    {
        id: 4,
        title: "University of Sydney",
        category: "GLOBAL INNOVATION",
        coordinates: "33.8886° S, 151.1874° E",
        logId: "EDU-SYD-004",
        description: "An inspiring hub of global research and learning excellence nestled along Australia's progressive progressive coastal metropolis.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1080"
    },
    {
        id: 5,
        title: "ETH Zurich",
        category: "TECHNOLOGICAL VANGUARD",
        coordinates: "47.3763° N, 8.5480° E",
        logId: "EDU-ETH-005",
        description: "A world-leading science, engineering, and technology center at the heart of Europe's innovative core.",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1080"
    }
];

export const FeaturedEvents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const rotate = (direction: 'next' | 'prev') => {
        if (isExpanded) return;
        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % eventCards.length
            : (currentIndex - 1 + eventCards.length) % eventCards.length;
        setCurrentIndex(nextIndex);
    };

    // Automatic Scroll Logic
    useEffect(() => {
        if (isExpanded || isHovering) return;

        const timer = setInterval(() => {
            rotate('next');
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(timer);
    }, [currentIndex, isExpanded, isHovering]);

    useEffect(() => {
        eventCards.forEach((_, index) => {
            const card = cardsRef.current[index];
            if (!card) return;

            let relativePos = (index - currentIndex + eventCards.length) % eventCards.length;
            if (relativePos > 2) relativePos -= eventCards.length;

            const isCenter = relativePos === 0;

            gsap.to(card, {
                xPercent: relativePos * 130,
                z: isCenter ? 200 : -200 * Math.abs(relativePos),
                rotateY: relativePos * -35,
                opacity: Math.abs(relativePos) > 1 ? 0 : 1 - Math.abs(relativePos) * 0.4,
                scale: isCenter ? 1 : 0.8,
                filter: isCenter ? "blur(0px)" : `blur(${Math.abs(relativePos) * 4}px)`,
                duration: 1.2,
                ease: "expo.out"
            });
        });
    }, [currentIndex]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full bg-[#faf9f6] overflow-hidden flex flex-col items-center justify-center pt-6 pb-6 md:pt-8 md:pb-8 cursor-none"
        >
            {/* Filmic Noise & Grain */}
            <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFeatured">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFeatured)" />
                </svg>
            </div>

            {/* Custom Interactive Viewfinder Cursor */}
            <motion.div
                className="fixed w-20 h-20 pointer-events-none z-[200] flex items-center justify-center mix-blend-difference"
                animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                    scale: isHovering ? 1 : 0,
                    opacity: isHovering ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
                style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
            >
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4af37]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4af37]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]" />
                <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
            </motion.div>

            {/* Luminous Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#d4af37]/5 blur-[150px] rounded-full opacity-50" />
            </div>

            {/* Exhibition Telemetry Header */}
            <div className="relative z-20 text-center mb-8 md:mb-10 px-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            Featured <span className="font-light italic text-[#d4af37]">Universities</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl text-base md:text-lg text-[#1a1a1a]/40 font-light italic mt-4"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        "Architecting elite academic futures through strategic global portfolio storytelling."
                    </motion.p>
                </div>
            </div>

            {/* 3D Exhibition Track */}
            <div className="relative w-full h-[420px] md:h-[620px] perspective-2500 flex items-center justify-center z-20">
                <div className="relative w-full max-w-7xl h-full flex items-center justify-center preserve-3d">
                    {eventCards.map((event, index) => (
                        <div
                            key={event.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            onClick={() => index === currentIndex && setIsExpanded(true)}
                            className={`absolute w-[320px] md:w-[480px] aspect-[4/5] cursor-pointer preserve-3d group ${index === currentIndex ? 'z-50' : 'z-10'}`}
                        >
                            <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#1a1a1a]/5 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:shadow-[0_80px_120px_-20px_rgba(212,175,55,0.2)]">
                                <ImageWithFallback
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent opacity-80" />

                                <div className="absolute inset-10 flex flex-col justify-end pointer-events-none">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[#d4af37]" />
                                            <span className="text-[9px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">{event.category}</span>
                                        </div>
                                        <h3
                                            className="text-3xl md:text-4xl font-bold text-white leading-[0.9]"
                                            style={{ fontFamily: '"Playfair Display", serif' }}
                                        >
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">EXPLORE PATHWAY</span>
                                            <div className="w-12 h-[1px] bg-white/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Controls - Magnetic Nodes */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 md:px-32 pointer-events-none z-50">
                    <button
                        onClick={(e) => { e.stopPropagation(); rotate('prev'); }}
                        className="w-20 h-20 border border-[#1a1a1a]/5 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-2xl pointer-events-auto hover:border-[#d4af37]/40 hover:bg-white/40 transition-all duration-500 group/btn"
                    >
                        <ChevronLeft className="text-[#1a1a1a]/40 group-hover/btn:text-[#d4af37] transition-colors" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); rotate('next'); }}
                        className="w-20 h-20 border border-[#1a1a1a]/5 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-2xl pointer-events-auto hover:border-[#d4af37]/40 hover:bg-white/40 transition-all duration-500 group/btn"
                    >
                        <ChevronRight className="text-[#1a1a1a]/40 group-hover/btn:text-[#d4af37] transition-colors" />
                    </button>
                </div>
            </div>



            {/* Modal Layer v3 - Cinematic Glass */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-8 md:p-32 bg-[#faf9f6]/95 backdrop-blur-[50px]"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-16 right-16 w-16 h-16 border border-[#1a1a1a]/5 rounded-full flex items-center justify-center hover:border-[#d4af37]/40 transition-all group/close bg-white/20"
                        >
                            <X className="text-[#1a1a1a]/40 group-hover/close:text-[#d4af37] transition-colors" />
                        </motion.button>

                        <div className="max-w-[1400px] w-full grid lg:grid-cols-2 gap-24 items-center">
                            <motion.div
                                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="aspect-[4/5] rounded-sm overflow-hidden border border-[#1a1a1a]/5 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.3)] relative group/modal-img"
                            >
                                <ImageWithFallback
                                    src={eventCards[currentIndex].image}
                                    alt="Expanded"
                                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover/modal-img:scale-110"
                                />
                                <div className="absolute inset-0 border-[20px] border-[#faf9f6]/10" />
                            </motion.div>

                            <div className="space-y-16">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-[1px] bg-[#d4af37]" />
                                        <span className="text-[12px] font-bold tracking-[1em] text-[#d4af37] uppercase">{eventCards[currentIndex].category}</span>
                                    </div>
                                    <h2
                                        className="text-7xl md:text-9xl font-bold text-[#1a1a1a] leading-[0.85] tracking-tighter"
                                        style={{ fontFamily: '"Playfair Display", serif' }}
                                    >
                                        {eventCards[currentIndex].title}
                                    </h2>
                                </div>

                                <p
                                    className="text-3xl md:text-4xl text-[#1a1a1a]/60 leading-relaxed font-light italic"
                                    style={{ fontFamily: '"Playfair Display", serif' }}
                                >
                                    "{eventCards[currentIndex].description}"
                                </p>


                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};