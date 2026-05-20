import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventGalleryProps {
    images: string[];
}

export const EventGallery: React.FC<EventGalleryProps> = ({ images }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

            // Gallery images animation - staggered from center
            if (gridRef.current) {
                const items = gridRef.current.children;
                gsap.from(items, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8,
                    stagger: {
                        amount: 1.2,
                        from: 'center',
                        ease: 'power2.inOut',
                    },
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 75%',
                    }
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    return (
        <>
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
                            Event Gallery
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
                            Explore our stunning collection of memorable moments
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div 
                        ref={gridRef}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="gallery-item aspect-square cursor-pointer overflow-hidden rounded-xl group"
                                onClick={() => openLightbox(index)}
                            >
                                <img 
                                    src={image} 
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="gallery-overlay">
                                    <div className="text-white text-sm font-medium">View Image</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 z-60 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <X size={24} className="text-white" />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-6 z-60 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <ChevronLeft size={24} className="text-white" />
                    </button>

                    {/* Image */}
                    <div className="max-w-6xl max-h-[90vh] px-16" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={images[currentImageIndex]} 
                            alt={`Gallery ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            style={{ boxShadow: '0 20px 100px rgba(212,175,55,0.3)' }}
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-6 z-60 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <ChevronRight size={24} className="text-white" />
                    </button>

                    {/* Image Counter */}
                    <div 
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-white font-medium"
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {currentImageIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            <style>{`
                .gallery-item {
                    position: relative;
                    border: 2px solid rgba(128, 0, 32, 0.08);
                    transition: all 0.3s ease;
                }

                .gallery-item:hover {
                    border-color: var(--color-champagne);
                    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
                    transform: translateY(-4px);
                }

                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(128,0,32,0.8) 0%, transparent 50%);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding: 16px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};
