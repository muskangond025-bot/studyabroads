import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventHeroBannerProps {
    title: string;
    subtitle: string;
    image: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const EventHeroBanner: React.FC<EventHeroBannerProps> = ({ title, subtitle, image, icon: IconComponent }) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on background
            gsap.to(heroRef.current, {
                backgroundPosition: '50% 100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Title animation
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.3
            });

            // Subtitle animation
            gsap.from(subtitleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6
            });

            // Badges animation
            gsap.from(badgesRef.current?.children || [], {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.9
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={heroRef}
            className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(128,0,32,0.7) 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-champagne) 0%, rgba(212,175,55,0.8) 100%)',
                            boxShadow: '0 20px 60px rgba(212,175,55,0.4)'
                        }}
                    >
                        <IconComponent size={48} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 
                    ref={titleRef}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
                    style={{ 
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}
                >
                    {title}
                </h1>

                {/* Subtitle */}
                <p 
                    ref={subtitleRef}
                    className="text-xl md:text-2xl mb-12 text-white/90"
                    style={{
                        lineHeight: '1.6',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    {subtitle}
                </p>

                {/* Info Badges */}
                <div ref={badgesRef} className="flex flex-wrap justify-center gap-4">
                    <div 
                        className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Calendar size={20} className="text-white" />
                        <span className="text-white font-medium">Year-Round Service</span>
                    </div>

                    <div 
                        className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <MapPin size={20} className="text-white" />
                        <span className="text-white font-medium">Nationwide Coverage</span>
                    </div>

                    <div 
                        className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Users size={20} className="text-white" />
                        <span className="text-white font-medium">Expert Team</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <div 
                    className="w-8 h-12 rounded-full border-2 flex justify-center pt-2"
                    style={{ borderColor: 'rgba(255,255,255,0.5)' }}
                >
                    <div 
                        className="w-1.5 h-3 rounded-full"
                        style={{ backgroundColor: 'var(--color-champagne)' }}
                    />
                </div>
            </div>
        </div>
    );
};
