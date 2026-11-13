import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import useActiveSection from '../hooks/useActiveSection';
import { EASE_EDITORIAL, useMotionPresets } from '../lib/motion';
import { scrollToTarget } from '../lib/smoothScroll';

const LanguageToggle = ({ lang, setLang, ui }) => {
  const { prefersReduced, spring } = useMotionPresets();

  return (
    <div
      role="group"
      aria-label={ui.langLabel}
      className="inline-flex items-center gap-0.5 rounded-md border border-line bg-surface p-0.5"
    >
      {['id', 'en'].map((code) => {
        const isActive = lang === code;
        return (
          <motion.button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            whileTap={prefersReduced ? undefined : { scale: 0.96 }}
            aria-pressed={isActive}
            className={`relative inline-flex min-h-[36px] min-w-[32px] items-center justify-center rounded px-2 text-xs transition-colors ${
              isActive ? 'text-canvas' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="lang-active-pill"
                className="absolute inset-0 rounded bg-ink"
                transition={spring}
              />
            )}
            <span className="relative z-10">{code.toUpperCase()}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

/**
 * One link in the desktop navigation. The active item carries a shared
 * layout element, so the highlight slides to the next section on scroll.
 */
const NavItem = ({ link, isActive, reduceMotion, onNavigate }) => (
  <motion.a
    href={link.href}
    onClick={onNavigate}
    aria-current={isActive ? 'true' : undefined}
    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    className={`relative inline-flex min-h-[36px] items-center rounded-md px-2 text-sm transition-colors xl:px-2.5 ${
      isActive ? 'text-accent' : 'text-ink-secondary hover:text-ink'
    }`}
  >
    {isActive && (
      <motion.span
        layoutId="nav-active-pill"
        className="absolute inset-0 rounded-md accent-soft"
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 420, damping: 34 }
        }
      />
    )}
    <span className="relative z-10">{link.name}</span>
  </motion.a>
);

const Navbar = ({ personal, navLinks, lang, setLang, ui }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace('#', '')),
    [navLinks]
  );
  const { activeId, atTop } = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const activeIndex = navLinks.findIndex(
    (link) => link.href.replace('#', '') === activeId
  );
  const chapterLabel =
    activeIndex >= 0
      ? `${String(activeIndex + 1).padStart(2, '0')} ${navLinks[activeIndex].name}`
      : personal.nickname;
  const subtitle = atTop ? personal.nickname : chapterLabel;
  const scrolled = !atTop;

  // Every internal link goes through Lenis so the travel feels the same.
  const handleNavigate = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    scrollToTarget(href);
  };

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line glass backdrop-blur-md'
          : 'border-b border-transparent bg-canvas'
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8">
        <div className="flex min-w-0 items-center">
          <a
            href="#main"
            onClick={(event) => handleNavigate(event, 'main')}
            className="inline-flex min-h-[44px] min-w-0 items-center gap-2 font-display text-lg text-ink transition-colors hover:text-accent"
          >
            <span className="truncate sm:hidden">{personal.nickname}</span>
            <span className="hidden truncate sm:inline">{personal.name}</span>

            <span
              aria-hidden="true"
              className="hidden font-mono text-[11px] text-ink-muted lg:inline"
            >
              /
            </span>
            <span className="relative hidden h-4 w-[112px] shrink-0 items-center overflow-hidden lg:inline-flex">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={subtitle}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_EDITORIAL }}
                  className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-ink-muted"
                >
                  {subtitle}
                </motion.span>
              </AnimatePresence>
            </span>
          </a>
        </div>

        <nav
          aria-label={ui.mainNav}
          className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-2"
        >
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              isActive={link.href.replace('#', '') === activeId}
              reduceMotion={reduceMotion}
              onNavigate={(event) => handleNavigate(event, link.href)}
            />
          ))}
        </nav>

        {/* Right: language pill + compact theme icon. The chapter rail sits
            mid-screen, so the header needs no extra right padding. */}
        <div className="flex items-center justify-end gap-2 md:gap-3">
          <div className="hidden md:block">
            <LanguageToggle lang={lang} setLang={setLang} ui={ui} />
          </div>
          <ThemeToggle ui={ui} />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? ui.menuClose : ui.menuOpen}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink-secondary transition-colors hover:text-ink lg:hidden"
          >
            {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE_EDITORIAL }}
            className="border-b border-line bg-canvas px-5 py-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.href.replace('#', '') === activeId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleNavigate(event, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex min-h-[44px] items-center border-l-2 pl-3 text-sm transition-colors ${
                      isActive
                        ? 'border-accent text-accent'
                        : 'border-transparent text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
              <LanguageToggle lang={lang} setLang={setLang} ui={ui} />
              <ThemeToggle ui={ui} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
