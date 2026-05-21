'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Star, Quote, Fingerprint } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Cambridge Scholar (PhD Physics)',
        refId: 'PRAISE_CAM_01',
        text: (
            <>
                Their academic mentors completely demystified the <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">Cambridge PhD application</span>. The research proposal guidance was absolutely <span className="italic font-serif text-[#d4af37] font-bold">world-class</span>.
            </>
        ),
        rating: 5
    },
    {
        id: 2,
        name: 'Chloe Dupont',
        role: 'Sorbonne Graduate (MA History)',
        refId: 'PRAISE_SOR_02',
        text: (
            <>
                The <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">visa and relocation strategy</span> was incredibly smooth. They handled all my French immigration documentation with absolute <span className="italic font-serif text-[#d4af37] font-bold">precision</span>.
            </>
        ),
        rating: 5
    },
    {
        id: 3,
        name: 'Marcus Miller',
        role: 'Stanford Alumnus (MSc AI)',
        refId: 'PRAISE_STAN_03',
        text: (
            <>
                Partnering with their <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">essay strategists</span> helped me craft an admissions profile that was cohesive, impactful, and stood out at <span className="italic font-serif text-[#d4af37] font-bold">Stanford</span>.
            </>
        ),
        rating: 5
    },
    {
        id: 4,
        name: 'Yuki Sato',
        role: 'Melbourne Alumna (BBA)',
        refId: 'PRAISE_MEL_04',
        text: (
            <>
                Their scholarship advisor helped me secure a <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">fully-funded path in Australia</span>. I am incredibly grateful for their <span className="italic font-serif text-[#d4af37] font-bold">premium mentorship</span>.
            </>
        ),
        rating: 5
    },
    {
        id: 5,
        name: 'Zahra Al-Jamil',
        role: 'Imperial Scholar (MSc Biotech)',
        refId: 'PRAISE_IMP_05',
        text: (
            <>
                From initial <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">profile grooming to mock academic interviews</span>, they refined every facet of my application for <span className="italic font-serif text-[#d4af37] font-bold">Imperial College London</span>.
            </>
        ),
        rating: 5
    },
    {
        id: 6,
        name: 'Daniel Kim',
        role: 'Berkeley Graduate (BSc ChemEng)',
        refId: 'PRAISE_BERK_06',
        text: (
            <>
                Flawless execution! Their <span className="font-extrabold text-[#1a1a1a] group-hover:text-[#bfa254] transition-colors duration-500">1-on-1 portfolio tutoring</span> gave me the competitive edge I needed for my <span className="italic font-serif text-[#d4af37] font-bold">Berkeley application</span>.
            </>
        ),
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
            className="testimonial-mini-card group relative bg-gradient-to-br from-white/95 via-white/85 to-[#faf8f4]/95 backdrop-blur-3xl p-8 rounded-[32px] border border-[#1a1a1a]/5 hover:border-[#d4af37]/35 transition-all duration-700 shadow-[0_15px_45px_-20px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.08)] mx-4 flex-shrink-0 w-[420px] overflow-hidden"
        >
            {/* Dynamic Gold Aura Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#d4af37]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Fine line border highlight on hover */}
            <div className="absolute -inset-[1px] rounded-[33px] bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/25 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

            {/* Archival HUD */}
            <div className="relative z-10 flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <span className="text-[8.5px] font-mono tracking-[0.25em] text-[#1a1a1a]/40 group-hover:text-[#d4af37] transition-colors duration-500 block uppercase font-bold">
                        {testimonial.refId}
                    </span>
                    <span className="text-[7px] font-mono tracking-[0.2em] text-[#d4af37]/60 block uppercase">
                        Secured Pathways
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={12} 
                            fill="#d4af37" 
                            stroke="#d4af37" 
                            className="opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-500" 
                            style={{ transitionDelay: `${i * 50}ms` }}
                        />
                    ))}
                </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 mb-8">
                <Quote className="absolute -top-6 -left-4 w-10 h-10 text-[#d4af37]/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 group-hover:text-[#d4af37]/10 transition-all duration-700" />
                <p className="text-lg text-[#1a1a1a]/65 group-hover:text-[#1a1a1a] font-light leading-relaxed relative z-10 transition-colors duration-500 pl-4 border-l-2 border-[#d4af37]/25 group-hover:border-[#d4af37]/60">
                    {testimonial.text}
                </p>
            </div>

            {/* Author Attribution */}
            <div className="relative z-10 flex items-center justify-between border-t border-[#1a1a1a]/5 pt-6 mt-2">
                <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#1a1a1a] tracking-tight group-hover:text-[#bfa254] transition-colors duration-500">{testimonial.name}</span>
                    <span className="text-[9.5px] font-extrabold tracking-[0.25em] text-[#d4af37] uppercase mt-1.5">{testimonial.role}</span>
                </div>
                <div className="flex flex-col items-end text-[#1a1a1a]/30 group-hover:text-[#d4af37] group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[6px] font-bold tracking-[0.2em] uppercase opacity-40 group-hover:opacity-80 transition-opacity">Verified Record</span>
                    <Fingerprint className="w-5 h-5 mt-1 animate-pulse" />
                </div>
            </div>

            {/* Kinetic Border Pulse */}
            <div className="absolute inset-0 rounded-[32px] pointer-events-none border border-white/40 z-10" />
        </motion.div>
    );
};

export const TestimonialsMiniSection = () => {
    return (
        <section className="relative w-full pt-4 pb-8 md:pt-6 md:pb-12 bg-[#fdfaf3] overflow-hidden">
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
                <div className="container mx-auto px-8 max-w-7xl">
                    <div className="max-w-3xl mx-auto mb-4 md:mb-6 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-3 mb-1">
                            <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                            <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                                06 / Testimonials
                            </span>
                            <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                        </div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight text-center"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            Scholar <span className="relative inline-block font-light italic bg-gradient-to-r from-[#bfa254] via-[#e5cf92] to-[#ab8e3f] bg-clip-text text-transparent">Praise</span>
                        </motion.h2>
                    </div>
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
