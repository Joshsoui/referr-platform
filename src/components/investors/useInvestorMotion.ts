"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let gsapRegistered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
  }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    opacity?: number;
    scale?: number;
    start?: string;
    disabled?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const { y = 48, opacity = 0, scale = 1, start = "top 85%", disabled = false } = options;

  useEffect(() => {
    if (disabled || reduced || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        autoAlpha: opacity === 0 ? 0 : undefined,
        opacity: opacity !== 0 ? opacity : undefined,
        y,
        scale: scale !== 1 ? scale : undefined,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [disabled, reduced, y, opacity, scale, start]);

  return ref;
}

export function useScrollProgress(onUpdate: (progress: number) => void, disabled = false) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (disabled || reduced || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.5,
        onUpdate: (self) => onUpdate(self.progress),
      });
    }, ref);

    return () => ctx.revert();
  }, [disabled, reduced, onUpdate]);

  return ref;
}
