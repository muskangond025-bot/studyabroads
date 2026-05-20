"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/archival-exhibition.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ArchivalExhibition = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self: gsap.Context) => {
      const reveals = self.selector!(".reveal-box") as HTMLElement[];

      reveals.forEach((container: HTMLElement) => {
        const image = container.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            toggleActions: "play none none reverse",
            start: "top 85%",
          },
        });

        tl.set(container, { autoAlpha: 1 });
        
        tl.from(container, {
          duration: 1.8,
          xPercent: -100,
          ease: "power4.out",
        });
        tl.from(image, {
          duration: 1.8,
          xPercent: 100,
          scale: 1.5,
          delay: -1.8,
          ease: "power4.out",
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={mainRef} className="exhibition-section">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-20">
          <div className="text-center">
            <div className="text-gold tracking-[0.8em] text-[10px] uppercase font-bold mb-4">The Scholar Series</div>
            <h2 className="text-5xl md:text-[10rem] font-serif italic text-obsidian/10 leading-tight tracking-tighter absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap">
                Admissions Portfolio
            </h2>
          </div>
      </div>

      <div className="exhibition-container h-[10vh] mt-[-100vh] relative z-10">
        <div className="reveal-box shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2074&auto=format&fit=crop" 
            alt="Collegiate Heritage" 
          />
        </div>

      </div>

      <div className="exhibition-container bg-obsidian relative z-10">
        <div className="reveal-box shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" 
            alt="Strategic Research" 
          />
        </div>

      </div>

      <div className="exhibition-container relative z-10">
        <div className="reveal-box shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2069&auto=format&fit=crop" 
            alt="Matriculation Triumph" 
          />
        </div>

      </div>
    </section>
  );
};
