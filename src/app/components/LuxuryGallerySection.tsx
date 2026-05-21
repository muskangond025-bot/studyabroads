"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database } from 'lucide-react';
import "../../styles/archival-exhibition.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
    {
        src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
        label: "OXF_NODE_01",
        detail: "Oxford Matriculation",
        metrics: "PLACEMENT 100%",
        desc: "Bespoke preparation matching rigorous scholastic criteria for elite collegiate acceptance."
    },
    {
        src: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=2069&auto=format&fit=crop",
        label: "HAR_NODE_02",
        detail: "Harvard Fellowship",
        metrics: "SCHOLARSHIP $85K",
        desc: "Tailoring application portfolios to secure elite merit fellowships and research fellowships."
    },
    {
        src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1974&auto=format&fit=crop",
        label: "TOR_NODE_03",
        detail: "Toronto Innovation",
        metrics: "COHORT SYNC 99.2%",
        desc: "Mentoring diverse international cohorts to transition seamlessly into premier research labs."
    },
    {
        src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2090&auto=format&fit=crop",
        label: "SYD_NODE_04",
        detail: "Sydney Career Hub",
        metrics: "VISA INTEGRITY 100%",
        desc: "Securing direct pathways and streamlined relocation pipelines in Australia's progressive coastal hubs."
    }
];

export const LuxuryGallerySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gallery-title-line", {
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                y: 50, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power3.out"
            });
            gsap.from(".gallery-card", {
                scrollTrigger: { trigger: ".gallery-grid", start: "top 75%" },
                y: 100, opacity: 0, stagger: 0.15, duration: 1.5, ease: "power4.out"
            });
        }, containerRef);

        // Sequential Flip Logic
        const interval = setInterval(() => {
            setFlippedIndices(prev => {
                if (prev.length === images.length) return [];
                return [...prev, prev.length];
            });
        }, 3000);

        return () => {
            ctx.revert();
            clearInterval(interval);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full pt-4 pb-0 bg-[#fdfaf3] md:pt-6 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="galleryGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#galleryGrid)" />
                </svg>
            </div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="mb-4 md:mb-6 text-center flex flex-col items-center justify-center mx-auto max-w-3xl">
                    <div className="gallery-title-line flex items-center justify-center gap-3 mb-1">
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                        <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                            02 / Admissions Registry
                        </span>
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                    </div>
                    <h2 
                        className="gallery-title-line text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight text-center"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        The Admissions <span className="font-light italic text-[#d4af37]">Exhibition</span>
                    </h2>
                </div>

                <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {images.map((item, i) => (
                        <GalleryCard key={i} item={item} isFlipped={flippedIndices.includes(i)} />
                    ))}
                </div>

                <div className="mt-0 flex justify-between items-center opacity-30 text-[8px] font-mono tracking-[0.8em] uppercase text-[#1a1a1a]">
                    <span>Curating elite academic paths</span>
                    <div className="hidden md:block w-48 h-[1px] bg-[#d4af37]/50" />
                    <span>Deployment 2026</span>
                </div>
            </div>
        </section>
    );
};

const GalleryCard = ({ item, isFlipped }: { item: typeof images[0], isFlipped: boolean }) => {
    return (
        <div className="gallery-card relative w-full aspect-[16/10] perspective-2000 group cursor-pointer">
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full preserve-3d"
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden rounded-sm overflow-hidden shadow-2xl bg-white">
                    <img
                        src={item.src}
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                        alt="Front"
                    />
                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-[#d4af37]/40" />
                    <div className="absolute top-8 left-8">
                        <span className="text-[9px] font-mono tracking-[0.5em] text-[#d4af37] uppercase">{item.label}</span>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-sm overflow-hidden shadow-2xl bg-[#1a1a1a] p-8 md:p-10 flex flex-col justify-between border border-[#d4af37]/20"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-[10px] font-mono tracking-[0.4em] text-[#d4af37] uppercase">{item.label}</p>
                            <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-tight">{item.detail}</h3>
                        </div>
                        <Database className="w-6 h-6 text-[#d4af37]/40" />
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[10px] text-white/40 font-mono tracking-widest mb-2 uppercase">Integrity Metrics</p>
                            <p className="text-lg md:text-xl font-bold text-[#d4af37] tracking-[0.2em] font-mono">{item.metrics}</p>
                        </div>
                        <p className="text-xs md:text-sm text-white/60 font-light italic leading-relaxed">"{item.desc}"</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-white/10">
                        <div className="flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                            <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                            <div className="w-1 h-1 rounded-full bg-[#d4af37]/20" />
                        </div>
                        <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">Verified Archive</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
