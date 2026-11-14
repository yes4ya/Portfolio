import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from './data/portfolioData.json';
import { ThemeProvider } from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CaseStudy from './components/CaseStudy';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SideScrollNav from './components/SideScrollNav';
import useActiveSection from './hooks/useActiveSection';
import { EASE_EDITORIAL, useMotionPresets, REVEAL_VIEWPORT } from './lib/motion';
import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from './lib/smoothScroll';

const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMouse}
      onPointerLeave={handleLeave}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const CHAPTER_IDS = ['work', 'stack', 'experience', 'education', 'contact'];

const readStoredLang = () => {
  try {
    const stored = window.localStorage.getItem('lang');
    if (stored === 'id' || stored === 'en') return stored;
  } catch {}
  return 'id';
};

function App() {
  const [lang, setLang] = useState(readStoredLang);
  const { personal, navLinks, skills, projects, education, contact, ui } = portfolioData[lang];
  const { activeId } = useActiveSection(CHAPTER_IDS);
  const { lineReveal, fadeUp, staggerContainer } = useMotionPresets();

  const heroRef = useRef(null);
  const spotlightX = useMotionValue(-400);
  const spotlightY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotlightX}px ${spotlightY}px, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%);`;

  const handleHeroPointerMove = (event) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  const roleInfo = (personal.experience && personal.experience.length > 0)
    ? personal.experience[0]
    : null;

  const chapters = [
    ...projects.filter((p) => p.featured).map((p) => ({
          key: p.id,
          id: 'work',
          kind: 'case',
          project: p,
          roleInfo: null
        })),
    ...projects.filter((p) => !p.featured).map((p) => ({
      key: p.id,
      id: 'work',
      kind: 'case',
      project: p,
      roleInfo: null
    })),
    { key: 'stack', id: 'stack', kind: 'stack' },
    { key: 'experience', id: 'experience', kind: 'experience' },
    { key: 'education', id: 'education', kind: 'education' },
    { key: 'contact', id: 'contact', kind: 'contact' }
  ];

  const renderChapter = (chapter, isActive) => {
    switch (chapter.kind) {
      case 'case':
        return (
          <CaseStudy
            project={chapter.project}
            roleInfo={chapter.roleInfo}
            ui={ui}
            lang={lang}
            active={isActive}
          />
        );
      case 'stack':
        return <Stack skills={skills} ui={ui} active={isActive} />;
      case 'experience':
        return <Experience experience={personal.experience || []} ui={ui} active={isActive} />;
      case 'education':
        return <Education education={education} ui={ui} active={isActive} />;
      case 'contact':
        return <Contact contact={contact} personal={personal} ui={ui} active={isActive} lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div id="main" className="min-h-screen bg-canvas text-ink selection:bg-accent selection:text-canvas">
        <CustomCursor />
        <Navbar personal={personal} navLinks={navLinks} lang={lang} setLang={setLang} ui={ui} />
        <SideScrollNav navLinks={navLinks} activeId={activeId} lang={lang} />

        <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8">
          <motion.header
            ref={heroRef}
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.08, 0.1)}
            className="relative mb-24 overflow-hidden rounded-3xl py-16 px-6 sm:px-12 border border-line bg-surface shadow-lux"
            onPointerMove={handleHeroPointerMove}
          >
            {/* Subtle dot-matrix grid with radial fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                maskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, black 35%, transparent 100%)'
              }}
            />
            {/* Cursor spotlight glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: spotlight }}
            />

            <div className="relative z-10 max-w-4xl">
              <motion.div variants={fadeUp}>
                <p className="font-mono text-xs tracking-[0.08em] text-ink-muted sm:text-sm">
                  {personal.role || 'Frontend Developer & UI/UX Designer'}
                  <span className="mx-2 text-line" aria-hidden="true">/</span>
                  Salatiga, Indonesia
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 font-display text-4xl font-normal tracking-tight text-ink sm:text-6xl lg:text-7xl leading-none select-none"
              >
                {personal.name}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg"
              >
                {personal.bio}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => scrollToTarget('work')}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 select-none"
                  >
                    <span>{lang === 'en' ? 'View Projects' : 'Lihat Project'}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => scrollToTarget('contact')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-accent/20 bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-accent select-none"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Get in Touch' : 'Hubungi Saya'}</span>
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas text-ink hover:border-accent"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas text-ink hover:border-accent"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.header>

          <main id="content-column" className="space-y-24">
            {chapters.map((chapter, index) => {
              const isActive = activeId === chapter.id;
              const isFirst = index === 0;

              return (
                <div key={chapter.key}>
                  {!isFirst && (
                    <div className="mb-20" aria-hidden="true">
                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={REVEAL_VIEWPORT}
                        variants={lineReveal}
                        className="h-px w-full origin-left bg-line"
                      />
                    </div>
                  )}

                  {renderChapter(chapter, isActive)}
                </div>
              );
            })}
          </main>
        </div>

        <Footer personal={personal} navLinks={navLinks} ui={ui} />
      </div>
    </ThemeProvider>
  );
}

export default App;
