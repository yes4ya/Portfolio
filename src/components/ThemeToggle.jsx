import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { useMotionPresets } from '../lib/motion';

/**
 * Compact single-button icon theme toggle (36x36px).
 * Displays Sun icon in dark mode and Moon icon in light mode.
 * Accessible with dynamic aria-label and title tooltip.
 */
const ThemeToggle = ({ ui }) => {
  const { theme, setTheme } = useTheme();
  const { prefersReduced } = useMotionPresets();

  const isDark = theme === 'dark';
  const targetTheme = isDark ? 'light' : 'dark';
  const label = isDark
    ? (ui?.themeToLight || 'Beralih ke tema terang')
    : (ui?.themeToDark || 'Beralih ke tema gelap');

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(targetTheme)}
      whileTap={prefersReduced ? undefined : { scale: 0.94 }}
      aria-label={label}
      title={label}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: prefersReduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
