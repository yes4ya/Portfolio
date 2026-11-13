import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import { scrollToTarget, scrollToTop } from '../lib/smoothScroll';

const SECTIONS = [
  { id: 'work', number: '01', label: { id: 'Proyek', en: 'Projects' } },
  { id: 'stack', number: '02', label: { id: 'Keahlian', en: 'Skills' } },
  { id: 'experience', number: '03', label: { id: 'Pengalaman', en: 'Experience' } },
  { id: 'education', number: '04', label: { id: 'Pendidikan', en: 'Education' } },
  { id: 'contact', number: '05', label: { id: 'Kontak', en: 'Contact' } }
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

const NAV_LABEL = { id: 'Navigasi bagian', en: 'Section navigation' };
const TOP_LABEL = { id: 'Kembali ke atas', en: 'Back to top' };

/**
 * Chapter index pinned to the right edge. The rail fills with the reading
 * progress, ticks sit flush against it, and every chapter reveals its name
 * on hover while the current chapter keeps its label visible.
 */
const SideScrollNav = ({ lang }) => {
  const [hovered, setHovered] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { activeId } = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });
  const fill = reduceMotion ? scrollYProgress : progress;

  useEffect(() => {
    const readScroll = () => setShowTop(window.scrollY > 300);
    readScroll();
    window.addEventListener('scroll', readScroll, { passive: true });
    return () => window.removeEventListener('scroll', readScroll);
  }, []);

  const handleClick = (id) => {
    scrollToTarget(id);
  };

  const handleScrollTop = () => {
    scrollToTop();
  };

  return (
    <nav
      aria-label={NAV_LABEL[lang] || NAV_LABEL.id}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex xl:right-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-end gap-5 py-2">
        <span className="absolute right-0 top-0 h-full w-[2px] bg-line" aria-hidden="true" />
        <motion.span
          className="absolute right-0 top-0 h-full w-[2px] origin-top bg-accent"
          style={{ scaleY: fill }}
          aria-hidden="true"
        />

        {SECTIONS.map((section) => {
          const isActive = section.id === activeId;
          const showLabel = hovered || isActive;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${section.number} ${section.label[lang] || section.label.id}`}
              className="group relative flex cursor-pointer items-center justify-end gap-2 py-2 pl-2.5 pr-0"
            >
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{ opacity: showLabel ? 1 : 0, x: showLabel ? 0 : 8 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
                className="pointer-events-none absolute right-[calc(100%_-_0.625rem)] top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-wide text-ink-secondary"
              >
                {section.label[lang] || section.label.id}
              </motion.span>

              <span
                className={`font-mono text-xs font-medium tabular-nums transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-muted group-hover:text-ink'
                }`}
              >
                {section.number}
              </span>

              <span
                className={`transition-[width,height,background-color] duration-200 ${
                  isActive
                    ? 'h-[2px] w-6 bg-accent'
                    : 'h-[1.5px] w-3 bg-line group-hover:bg-ink-muted'
                }`}
              />
            </button>
          );
        })}

        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              onClick={handleScrollTop}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
              aria-label={TOP_LABEL[lang] || TOP_LABEL.id}
              className="absolute right-0 top-full mt-4 flex h-8 w-8 items-center justify-center rounded-md border border-black/15 bg-surface text-ink-secondary transition-colors hover:border-accent hover:text-accent dark:border-white/15"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default SideScrollNav;
