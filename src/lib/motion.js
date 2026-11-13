import { useReducedMotion } from 'framer-motion';

/**
 * Editorial motion tokens. One calm easing curve for the whole page and two
 * damped springs, so nothing bounces and nothing glows.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

export const DURATION = {
  quick: 0.2,
  base: 0.45,
  reveal: 0.6,
  line: 0.7
};

export const SPRING_SOFT = { type: 'spring', stiffness: 220, damping: 30, mass: 0.9 };
export const SPRING_FRAME = { type: 'spring', stiffness: 170, damping: 28, mass: 1 };

/** Reveal once, slightly inside the viewport. */
export const REVEAL_VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' };

const buildPresets = (reduced) => ({
  fadeUp: reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.reveal, ease: EASE_EDITORIAL }
        }
      },

  staggerContainer: (stagger = 0.06, delayChildren = 0) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren
      }
    }
  }),

  lineReveal: reduced
    ? { hidden: { scaleX: 1 }, show: { scaleX: 1, transition: { duration: 0 } } }
    : {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: DURATION.line, ease: EASE_EDITORIAL } }
      }
});

const STANDARD = buildPresets(false);
const REDUCED = buildPresets(true);

/**
 * Returns the shared variants plus a flag, so components never have to
 * re-implement the reduced-motion branch.
 */
export const useMotionPresets = () => {
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);
  const presets = reduced ? REDUCED : STANDARD;

  return {
    prefersReduced: reduced,
    transition: reduced ? { duration: 0 } : { duration: DURATION.base, ease: EASE_EDITORIAL },
    spring: reduced ? { duration: 0 } : SPRING_SOFT,
    frameSpring: reduced ? { duration: 0 } : SPRING_FRAME,
    ...presets
  };
};

export default useMotionPresets;
