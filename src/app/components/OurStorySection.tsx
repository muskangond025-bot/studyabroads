import React, { useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OurStorySection = () => {
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    const storyPoints = [
        {
            id: 1,
            title: 'Passion & Vision',
            description: 'Founded with a dream to transform celebrations into unforgettable experiences.',
            position: 'top-left',
            image: 'https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwc2V0dXB8ZW58MXx8fHwxNzcyODc2Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
            id: 2,
            title: 'Expertise & Excellence',
            description: 'Years of experience creating magical moments with meticulous attention to detail.',
            position: 'top-right',
            image: 'https://images.unsplash.com/photo-1764471444363-e6dc0f9773bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBjb25mZXJlbmNlJTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc3Mjg3NjI3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
            id: 3,
            title: 'Innovation & Style',
            description: 'Blending modern trends with timeless elegance for extraordinary events.',
            position: 'bottom-left',
            image: 'https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwYXJ0eSUyMGNlbGVicmF0aW9uJTIwdmVudWV8ZW58MXx8fHwxNzcyNzgzNTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        }
    ];

    useEffect(() => {
        const cards = [
            { ref: card1Ref.current, delay: 0 },
            { ref: card2Ref.current, delay: 0.2 },
            { ref: card3Ref.current, delay: 0.4 }
        ];
        
        cards.forEach((card, index) => {
            if (!card.ref) return;

            if (index === 0) {
                // First card is visible on load with subtle entrance
                gsap.set(card.ref, {
                    opacity: 1,
                    y: 0,
                    scale: 1
                });

                // Subtle parallax effect for the first card
                gsap.to(card.ref, {
                    y: -30,
                    scrollTrigger: {
                        trigger: card.ref,
                        start: 'top 60%',
                        end: 'bottom 20%',
                        scrub: 1.5,
                    }
                });
            } else {
                // Other cards start hidden
                gsap.set(card.ref, {
                    opacity: 0,
                    y: 100,
                    scale: 0.9
                });

                // Appear on scroll
                gsap.to(card.ref, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card.ref,
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1,
                        toggleActions: 'play none none reverse'
                    }
                });

                // Additional parallax effect
                gsap.to(card.ref, {
                    y: -40,
                    scrollTrigger: {
                        trigger: card.ref,
                        start: 'top 75%',
                        end: 'bottom 15%',
                        scrub: 2,
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <></>
    );
};