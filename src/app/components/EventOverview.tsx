import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventOverviewProps {
    description: string;
    highlights: string[];
    stats: Array<{ label: string; value: string }>;
}

export const EventOverview: React.FC<EventOverviewProps> = ({ description, highlights, stats }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const highlightsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                }
            });

            // Description animation
            gsap.from(descRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: descRef.current,
                    start: 'top 80%',
                }
            });

            // Highlights animation
            gsap.from(highlightsRef.current?.children || [], {
                opacity: 0,
                x: -30,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: highlightsRef.current,
                    start: 'top 80%',
                }
            });

            // Stats animation
            gsap.from(statsRef.current?.children || [], {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 80%',
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Description & Highlights */}
                    <div>
                        <h2 
                            ref={titleRef}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                            style={{ 
                                color: 'var(--color-maroon)',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Event Overview
                        </h2>

                        <div 
                            className="w-20 h-1 mb-8"
                            style={{ backgroundColor: 'var(--color-champagne)' }}
                        />

                        <p 
                            ref={descRef}
                            className="text-lg md:text-xl mb-12"
                            style={{ 
                                color: 'var(--color-charcoal)',
                                lineHeight: '1.8'
                            }}
                        >
                            {description}
                        </p>

                        {/* Highlights */}
                        <div ref={highlightsRef} className="space-y-4">
                            {highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div 
                                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                        style={{ 
                                            backgroundColor: 'var(--color-champagne)',
                                        }}
                                    >
                                        <Check size={14} className="text-white" strokeWidth={3} />
                                    </div>
                                    <p 
                                        className="text-base md:text-lg"
                                        style={{ 
                                            color: 'var(--color-charcoal)',
                                            lineHeight: '1.7'
                                        }}
                                    >
                                        {highlight}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div 
                        ref={statsRef}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <div 
                                key={index}
                                className="stat-card p-8 rounded-2xl text-center group cursor-pointer"
                                style={{
                                    background: 'linear-gradient(145deg, #ffffff 0%, #fefefe 100%)',
                                    border: '2px solid rgba(128, 0, 32, 0.1)',
                                    boxShadow: '0 8px 30px rgba(128, 0, 32, 0.06)',
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                            >
                                <div className="mb-4 flex justify-center">
                                    <Star 
                                        size={32} 
                                        className="stat-icon"
                                        style={{ color: 'var(--color-champagne)' }}
                                        fill="var(--color-champagne)"
                                    />
                                </div>
                                <div 
                                    className="text-4xl md:text-5xl font-bold mb-2"
                                    style={{ color: 'var(--color-maroon)' }}
                                >
                                    {stat.value}
                                </div>
                                <div 
                                    className="text-sm md:text-base font-medium uppercase tracking-wider"
                                    style={{ color: 'var(--color-charcoal)', opacity: 0.7 }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .stat-card:hover {
                    transform: translateY(-8px) scale(1.05);
                    border-color: var(--color-champagne);
                    box-shadow: 0 20px 60px rgba(212, 175, 55, 0.25);
                }

                .stat-card:hover .stat-icon {
                    transform: rotate(20deg) scale(1.2);
                    transition: transform 0.4s ease;
                }
            `}</style>
        </section>
    );
};
