'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
    Globe, 
    ArrowUpRight, 
    Instagram, 
    Twitter, 
    Linkedin,
    Home,
    Compass,
    GraduationCap,
    Mail,
    Award,
    HelpCircle,
    BookOpen,
    MessageSquare,
    Github,
    Shield,
    FileText,
    RotateCcw,
    Cookie
} from 'lucide-react';

export const Footer = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
    const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

    const indices = [
        {
            title: "Explore",
            links: [
                { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
                { label: "Destinations", href: "#destinations", icon: <Compass className="w-4 h-4" /> },
                { label: "Admissions", href: "#services", icon: <GraduationCap className="w-4 h-4" /> },
                { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> }
            ]
        },
        {
            title: "Insights",
            links: [
                { label: "Placements", href: "/events", icon: <Award className="w-4 h-4" /> },
                { label: "FAQs", href: "#", icon: <HelpCircle className="w-4 h-4" /> },
                { label: "Scholarships", href: "/venues", icon: <BookOpen className="w-4 h-4" /> },
                { label: "Testimonials", href: "#", icon: <MessageSquare className="w-4 h-4" /> }
            ]
        },
        {
            title: "Connect",
            links: [
                { label: "Instagram", href: "#", icon: <Instagram className="w-4 h-4" /> },
                { label: "LinkedIn", href: "#", icon: <Linkedin className="w-4 h-4" /> },
                { label: "Twitter", href: "#", icon: <Twitter className="w-4 h-4" /> },
                { label: "GitHub", href: "#", icon: <Github className="w-4 h-4" /> }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "#", icon: <Shield className="w-4 h-4" /> },
                { label: "Terms of Service", href: "#", icon: <FileText className="w-4 h-4" /> },
                { label: "Refund Policy", href: "#", icon: <RotateCcw className="w-4 h-4" /> },
                { label: "Cookie Policy", href: "#", icon: <Cookie className="w-4 h-4" /> }
            ]
        }
    ];

    return (
        <footer 
            className="relative w-full h-[600px] bg-[#0d0d0d] overflow-hidden border-t border-white/5"
            style={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
            <div className="fixed bottom-0 left-0 w-full h-[600px] flex flex-col justify-between py-24 px-8 md:px-24">
                
                {/* Background Brand Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden w-full">
                    <h2 className="text-[14vw] md:text-[15vw] font-bold text-white tracking-tighter whitespace-nowrap text-center w-full">
                        GLOBALPATH
                     </h2>
                </div>

                {/* Top Section: Indices */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
                    {indices.map((section, i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>{section.title}</h4>
                            <ul className="flex flex-col gap-4">
                                {section.links.map((link, j) => (
                                    <li key={j} className="w-fit">
                                        <a 
                                            href={link.href}
                                            className="group relative flex items-center gap-3 text-white/50 hover:text-[#D4AF37] transition-all duration-300 text-lg md:text-xl font-light pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#D4AF37] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                                            style={{ fontFamily: '"Outfit", sans-serif' }}
                                        >
                                            <span className="text-white/30 group-hover:text-[#D4AF37] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 flex items-center justify-center">
                                                {link.icon}
                                            </span>
                                            <span>{link.label}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12 pt-12 border-t border-white/5">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Globe className="w-4 h-4 text-[#0d0d0d]" />
                            </div>
                            <span className="text-sm font-bold tracking-[0.2em] text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>GLOBALPATH PLATFORM</span>
                        </div>
                        <p className="text-xs text-white/40 font-medium tracking-wide" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            © 2026 GLOBALPATH. ALL RIGHTS RESERVED. MENTORED BY ACADEMIC STRATEGISTS WORLDWIDE.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        {[
                            { icon: <Instagram className="w-5 h-5" />, label: "INSTAGRAM" },
                            { icon: <Twitter className="w-5 h-5" />, label: "TWITTER" },
                            { icon: <Linkedin className="w-5 h-5" />, label: "LINKEDIN" }
                        ].map((social, i) => (
                            <a 
                                key={i} 
                                href="#" 
                                className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-500"
                            >
                                {social.icon}
                                <span className="text-[9px] font-bold tracking-[0.3em] uppercase hidden md:block" style={{ fontFamily: '"Outfit", sans-serif' }}>{social.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Cinematic Scanline Detail (Dark Theme) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.01]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,0.1)_50%),linear-gradient(90deg,rgba(212,175,55,0.05),rgba(212,175,55,0.02),rgba(212,175,55,0.05))] z-[10] bg-[length:100%_2px,3px_100%]" />
                </div>
            </div>
        </footer>
    );
};