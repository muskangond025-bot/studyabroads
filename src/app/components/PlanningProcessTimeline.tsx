import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
    number: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface PlanningProcessTimelineProps {
    steps: TimelineStep[];
}

export const PlanningProcessTimeline: React.FC<PlanningProcessTimelineProps> = ({ steps }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

            // Timeline line animation
            if (timelineRef.current) {
                gsap.fromTo('.timeline-line',
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 70%',
                        }
                    }
                );
            }

            // Steps animation - staggered
            const validSteps = stepsRef.current.filter(step => step !== null);
            validSteps.forEach((step, index) => {
                gsap.from(step, {
                    opacity: 0,
                    x: index % 2 === 0 ? -60 : 60,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="w-full py-20 md:py-32"
            style={{ backgroundColor: '#fafafa' }}
        >
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        style={{ 
                            color: 'var(--color-maroon)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Planning Process
                    </h2>

                    <div 
                        className="w-24 h-1 mx-auto mb-6"
                        style={{ backgroundColor: 'var(--color-champagne)' }}
                    />

                    <p 
                        className="text-lg md:text-xl max-w-3xl mx-auto"
                        style={{ 
                            color: 'var(--color-charcoal)',
                            lineHeight: '1.8'
                        }}
                    >
                        Our proven step-by-step process ensures flawless execution
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical Line */}
                    <div 
                        className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 origin-top hidden md:block"
                        style={{ 
                            background: 'linear-gradient(to bottom, var(--color-champagne) 0%, var(--color-maroon) 100%)',
                        }}
                    />

                    {/* Timeline Steps */}
                    <div className="space-y-12 md:space-y-20">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    ref={el => stepsRef.current[index] = el}
                                    className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        <div 
                                            className="timeline-card p-8 rounded-2xl group cursor-pointer"
                                            style={{
                                                background: 'white',
                                                border: '2px solid rgba(128, 0, 32, 0.1)',
                                                boxShadow: '0 8px 30px rgba(128, 0, 32, 0.06)',
                                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            }}
                                        >
                                            <div className="flex items-start gap-4 mb-4" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                                                <div 
                                                    className="text-6xl md:text-7xl font-bold opacity-10"
                                                    style={{ color: 'var(--color-maroon)' }}
                                                >
                                                    {step.number}
                                                </div>
                                            </div>

                                            <h3 
                                                className="text-2xl md:text-3xl font-bold mb-3"
                                                style={{ color: 'var(--color-maroon)' }}
                                            >
                                                {step.title}
                                            </h3>

                                            <p 
                                                className="text-base md:text-lg"
                                                style={{ 
                                                    color: 'var(--color-charcoal)',
                                                    lineHeight: '1.7',
                                                    opacity: 0.85
                                                }}
                                            >
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Icon */}
                                    <div className="hidden md:flex flex-shrink-0 relative z-10">
                                        <div 
                                            className="timeline-icon w-20 h-20 rounded-full flex items-center justify-center"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%)',
                                                boxShadow: '0 0 0 8px #fafafa, 0 10px 30px rgba(212, 175, 55, 0.4)',
                                            }}
                                        >
                                            <IconComponent size={32} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Empty space for alignment */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                .timeline-card:hover {
                    transform: scale(1.03);
                    border-color: var(--color-champagne);
                    box-shadow: 0 20px 60px rgba(212, 175, 55, 0.25);
                }

                .timeline-icon {
                    transition: all 0.4s ease;
                }

                .timeline-card:hover + .timeline-icon,
                .timeline-icon:hover {
                    transform: scale(1.2) rotate(10deg);
                    box-shadow: 0 0 0 8px #fafafa, 0 15px 40px rgba(212, 175, 55, 0.5);
                }

                @media (max-width: 768px) {
                    .timeline-card {
                        padding: 24px;
                    }
                }
            `}</style>
        </section>
    );
};
