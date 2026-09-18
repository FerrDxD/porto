/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 25 },
        { layer: "2", yPercent: 15 },
        { layer: "3", yPercent: 5 },
        { layer: "4", yPercent: -10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-[150vh] overflow-hidden bg-zinc-950" ref={parallaxRef}>
      <section className="absolute inset-0 h-screen w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div data-parallax-layers className="absolute inset-0 w-full h-full flex items-center justify-center">
            
            {/* Background Layer */}
            <img 
              src="https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp" 
              loading="eager" 
              data-parallax-layer="1" 
              alt="Background" 
              className="absolute -top-[30%] left-0 w-full h-[160%] object-cover origin-top" 
            />
            
            {/* Mid Layer */}
            <img 
              src="https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp" 
              loading="eager" 
              data-parallax-layer="2" 
              alt="Mid" 
              className="absolute -top-[20%] left-0 w-full h-[140%] object-cover origin-top" 
            />
            
            {/* Text Layer */}
            <div data-parallax-layer="3" className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl text-center px-4">
                Maulana Ferdi
              </h2>
            </div>

            {/* Foreground Layer */}
            <img 
              src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp" 
              loading="eager" 
              data-parallax-layer="4" 
              alt="Foreground" 
              className="absolute -bottom-[15%] w-full h-[130%] object-cover origin-bottom" 
            />
          </div>
          
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent z-20"></div>
        </div>
      </section>
      <section className="absolute top-[100vh] w-full min-h-[50vh] bg-zinc-950 flex flex-col items-center justify-center z-30 px-6 py-12 lg:py-0">
        <div id="about" className="space-y-6 lg:space-y-0 max-w-3xl lg:max-w-5xl w-full flex flex-col lg:flex-row lg:gap-20 lg:items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-50">Frontend Developer <br className="hidden lg:block"/>& UI Designer</h2>
            <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed lg:max-w-2xl">
              I craft modern, end-to-end digital products with a focus on polished interfaces and 
              seamless user experiences. Specializing in React, Next.js, and Tailwind CSS, I build 
              everything from AI companions to biometric attendance systems for real-world operations.
            </p>
          </div>
          <div className="w-full lg:w-1/3 flex flex-wrap lg:flex-col gap-10 lg:gap-8 pt-6 lg:pt-4 border-t lg:border-t-0 lg:border-l border-zinc-900 lg:pl-10 mt-6 lg:mt-0">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Stack</p>
              <p className="text-sm lg:text-base text-zinc-300">Next.js 14 · TypeScript · Tailwind CSS</p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Disciplines</p>
              <p className="text-sm lg:text-base text-zinc-300">Frontend · UI/UX · Event Directing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
