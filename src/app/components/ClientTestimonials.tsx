'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote, MapPin, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Testimonial {
    author: {
        name: string;
        handle: string;
        avatar: string;
    };
    text: string;
    coordinates: string;
    refCode: string;
}

const testimonials: Testimonial[] = [
    {
        author: {
            name: "Aria Mitchell",
            handle: "Oxford Scholar (MSc Computer Science)",
            avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?q=80&w=400"
        },
        refCode: "ARC-772-MT",
        coordinates: "51.7548° N, 1.2544° W",
        text: "The admissions team was instrumental in helping me shape my research narrative. Their 1-on-1 portfolio tutoring completely redefined my Oxford application."
    },
    {
        author: {
            name: "Rohan Mehta",
            handle: "Harvard Student (MBA)",
            avatar: "https://images.unsplash.com/photo-1629507208649-70919ca33793?q=80&w=400"
        },
        refCode: "ARC-814-DA",
        coordinates: "42.3770° N, 71.1167° W",
        text: "Securing my admission and a substantial fellowship at Harvard Business School felt unattainable until I partnered with their elite academic mentors."
    },
    {
        author: {
            name: "Li Wei",
            handle: "Toronto Graduate (BSc Engineering)",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
        },
        refCode: "ARC-102-EM",
        coordinates: "43.6629° N, 79.3957° W",
        text: "Moving to Canada was smooth and completely stress-free. The visa guidance was architecturally precise, keeping me informed at every step."
    },
    {
        author: {
            name: "Emma Watson",
            handle: "ETH Zurich Alumna (MSc Robotics)",
            avatar: "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?q=80&w=400"
        },
        refCode: "ARC-339-RC",
        coordinates: "47.3763° N, 8.5480° E",
        text: "Their strategic preparation for the GRE and technical portfolio development helped me stand out in a highly competitive Swiss applicant pool."
    },
    {
        author: {
            name: "Sofia Rossi",
            handle: "Columbia Scholar (MA Journalism)",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
        },
        refCode: "ARC-505-JW",
        coordinates: "40.8075° N, 73.9626° W",
        text: "Beyond the visa and application checklists, they provided true mentoring that helped me transition seamlessly into the fast-paced life of New York."
    },
    {
        author: {
            name: "Kenji Tanaka",
            handle: "Sydney Scholar (BBA)",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
        },
        refCode: "ARC-911-MT",
        coordinates: "33.8886° S, 151.1874° E",
        text: "Their scholarship strategy helped me secure a fully-funded study path in Australia. I cannot recommend their premium service highly enough!"
    }
];

export const ClientTestimonials = () => {
    return (
        <section className="relative w-full bg-[#F8F9FA] pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden flex flex-col items-center">
            
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseTestimonialsUltimate">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseTestimonialsUltimate)" />
                </svg>
            </div>

            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-10 pointer-events-none hidden lg:flex">
                <span className="text-[10px] font-bold tracking-[1em] text-[#1a1a1a] uppercase rotate-90 origin-center whitespace-nowrap" style={{ fontFamily: '"Outfit", sans-serif' }}>VOICE OF THE COHORT</span>
                <div className="w-[1px] h-32 bg-[#1a1a1a]/20" />
                <span className="text-[10px] font-bold text-[#1a1a1a] uppercase rotate-90 origin-center" style={{ fontFamily: '"Outfit", sans-serif' }}>EST. 2016</span>
            </div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-10 md:mb-12 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6 mb-3"
                    >
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-[10px] font-bold tracking-[1em] text-[#D4AF37] uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>Testimonials</span>
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                    </motion.div>

                    <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Scholar <span className="font-light italic text-[#D4AF37]">Testimonials</span>
                    </h2>
                    <p 
                        className="text-base md:text-lg text-[#1a1a1a]/40 font-light italic max-w-2xl mx-auto leading-relaxed"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        "Authentic reports from the successful international study pathways we've helped shape."
                    </p>
                </div>

                <div className="relative w-full flex flex-col gap-8 overflow-hidden">
                    
                    {/* Row 1 - Moves Left, Pauses on Hover */}
                    <div className="group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div 
                            className="flex gap-8 whitespace-nowrap py-4 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer"
                            style={{ '--duration': '55s' } as React.CSSProperties}
                        >
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <ArchivalTestimonialPlate key={i} testimonial={t} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - Moves Right, Pauses on Hover */}
                    <div className="group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div 
                            className="flex gap-8 whitespace-nowrap py-4 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer"
                            style={{ '--duration': '60s' } as React.CSSProperties}
                        >
                            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
                                <ArchivalTestimonialPlate key={i} testimonial={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ArchivalTestimonialPlate = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <div className="inline-block w-[350px] md:w-[420px] bg-white/50 backdrop-blur-md rounded-3xl border border-[#1a1a1a]/10 p-8 md:p-10 relative group transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(26,26,26,0.08)] hover:border-[#D4AF37]/40 overflow-hidden">
            {/* Subtle Champagne Wash Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
            
            {/* Archival Status Node */}
            <div className="absolute top-6 right-8 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                    <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37]"
                    />
                    <span className="text-[8px] font-bold text-[#D4AF37] tracking-widest uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>VERIFIED</span>
                </div>
            </div>

            <div className="flex flex-col gap-6 whitespace-normal relative z-10">
                {/* Quote Body with Drop Cap Style */}
                <div className="relative space-y-4 pt-4">
                    <Quote className="w-8 h-8 text-[#D4AF37]/10 absolute -top-4 -left-2" />
                    <p 
                        className="text-base md:text-lg text-[#1a1a1a]/85 leading-[1.6] font-light italic relative z-10"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        <span className="text-2xl text-[#D4AF37] not-italic mr-1 font-bold">"</span>
                        {testimonial.text}
                        <span className="text-2xl text-[#D4AF37] not-italic ml-1 font-bold">"</span>
                    </p>
                </div>

                {/* Author & Telemetry */}
                <div className="flex items-end justify-between pt-6 border-t border-[#1a1a1a]/5">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500 p-0.5 bg-white">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <ImageWithFallback
                                        src={testimonial.author.avatar}
                                        alt={testimonial.author.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] p-0.5 rounded-full border border-white">
                                <ShieldCheck className="w-2.5 h-2.5 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-[#1a1a1a] uppercase tracking-tighter leading-none" style={{ fontFamily: '"Outfit", sans-serif' }}>{testimonial.author.name}</span>
                            <span className="text-[8px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]" style={{ fontFamily: '"Outfit", sans-serif' }}>{testimonial.author.handle}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic Background Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.01] mix-blend-overlay">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <filter id="cardNoiseUltimate">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#cardNoiseUltimate)" />
                </svg>
            </div>

            {/* Kinetic Scanline Detail */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
                <motion.div 
                    animate={{ y: ["-100%", "800%"] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
                />
            </div>
            
            {/* Corner Accent Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
    );
};