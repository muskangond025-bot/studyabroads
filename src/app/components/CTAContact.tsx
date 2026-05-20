import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTAContact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main content animation
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 80%',
                }
            });

            // Contact cards animation
            const validCards = cardsRef.current.filter(card => card !== null);
            gsap.from(validCards, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const contactMethods = [
        {
            icon: Phone,
            title: 'Call Us',
            value: '+1 (555) 123-4567',
            description: 'Mon-Fri 9AM-6PM'
        },
        {
            icon: Mail,
            title: 'Email Us',
            value: 'hello@events.com',
            description: 'Response within 24hrs'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            value: '123 Event Street, NY',
            description: 'By appointment only'
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative w-full py-20 md:py-32 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--color-maroon) 0%, #5a0015 100%)',
            }}
        >
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                {/* Main CTA Content */}
                <div ref={contentRef} className="text-center mb-16">
                    <h2 
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                        style={{ 
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        Ready to Start Planning?
                    </h2>

                    <p 
                        className="text-xl md:text-2xl mb-10 text-white/90"
                        style={{ 
                            lineHeight: '1.7',
                            maxWidth: '700px',
                            margin: '0 auto 40px'
                        }}
                    >
                        Let's bring your vision to life with our expert event planning services
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            className="cta-button-primary px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Get Your Free Quote
                            <ArrowRight size={20} />
                        </button>

                        <button 
                            className="cta-button-secondary px-8 py-4 rounded-full font-bold text-lg"
                        >
                            View Our Portfolio
                        </button>
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="contact-card group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center p-8">
                                    <div 
                                        className="contact-icon-wrapper mb-4"
                                    >
                                        <IconComponent 
                                            size={28} 
                                            className="text-white"
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-champagne)' }}>
                                        {method.title}
                                    </h3>

                                    <p className="text-lg font-semibold mb-1 text-white">
                                        {method.value}
                                    </p>

                                    <p className="text-sm text-white/70">
                                        {method.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .cta-button-primary {
                    background: linear-gradient(135deg, var(--color-champagne) 0%, #c19b2f 100%);
                    color: var(--color-maroon);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
                }

                .cta-button-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
                }

                .cta-button-secondary {
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .cta-button-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--color-champagne);
                    transform: translateY(-3px);
                }

                .contact-card {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    backdrop-filter: blur(10px);
                }

                .contact-card:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--color-champagne);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
                }

                .contact-icon-wrapper {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .contact-card:hover .contact-icon-wrapper {
                    background: var(--color-champagne);
                    transform: scale(1.1) rotate(10deg);
                }

                .contact-card:hover .contact-icon-wrapper svg {
                    color: var(--color-maroon) !important;
                }
            `}</style>
        </section>
    );
};
