import Lenis from 'lenis';

/**
 * One Lenis instance for the whole page. Every anchor, the side rail and the
 * back-to-top button go through here, so scrolling feels identical everywhere.
 */
let lenis = null;
let frame = null;

/**
 * Section landing is owned by CSS: every chapter carries `scroll-mt-24`.
 * Lenis reads that scroll-margin itself, so scrollTo must not add an offset
 * on top of it or the gap doubles.
 */
export const HEADER_OFFSET = 96;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getLenis = () => lenis;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null;
  if (prefersReducedMotion()) {
    destroySmoothScroll();
    return null;
  }
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return lenis;
};

export const destroySmoothScroll = () => {
  if (frame !== null) {
    cancelAnimationFrame(frame);
    frame = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

/** Scrolls to a section id or an element. */
export const scrollToTarget = (target) => {
  if (typeof window === 'undefined' || target === null || target === undefined) return;

  const element =
    typeof target === 'string'
      ? document.getElementById(target.replace('#', ''))
      : target;

  const reduce = prefersReducedMotion();

  if (lenis) {
    lenis.scrollTo(element ?? 0, { duration: reduce ? 0 : 1.1 });
    return;
  }

  if (element && typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    return;
  }

  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
};

export const scrollToTop = () => {
  if (typeof window === 'undefined') return;
  const reduce = prefersReducedMotion();
  if (lenis) {
    lenis.scrollTo(0, { duration: reduce ? 0 : 1.1 });
    return;
  }
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
};

/**
 * Modal open/close hooks. Lenis is paused so the page behind cannot drift;
 * without Lenis (reduced motion) the document itself is frozen instead.
 */
let lockCount = 0;

export const lockScroll = () => {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount > 1) return;
  if (lenis) {
    lenis.stop();
  } else {
    document.documentElement.style.overflow = 'hidden';
  }
};

export const unlockScroll = () => {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  if (lenis) {
    lenis.start();
  } else {
    document.documentElement.style.overflow = '';
  }
};
