import React from 'react';
import { motion } from 'motion/react';
import { Award, Clock, Heart, Shield, Star, Users, ArrowUpRight, Radio } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Reason {
    icon: React.ElementType;
    title: string;
    description: string;
    refCode: string;
}

const reasons: Reason[] = [
    {
        icon: Award,
        title: 'Elite Academic Experts',
        description: 'Our collective features former Ivy League, Oxbridge admissions officers, and global scholarship advisors.',
        refCode: 'EDU-01-EXP'
    },
    {
        icon: Users,
        title: 'Global Network',
        description: 'Decades of combined advisory experience spanning over 500+ successful student university placements.',
        refCode: 'TEAM-04-NET'
    },
    {
        icon: Heart,
        title: 'Personalized Portfolios',
        description: 'Every student profile is curated as a unique scholarly narrative matching selective institutional criteria.',
        refCode: 'PORT-09-IND'
    },
    {
        icon: Shield,
        title: 'Transparent Pathways',
        description: 'Meticulous relocational, financial, and visa audit pipelines with transparent timelines and direct milestones.',
        refCode: 'SEC-12-TRST'
    },
    {
        icon: Star,
        title: 'Uncompromised Quality',
        description: 'Providing top-percentile test prep resources, academic writing mentorship, and elite interview training.',
        refCode: 'EDU-05-PREM'
    },
    {
        icon: Clock,
        title: '24/7 Support',
        description: 'Real-time student progress tracking and support pipelines across global timezones for absolute peace of mind.',
        refCode: 'SYNC-24-LIVE'
    }
];

const stats = [
    { label: 'Elite Placements', value: '500+', ref: 'TRANS-502' },
    { label: 'Admissions Success', value: '99%', ref: 'SAT-098' },
    { label: 'Expert Mentors', value: '50+', ref: 'CUR-054' },
    { label: 'Years Leadership', value: '10+', ref: 'EST-2010' }
];

export function WhyChooseServices() {
    return (
        <section className="relative w-full bg-[#faf9f6] pt-16 pb-24 overflow-hidden flex flex-col items-center">
            {/* Ambient Background Detail */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseWhyChoose">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseWhyChoose)" />
                </svg>
            </div>

            {/* Left Telemetry HUD */}


            <div className="container mx-auto px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center gap-3 mb-2"
                    >
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                        <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                            04 / Elite Standards
                        </span>
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a1a1a] tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Why Choose <span className="font-light italic text-[#d4af37]">Us</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#1a1a1a]/40 font-light italic max-w-2xl mx-auto"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        "A commitment to strategic precision and academic excellence in every scholar's global journey."
                    </motion.p>
                </div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {reasons.map((reason, index) => (
                        <ReasonCard key={index} reason={reason} index={index} />
                    ))}
                </div>

                {/* Stats Section: Technical HUD Aesthetic */}
                <div className="relative pt-20 border-t border-[#1a1a1a]/5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center space-y-4"
                            >

                                <span 
                                    className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
                                    style={{ fontFamily: '"Playfair Display", serif' }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom HUD Transmission */}

        </section>
    );
}

const ReasonCard = ({ reason, index }: { reason: Reason, index: number }) => {
    const Icon = reason.icon;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative bg-white border border-[#1a1a1a]/5 p-10 rounded-[20px] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(212, 175, 55,0.12)] overflow-hidden"
        >
            {/* Archival Status Detail */}


            <div className="flex flex-col items-start gap-8 relative z-10">
                {/* Icon: Spatial Physics */}
                <div className="w-14 h-14 bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-xl flex items-center justify-center relative transition-transform duration-700 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-[#1a1a1a]/60 group-hover:text-[#d4af37] transition-colors duration-700" />
                    <div className="absolute inset-0 bg-[#d4af37]/5 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-700" />
                </div>

                <div className="space-y-4 text-left">
                    <h3 
                        className="text-2xl font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#d4af37] transition-colors duration-500"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {reason.title}
                    </h3>
                    <p className="text-base text-[#1a1a1a]/70 font-medium leading-relaxed group-hover:text-[#1a1a1a] transition-colors duration-500">
                        {reason.description}
                    </p>
                </div>
            </div>

            {/* Kinetic Scanline Detail */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px]">
                <motion.div 
                    animate={{ y: ["-100%", "400%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"
                />
            </div>
            
            {/* Floating Dust Particle (Subtle) */}
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0, 0.2, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-1 h-1 bg-[#d4af37] rounded-full blur-[1px] pointer-events-none"
            />
        </motion.div>
    );
};
