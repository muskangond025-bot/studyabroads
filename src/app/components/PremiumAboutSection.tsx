"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2, Sparkles, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PremiumAboutSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for text
      gsap.from(".reveal", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      });

      // Parallax effect for the image
      gsap.to(".parallax-img", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Card animations
      gsap.from(".work-card", {
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-cream text-obsidian py-32 overflow-hidden selection:bg-gold selection:text-obsidian">
      <div className="container mx-auto px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <div className="reveal mb-6 text-gold tracking-[0.5em] text-[10px] uppercase font-bold flex items-center gap-4">
              <span className="w-12 h-[1px] bg-gold/30"></span>
              The Curatorial Philosophy
            </div>
            <h2 className="reveal text-7xl md:text-9xl font-serif italic leading-[0.85] tracking-tighter">
              Crafting useful <br /> 
              <span className="text-gold not-italic">experiences.</span>
            </h2>
          </div>
          <div className="reveal max-w-sm lg:text-right">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-sans font-light">
              A premium archival approach to event management. We don’t just plan; we architect atmospheric environments that resonate with technical precision.
            </p>
          </div>
        </div>

        {/* Feature Grid with GSAP Entrance */}
        <div className="work-section grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Technical Integrity", 
              desc: "Every deployment is verified through a rigorous spatial audit process.",
              icon: ShieldCheck 
            },
            { 
              title: "Creative Innovation", 
              desc: "Blending modern trends with timeless elegance for extraordinary results.",
              icon: Sparkles 
            },
            { 
              title: "Precise Execution", 
              desc: "Flawless timing and architectural detail in every second of the event.",
              icon: MousePointer2 
            }
          ].map((card, i) => (
            <div key={i} className="work-card group relative p-12 border border-black/5 bg-black/[0.02] hover:bg-black/[0.05] transition-all duration-700 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <card.icon className="w-10 h-10 text-gold mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-serif italic mb-4">{card.title}</h3>
              <p className="text-sm text-gray-600 font-sans font-light leading-relaxed mb-8">{card.desc}</p>
              <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="reveal mt-32 flex flex-col md:flex-row items-center justify-center gap-8">
          <button className="group relative bg-obsidian text-cream px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10">Explore Our Tools</span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          <button className="border border-gold/30 text-gold px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-cream transition-all duration-500">
            See the Sprint
          </button>
        </div>

      </div>

      {/* Decorative Technical Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridAbout" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#121212" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridAbout)" />
        </svg>
      </div>
    </section>
  );
};
