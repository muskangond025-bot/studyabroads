'use client';

import React from 'react';
import { motion } from 'motion/react';
import TeamShowcase from './ui/team-showcase';
import { Activity, Terminal } from 'lucide-react';

export const MeetTheTeamSection = () => {
    return (
        <section className="relative w-full pt-4 pb-4 md:pt-6 md:pb-6 bg-[#fdfaf3] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseTeam">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseTeam)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-8">
                {/* High-Fidelity Header Sequence */}
                <div className="max-w-3xl mx-auto mb-4 md:mb-6 text-center flex flex-col items-center justify-center">
                    {/* Premium Section Badge */}
                    <div className="flex items-center justify-center gap-3 mb-1">
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                        <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                            04 / Elite Advisors
                        </span>
                        <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight text-center"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Meet The <span className="font-light italic text-[#d4af37]">Strategists</span>
                    </motion.h2>
                </div>

                {/* Next-Level Team Showcase */}
                <TeamShowcase />


            </div>
        </section>
    );
};