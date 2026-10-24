import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Global reference so any component can invoke smooth scroll
let globalLenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => globalLenisInstance;

export const scrollToElement = (target: string | HTMLElement, offset: number = -80) => {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};

export function useSmoothScroll() {
  useEffect(() => {
    // Respect reduced motion preference if user has it enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    globalLenisInstance = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations after initial layout and image loading
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}
