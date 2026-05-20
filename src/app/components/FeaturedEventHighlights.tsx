import React, { useEffect, useRef } from 'react';
import { Star, Calendar, MapPin, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredEvents = [
    {
        id: 1,
        title: 'Royal Wedding Extravaganza',
        category: 'Wedding',
        date: 'June 15, 2024',
        location: 'Grand Palace Hotel',
        guests: 500,
        image: 'https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwZGVjb3JhdGlvbnxlbnwxfHx8fDE3NzMwMzYxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5.0,
        featured: true
    },
    {
        id: 2,
        title: 'Tech Summit 2024',
        category: 'Corporate',
        date: 'March 22, 2024',
        location: 'Innovation Center',
        guests: 1000,
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2UlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzMwMzYxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        featured: true
    },
    {
        id: 3,
        title: 'Charity Gala Evening',
        category: 'Gala',
        date: 'April 10, 2024',
        location: 'Luxury Ballroom',
        guests: 300,
        image: 'https://images.unsplash.com/photo-1768508950778-9ba70d4445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnYWxhJTIwZGlubmVyJTIwZXZlbnR8ZW58MXx8fHwxNzczMDM2MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5.0,
        featured: true
    }
];

export const FeaturedEventHighlights = () => {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const magicAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate title
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: -30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }

        // Animate cards
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.set(card, {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                rotateY: 15
            });

            gsap.to(card, {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1,
                }
            });
        });

        // Initialize Magic Area to first card
        if (magicAreaRef.current && cardsRef.current[0]) {
            const firstCard = cardsRef.current[0];
            const rect = firstCard.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            gsap.set(magicAreaRef.current, {
                top: rect.top + scrollTop,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleCardEnter = (index: number) => {
        const card = cardsRef.current[index];
        if (!card || !magicAreaRef.current) return;

        const rect = card.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        gsap.to(magicAreaRef.current, {
            duration: 0.5,
            top: rect.top + scrollTop,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            ease: 'power3.inOut'
        });
    };

    const handleCardLeave = () => {
        // Optionally tween back to first card
        if (magicAreaRef.current && cardsRef.current[0]) {
            const firstCard = cardsRef.current[0];
            const rect = firstCard.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            gsap.to(magicAreaRef.current, {
                duration: 0.5,
                top: rect.top + scrollTop,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                ease: 'power3.inOut'
            });
        }
    };

    return (
        <section 
            className="w-full py-20 md:py-32 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}
        >
            {/* Magic Area - Animated hover highlight */}
            <div 
                ref={magicAreaRef}
                className="magic-area"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Title */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                        style={{ 
                            color: 'var(--color-maroon)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Featured Events
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
                        Explore our most celebrated events that showcase our commitment to excellence and innovation
                    </p>
                </div>

                {/* Featured Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {featuredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            ref={el => cardsRef.current[index] = el}
                            className="featured-event-card group"
                            onMouseEnter={() => handleCardEnter(index)}
                            onMouseLeave={handleCardLeave}
                        >
                            {/* Image Section */}
                            <div className="featured-image-wrapper">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="featured-image"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="featured-gradient" />

                                {/* Category Badge */}
                                <div 
                                    className="featured-category"
                                    style={{ 
                                        backgroundColor: 'var(--color-champagne)',
                                        color: 'var(--color-maroon)'
                                    }}
                                >
                                    {event.category}
                                </div>

                                {/* Rating Badge */}
                                <div 
                                    className="featured-rating"
                                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.95)' }}
                                >
                                    <Star size={14} fill="currentColor" style={{ color: 'var(--color-maroon)' }} />
                                    <span style={{ color: 'var(--color-maroon)' }}>{event.rating}</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="featured-content">
                                <h3 className="featured-title">{event.title}</h3>
                                
                                <div className="featured-details">
                                    <div className="featured-detail-item">
                                        <Calendar size={16} style={{ color: 'var(--color-champagne)' }} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="featured-detail-item">
                                        <MapPin size={16} style={{ color: 'var(--color-champagne)' }} />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="featured-detail-item">
                                        <Users size={16} style={{ color: 'var(--color-champagne)' }} />
                                        <span>{event.guests} Guests</span>
                                    </div>
                                </div>

                                <button 
                                    className="featured-button"
                                    style={{ 
                                        borderColor: 'var(--color-champagne)',
                                        color: 'var(--color-maroon)'
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                /* Magic Area - Animated highlight that follows cursor */
                .magic-area {
                    position: absolute;
                    z-index: 0;
                    pointer-events: none;
                    border-radius: 20px;
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(128, 0, 32, 0.08) 100%);
                    box-shadow: 0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(128, 0, 32, 0.1);
                    border: 2px solid rgba(212, 175, 55, 0.3);
                }

                .magic-area::before {
                    content: '';
                    position: absolute;
                    left: -3px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 6px;
                    height: 70%;
                    background: var(--color-champagne);
                    border-radius: 3px;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                }

                .featured-event-card {
                    position: relative;
                    z-index: 1;
                    border-radius: 20px;
                    background: white;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 10px 40px rgba(128, 0, 32, 0.1);
                }

                .featured-event-card:hover {
                    transform: translateY(-16px);
                    box-shadow: 0 25px 70px rgba(128, 0, 32, 0.2);
                }

                .featured-image-wrapper {
                    position: relative;
                    width: 100%;
                    padding-bottom: 75%;
                    overflow: hidden;
                }

                .featured-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .featured-event-card:hover .featured-image {
                    transform: scale(1.1);
                }

                .featured-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(128, 0, 32, 0.7) 0%, transparent 60%);
                }

                .featured-category {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    padding: 8px 18px;
                    border-radius: 25px;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .featured-rating {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    padding: 8px 14px;
                    border-radius: 25px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 700;
                }

                .featured-content {
                    padding: 28px;
                }

                .featured-title {
                    font-size: 26px;
                    font-weight: 700;
                    color: var(--color-maroon);
                    margin-bottom: 20px;
                    letter-spacing: -0.01em;
                    line-height: 1.3;
                }

                .featured-details {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .featured-detail-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    color: var(--color-charcoal);
                }

                .featured-button {
                    width: 100%;
                    padding: 14px 24px;
                    border: 2px solid;
                    border-radius: 30px;
                    background: transparent;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .featured-button:hover {
                    background: var(--color-champagne);
                    color: white !important;
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .featured-content {
                        padding: 24px;
                    }

                    .featured-title {
                        font-size: 22px;
                    }
                }
            `}</style>
        </section>
    );
};