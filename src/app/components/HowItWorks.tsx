'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import imagesLoaded from 'imagesloaded';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Step {
    id: number;
    number: string;
    title: string;
    description: string;
    image: string;
    details: string[];
}

const steps: Step[] = [
    {
        id: 1,
        number: 'STEP 01',
        title: 'Initial Briefing',
        description: 'We begin with a deep exploration of your vision, mapping the heritage and core objectives of your event archetypes.',
        details: ['VISION MAPPING', 'HERITAGE AUDIT', 'GOAL DEFINITION'],
        image: 'https://images.unsplash.com/photo-1704793602349-f56b6ddaa2c5?q=80&w=1080'
    },
    {
        id: 2,
        number: 'STEP 02',
        title: 'Spatial Reconstruction',
        description: 'Our architects translate the brief into immersive spatial environments, balancing aesthetic weight with kinetic flow.',
        details: ['3D MODELING', 'FLOW ANALYSIS', 'AESTHETIC BALANCING'],
        image: 'https://images.unsplash.com/photo-1665491961263-2c9f8deebf63?q=80&w=1080'
    },
    {
        id: 3,
        number: 'STEP 03',
        title: 'Kinetic Engineering',
        description: 'Every element is engineered for motion, ensuring the environment remains alive and responsive to human interaction.',
        details: ['MOTION DESIGN', 'INTERACTIVE NODES', 'SENSORY LAYERING'],
        image: 'https://images.unsplash.com/photo-1712903276004-ea6b4a916abe?q=80&w=1080'
    },
    {
        id: 4,
        number: 'STEP 04',
        title: 'Event Archetype',
        description: 'The final execution is a living piece—a meticulously managed environment that redefines the standard of excellence.',
        details: ['LIVE MANAGEMENT', 'REAL-TIME OPTIMIZATION', 'EVENT LOGGING'],
        image: 'https://images.unsplash.com/photo-1599968125179-0b70eda83533?q=80&w=1080'
    }
];

export function HowItWorks() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const imgLoad = imagesLoaded(containerRef.current!);
            
            imgLoad.on('done', () => {
                // Initial entrance animation
                gsap.from('.step-card', {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: 'power4.out'
                });
                
                gsap.from('.info-content', {
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.5
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        const nextIndex = (currentIndex + 1) % steps.length;
        animateTransition(nextIndex, 'next');
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        const prevIndex = (currentIndex - 1 + steps.length) % steps.length;
        animateTransition(prevIndex, 'prev');
    };

    const animateTransition = (newIndex: number, direction: 'next' | 'prev') => {
        const infoElements = infoRef.current?.children;
        const bgElements = bgContainerRef.current?.children;
        
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }
        });

        // Info text fade out/in
        tl.to(infoElements!, {
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.in'
        });

        // Background transition
        tl.to(bgElements!, {
            opacity: 0,
            duration: 0.8,
            ease: 'sine.inOut'
        }, 0);

        tl.call(() => {
            // This happens mid-timeline
        });

        tl.fromTo(infoElements!, 
            { opacity: 0, y: direction === 'next' ? 20 : -20 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out' }
        );

        tl.to(bgElements!, {
            opacity: 1,
            duration: 0.8,
            ease: 'sine.inOut'
        }, "-=0.4");
    };

    return (
        <section 
            ref={containerRef}
            className="w-full bg-[#faf9f6] relative overflow-hidden flex items-center py-16"
        >
            {/* Immersive Background Layer */}
            <div ref={bgContainerRef} className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.08] blur-[100px] scale-110">
                    <ImageWithFallback
                        src={steps[currentIndex].image}
                        alt="Background"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="absolute inset-0 bg-[#faf9f6]/80" />
            </div>

            {/* Filmic Noise Texture */}
            <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseHowItWorks">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseHowItWorks)" />
                </svg>
            </div>

            <div className="container mx-auto px-8 lg:px-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    
                    {/* Left: Content Information */}
                    <div ref={infoRef} className="space-y-12 max-w-xl">
                        <h2 
                            key={`title-${currentIndex}`}
                            className="text-4xl md:text-6xl font-bold text-[#1a1a1a] leading-none"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            {steps[currentIndex].title}
                        </h2>

                        <p 
                            key={`desc-${currentIndex}`}
                            className="text-lg text-[#1a1a1a]/60 leading-relaxed font-light italic"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            "{steps[currentIndex].description}"
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {steps[currentIndex].details.map((detail, i) => (
                                <div key={i} className="px-6 py-3 border border-[#1a1a1a]/5 rounded-sm bg-white/40 backdrop-blur-md">
                                    <span className="text-[9px] text-[#1a1a1a]/40 font-bold tracking-widest uppercase">{detail}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 pt-8">
                            <button 
                                onClick={handlePrev}
                                className="w-16 h-16 border border-[#1a1a1a]/5 rounded-full flex items-center justify-center hover:border-[#d4af37]/40 transition-colors group/btn"
                            >
                                <ChevronLeft className="text-[#1a1a1a]/40 group-hover/btn:text-[#d4af37] transition-colors" />
                            </button>
                            <button 
                                onClick={handleNext}
                                className="w-16 h-16 border border-[#1a1a1a]/5 rounded-full flex items-center justify-center hover:border-[#d4af37]/40 transition-colors group/btn"
                            >
                                <ChevronRight className="text-[#1a1a1a]/40 group-hover/btn:text-[#d4af37] transition-colors" />
                            </button>
                            <div className="flex items-center gap-4 ml-auto">
                                <span className="text-2xl font-bold text-[#1a1a1a] tabular-nums" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {(currentIndex + 1).toString().padStart(2, '0')}
                                </span>
                                <div className="w-24 h-[1px] bg-[#1a1a1a]/10">
                                    <motion.div 
                                        className="h-full bg-[#d4af37]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-[#1a1a1a]/20">0{steps.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: 3D Stacked Card Gallery */}
                    <div className="relative aspect-[4/5] perspective-1000">
                        <div ref={cardsWrapperRef} className="w-full h-full relative">
                            {steps.map((step, idx) => {
                                const isCurrent = idx === currentIndex;
                                const isNext = idx === (currentIndex + 1) % steps.length;
                                const isPrev = idx === (currentIndex - 1 + steps.length) % steps.length;
                                
                                return (
                                    <div
                                        key={step.id}
                                        className={`absolute inset-0 transition-all duration-1000 ease-[0.76,0,0.24,1] step-card ${
                                            isCurrent ? 'z-30 opacity-100 scale-100 translate-x-0 rotate-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]' : 
                                            isNext ? 'z-20 opacity-40 scale-90 translate-x-12 rotate-y-[-10deg]' :
                                            isPrev ? 'z-10 opacity-0 scale-75 translate-x-[-100%] rotate-y-[20deg]' :
                                            'z-0 opacity-0'
                                        }`}
                                    >
                                        <div className="w-full h-full rounded-sm overflow-hidden border border-[#1a1a1a]/5 relative group/card">
                                            <ImageWithFallback
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover transition-transform duration-[4s] group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helper Framer Motion imports for small details
import { motion } from 'motion/react';
