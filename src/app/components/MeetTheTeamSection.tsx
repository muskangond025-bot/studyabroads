'use client';

import React from 'react';
import { motion } from 'motion/react';
import TeamShowcase from './ui/team-showcase';
import { Activity, Terminal } from 'lucide-react';

export const MeetTheTeamSection = () => {
    return (
        <section className="relative w-full pt-4 pb-16 md:pt-6 md:pb-24 bg-[#fdfaf3] overflow-hidden">
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
                <div className="max-w-5xl mb-24 md:mb-32">


                    <h2 
                        className="text-6xl md:text-[9rem] font-bold text-[#1a1a1a] tracking-tighter leading-[0.9] mb-12"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Meet The <br />
                        <span className="text-[#c5a56d]">Strategists</span>
                    </h2>


                </div>

                {/* Next-Level Team Showcase */}
                <TeamShowcase />


            </div>
        </section>
    );
};