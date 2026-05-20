import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
    rating: number;
}

interface EventTestimonialsProps {
    testimonials: Testimonial[];
}

export const EventTestimonials: React.FC<EventTestimonialsProps> = ({ testimonials }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

            // Cards wave animation from center
            const validCards = cardsRef.current.filter(card => card !== null);
            gsap.from(validCards, {
                opacity: 0,
                y: 60,
                scale: 0.9,
                duration: 0.8,
                stagger: {
                    amount: 1,
                    from: 'center',
                    ease: 'power2.inOut',
                },
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
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
                        What Our Clients Say
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
                        Hear from clients who trusted us with their special moments
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="testimonial-card group"
                        >
                            {/* Quote Icon */}
                            <div 
                                className="quote-icon-wrapper mb-6"
                            >
                                <Quote 
                                    size={40} 
                                    className="quote-icon"
                                    fill="var(--color-champagne)"
                                />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={16} 
                                        fill="var(--color-champagne)"
                                        style={{ color: 'var(--color-champagne)' }}
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p 
                                className="text-base md:text-lg mb-6"
                                style={{ 
                                    color: 'var(--color-charcoal)',
                                    lineHeight: '1.8',
                                    opacity: 0.9
                                }}
                            >
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t-2" style={{ borderColor: 'rgba(128, 0, 32, 0.08)' }}>
                                <div 
                                    className="testimonial-avatar"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '3px solid var(--color-champagne)',
                                        flexShrink: 0
                                    }}
                                >
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h4 
                                        className="text-lg font-bold"
                                        style={{ color: 'var(--color-maroon)' }}
                                    >
                                        {testimonial.name}
                                    </h4>
                                    <p 
                                        className="text-sm"
                                        style={{ 
                                            color: 'var(--color-charcoal)',
                                            opacity: 0.7
                                        }}
                                    >
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .testimonial-card {
                    position: relative;
                    padding: 40px;
                    border-radius: 24px;
                    background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
                    border: 2px solid rgba(128, 0, 32, 0.08);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 8px 30px rgba(128, 0, 32, 0.06);
                    overflow: hidden;
                }

                .testimonial-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background: linear-gradient(90deg, 
                        var(--color-champagne) 0%, 
                        var(--color-maroon) 50%, 
                        var(--color-champagne) 100%);
                    transform: scaleX(0);
                    transition: transform 0.5s ease;
                }

                .testimonial-card:hover::before {
                    transform: scaleX(1);
                }

                .testimonial-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    border-color: var(--color-champagne);
                    box-shadow: 
                        0 25px 70px rgba(212, 175, 55, 0.25),
                        0 0 0 1px var(--color-champagne);
                }

                .quote-icon-wrapper {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(128, 0, 32, 0.05) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s ease;
                }

                .testimonial-card:hover .quote-icon-wrapper {
                    background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%);
                    transform: scale(1.1) rotate(-10deg);
                }

                .quote-icon {
                    color: var(--color-champagne);
                    transition: all 0.4s ease;
                }

                .testimonial-card:hover .quote-icon {
                    color: white;
                    fill: white;
                }

                .testimonial-avatar {
                    transition: all 0.3s ease;
                }

                .testimonial-card:hover .testimonial-avatar {
                    transform: scale(1.1);
                    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
                }

                @media (max-width: 768px) {
                    .testimonial-card {
                        padding: 28px;
                    }

                    .quote-icon-wrapper {
                        width: 56px;
                        height: 56px;
                    }
                }
            `}</style>
        </section>
    );
};
