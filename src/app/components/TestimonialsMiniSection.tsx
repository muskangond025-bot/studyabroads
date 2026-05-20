'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Star, Quote, Terminal, Fingerprint, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Cambridge Scholar (PhD Physics)',
        refId: 'PRAISE_CAM_01',
        text: 'Their academic mentors completely demystified the Cambridge PhD application. The research proposal guidance was absolutely world-class.',
        rating: 5
    },
    {
        id: 2,
        name: 'Chloe Dupont',
        role: 'Sorbonne Graduate (MA History)',
        refId: 'PRAISE_SOR_02',
        text: 'The visa and relocation strategy was incredibly smooth. They handled all my French immigration documentation with absolute precision.',
        rating: 5
    },
    {
        id: 3,
        name: 'Marcus Miller',
        role: 'Stanford Alumnus (MSc AI)',
        refId: 'PRAISE_STAN_03',
        text: 'Partnering with their essay strategists helped me craft an admissions profile that was cohesive, impactful, and stood out at Stanford.',
        rating: 5
    },
    {
        id: 4,
        name: 'Yuki Sato',
        role: 'Melbourne Alumna (BBA)',
        refId: 'PRAISE_MEL_04',
        text: 'Their scholarship advisor helped me secure a fully-funded path in Australia. I am incredibly grateful for their premium mentorship.',
        rating: 5
    },
    {
        id: 5,
        name: 'Zahra Al-Jamil',
        role: 'Imperial Scholar (MSc Biotech)',
        refId: 'PRAISE_IMP_05',
        text: 'From initial profile grooming to mock academic interviews, they refined every facet of my application for Imperial College London.',
        rating: 5
    },
    {
        id: 6,
        name: 'Daniel Kim',
        role: 'Berkeley Graduate (BSc ChemEng)',
        refId: 'PRAISE_BERK_06',
        text: 'Flawless execution! Their 1-on-1 portfolio tutoring gave me the competitive edge I needed for my Berkeley application.',
        rating: 5
    }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // 3D Tilt Physics
    const x = useSpring(0, { stiffness: 150, damping: 20 });
    const y = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="testimonial-mini-card group relative bg-white/80 backdrop-blur-3xl p-8 rounded-[32px] border border-[#1a1a1a]/10 hover:border-[#d4af37]/40 transition-all duration-700 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] mx-4 flex-shrink-0 w-[420px]"
        >
            {/* Archival HUD */}
            <div className="relative z-10 flex justify-between items-start mb-10">
                <div className="space-y-2">
                </div>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < testimonial.rating ? "#d4af37" : "transparent"} stroke={i < testimonial.rating ? "#d4af37" : "#1a1a1a"} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    ))}
                </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 mb-8">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[#d4af37]/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <p className="text-lg text-[#1a1a1a]/70 font-light leading-relaxed italic relative z-10">
                    "{testimonial.text}"
                </p>
            </div>

            {/* Author Attribution */}
            <div className="relative z-10 flex items-center justify-between border-t border-[#1a1a1a]/5 pt-6">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1a1a1a] tracking-tight">{testimonial.name}</span>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] uppercase mt-1">{testimonial.role}</span>
                </div>
                <div className="flex flex-col items-end opacity-20">
                    <span className="text-[6px] font-bold tracking-[0.2em] uppercase">Verified Record</span>
                    <Fingerprint className="w-4 h-4" />
                </div>
            </div>

            {/* Kinetic Border Pulse */}
            <div className="absolute inset-0 rounded-[32px] pointer-events-none border border-white/40 z-10" />
        </motion.div>
    );
};

export const TestimonialsMiniSection = () => {
    return (
        <section className="relative w-full pt-12 pb-8 md:pt-16 md:pb-12 bg-[#fdfaf3] overflow-hidden">
            {/* Atmospheric Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseTestimonials">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseTestimonials)" />
                    </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#d4af37]/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Cinematic Header Sequence */}
                <div className="text-center mb-12 md:mb-16 px-8">


                    <h2 
                        className="text-6xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter leading-none mb-12"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Scholar <span className="text-[#d4af37]">Praise</span>
                    </h2>


                </div>

                {/* Cinematic Marquee Track */}
                <div className="relative">
                    {/* Gradient Depth Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-48 z-20 pointer-events-none bg-gradient-to-r from-[#fdfaf3] via-[#fdfaf3]/80 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-48 z-20 pointer-events-none bg-gradient-to-l from-[#fdfaf3] via-[#fdfaf3]/80 to-transparent" />

                    <div className="flex overflow-hidden py-12">
                        <motion.div 
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="flex"
                        >
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </div>


            </div>
        </section>
    );
};
