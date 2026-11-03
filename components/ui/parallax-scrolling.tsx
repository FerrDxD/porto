"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]");

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 25 },
        { layer: "2", yPercent: 15 },
        { layer: "3", yPercent: 5 },
        { layer: "4", yPercent: -10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<",
        );
      });
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-[150vh] overflow-hidden bg-zinc-950" ref={parallaxRef}>
      <section className="absolute inset-0 h-screen w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div
            data-parallax-layers
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* Background Layer */}
            <div
              className="absolute -top-[30%] left-0 w-full h-[160%] origin-top"
              data-parallax-layer="1"
            >
              <Image
                src="https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp"
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Mid Layer */}
            <div
              className="absolute -top-[20%] left-0 w-full h-[140%] origin-top"
              data-parallax-layer="2"
            >
              <Image
                src="https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp"
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Text Layer */}
            <div
              data-parallax-layer="3"
              className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            >
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl text-center px-4">
                Maulana Ferdi
              </h2>
            </div>

            {/* Foreground Layer */}
            <div
              className="absolute -bottom-[15%] w-full h-[130%] origin-bottom"
              data-parallax-layer="4"
            >
              <Image
                src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp"
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent z-20"></div>
        </div>
      </section>
      <section className="absolute top-[100vh] w-full min-h-[50vh] bg-zinc-950 flex flex-col items-center justify-center z-30 px-6 py-12 lg:py-0">
        <div
          id="about"
          className="space-y-6 lg:space-y-0 max-w-3xl lg:max-w-5xl w-full flex flex-col lg:flex-row lg:gap-16 lg:items-start"
        >
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden="true"
              />
              <span>Available for projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
              Frontend Developer <br className="hidden lg:block" />& UI Designer
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 leading-relaxed max-w-2xl">
              I craft modern, end-to-end digital products with a focus on polished interfaces and
              seamless user experiences. Specializing in React, Next.js, and Tailwind CSS, I build
              everything from AI companions to biometric attendance systems for real-world
              operations.
            </p>
          </div>
          <div className="w-full lg:w-72 flex flex-wrap sm:flex-nowrap lg:flex-col gap-8 lg:gap-6 pt-6 lg:pt-2 border-t lg:border-t-0 lg:border-l border-zinc-900 lg:pl-10 mt-6 lg:mt-2">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1.5">
                Disciplines
              </p>
              <p className="text-sm sm:text-base font-medium text-zinc-200">
                Frontend · UI/UX · Event Directing
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1.5">
                Location
              </p>
              <p className="text-sm sm:text-base font-medium text-zinc-200 font-mono tabular-nums">
                Indonesia · UTC+7
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
