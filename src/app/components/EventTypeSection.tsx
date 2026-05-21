import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventType {
    id: string;
    name: string;
    image: string;
    tagline: string;
    number: string;
}

const eventTypes: EventType[] = [
    {
        id: 'united-kingdom',
        name: 'United Kingdom',
        tagline: 'Pioneering Academic Heritage & Historic Collegiate Excellence',
        number: '01',
        image: 'image.jpg'
    },
    {
        id: 'united-states',
        name: 'United States',
        tagline: 'Ivy League Prestige, Research Dominance & Global Leadership',
        number: '02',
        image: 'https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1080&auto=format&fit=crop'
    },
    {
        id: 'canada',
        name: 'Canada',
        tagline: 'World-Class Innovation, Diverse Metropolises & Career Readiness',
        number: '03',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1080&auto=format&fit=crop'
    },
    {
        id: 'australia',
        name: 'Australia',
        tagline: 'Top-Tier Global Institutions & Progressive Coastal Living',
        number: '04',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1080&auto=format&fit=crop'
    }
];

const BentoCard = ({ item, className }: { item: EventType, className: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_40px_-20px_rgba(26,26,26,0.04)] hover:shadow-[0_45px_80px_-20px_rgba(26,26,26,0.15)] transition-all duration-500 border border-[#1a1a1a]/10 group flex flex-col justify-end min-h-[300px] ${className}`}
        >
            {/* Background Image with Zoom Effect */}
            <motion.div 
                className="absolute inset-0 z-0"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
                <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                />
            </motion.div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/40 to-transparent z-10 transition-opacity duration-500" />
            <div className={`absolute inset-0 bg-[#D4AF37]/10 mix-blend-color z-10 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

            {/* Interactive Telemetry Accent */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="text-[9px] font-bold text-white tracking-widest" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    {item.number}
                </span>
            </div>

            {/* Card Content & Text Details */}
            <div className="relative z-20 p-8 md:p-10 space-y-4">
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase block" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    ELITE DESTINATION
                </span>
                
                <h3 
                    className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                    {item.name}
                </h3>
                
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-md">
                    "{item.tagline}"
                </p>

                {/* Animated Learn More Button sliding from Left */}
                <div className="pt-4 overflow-hidden flex items-center gap-2">
                    <motion.div
                        animate={{ 
                            x: isHovered ? 0 : -15, 
                            opacity: isHovered ? 1 : 0 
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="flex items-center gap-2 text-white font-semibold text-xs tracking-wider"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </motion.div>
                </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D4AF37]/10 blur-xl rounded-full translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

export const EventTypeSection = () => {
    return (
        <section className="w-full bg-[#F8F9FA] pt-8 pb-24 md:pt-12 md:pb-32 relative overflow-hidden" id="destinations">
            <div className="container mx-auto px-8 relative z-10">
                
                {/* Section Title */}
                <div className="max-w-4xl mx-auto text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6 mb-5"
                    >
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-[10px] font-bold tracking-[1em] text-[#D4AF37] uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>Explore Destinations</span>
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                    </motion.div>

                    <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Global Placement <span className="font-light italic text-[#D4AF37]">Destinations</span>
                    </h2>
                </div>

                {/* Majestic Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* United Kingdom - Tall / Majestic tile on the left */}
                    <BentoCard 
                        item={eventTypes[0]} 
                        className="md:col-span-2 md:row-span-2 md:min-h-[550px]" 
                    />

                    {/* United States - Rectangular tile on the right */}
                    <BentoCard 
                        item={eventTypes[1]} 
                        className="md:col-span-1" 
                    />

                    {/* Canada - Rectangular tile on the right */}
                    <BentoCard 
                        item={eventTypes[2]} 
                        className="md:col-span-1" 
                    />

                    {/* Australia - Grand panoramic row tile at the bottom */}
                    <BentoCard 
                        item={eventTypes[3]} 
                        className="md:col-span-3 md:min-h-[380px]" 
                    />
                </div>
            </div>

            {/* Scroll Indicator / Decorative Divider */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                <span className="text-[8px] font-bold tracking-[1em] uppercase text-[#D4AF37]">Explore</span>
            </div>
        </section>
    );
};