import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ServicesIncludedProps {
    services: Service[];
}

export const ServicesIncluded: React.FC<ServicesIncludedProps> = ({ services }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

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

            // 3D Tilt Animation for cards
            const cards = cardsRef.current.filter(card => card !== null);
            gsap.from(cards, {
                rotationX: -25,
                rotationY: 10,
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.12,
                ease: 'power4.out',
                transformPerspective: 1000,
                scrollTrigger: {
                    trigger: cardsContainerRef.current,
                    start: 'top 80%',
                },
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
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="flex justify-center mb-6">
                        <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%)',
                                boxShadow: '0 10px 30px rgba(212,175,55,0.3)'
                            }}
                        >
                            <Sparkles size={28} className="text-white" />
                        </div>
                    </div>

                    <h2 
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        style={{ 
                            color: 'var(--color-maroon)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Services Included
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
                        Comprehensive event planning services tailored to your needs
                    </p>
                </div>

                {/* Services Grid */}
                <div ref={cardsContainerRef} className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="card service-card group"
                            >
                                {/* Card Header with Icon */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div 
                                        className="service-icon-wrapper"
                                    >
                                        <IconComponent 
                                            size={28} 
                                            className="service-icon"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 
                                            className="text-xl md:text-2xl font-bold mb-2"
                                            style={{ color: 'var(--color-maroon)' }}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className="checkmark-wrapper">
                                        <Check size={18} className="text-white" strokeWidth={3} />
                                    </div>
                                </div>

                                {/* Card Description */}
                                <p 
                                    className="text-base"
                                    style={{ 
                                        color: 'var(--color-charcoal)',
                                        lineHeight: '1.7',
                                        opacity: 0.85
                                    }}
                                >
                                    {service.description}
                                </p>

                                {/* Hover Border */}
                                <div className="service-border" />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .service-card {
                    position: relative;
                    padding: 32px;
                    border-radius: 20px;
                    background: white;
                    border: 2px solid rgba(128, 0, 32, 0.08);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 4px 20px rgba(128, 0, 32, 0.04);
                    overflow: hidden;
                }

                .service-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--color-champagne);
                    box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
                    background: linear-gradient(145deg, #ffffff 0%, #fffef8 100%);
                }

                .service-icon-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(128, 0, 32, 0.05) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s ease;
                    flex-shrink: 0;
                }

                .service-card:hover .service-icon-wrapper {
                    background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%);
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
                }

                .service-icon {
                    color: var(--color-champagne);
                    transition: all 0.4s ease;
                }

                .service-card:hover .service-icon {
                    color: white;
                }

                .checkmark-wrapper {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--color-champagne);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                    opacity: 0;
                }

                .service-card:hover .checkmark-wrapper {
                    opacity: 1;
                    transform: scale(1.1);
                }

                .service-border {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 4px;
                    background: linear-gradient(90deg, 
                        var(--color-champagne) 0%, 
                        var(--color-maroon) 100%);
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .service-card:hover .service-border {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .service-card {
                        padding: 24px;
                    }

                    .service-icon-wrapper {
                        width: 48px;
                        height: 48px;
                    }
                }
            `}</style>
        </section>
    );
};