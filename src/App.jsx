import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import portfolioData from './data/portfolioData.json';
import { ThemeProvider } from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CaseStudy from './components/CaseStudy';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SideScrollNav from './components/SideScrollNav';
import useActiveSection from './hooks/useActiveSection';
import { useMotionPresets, REVEAL_VIEWPORT } from './lib/motion';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';

const CHAPTER_IDS = ['work', 'stack', 'experience', 'education', 'contact'];

const readStoredLang = () => {
  try {
    const stored = window.localStorage.getItem('lang');
    if (stored === 'id' || stored === 'en') return stored;
  } catch {
    // Storage can be blocked; the default language still works.
  }
  return 'id';
};

function App() {
  const [lang, setLang] = useState(readStoredLang);
  const { personal, navLinks, skills, projects, education, contact, ui } = portfolioData[lang];
  const { activeId } = useActiveSection(CHAPTER_IDS);
  const { lineReveal } = useMotionPresets();

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('lang', lang);
    } catch {
      // Storage can be blocked.
    }
  }, [lang]);

  // Lenis owns the scroll and steps aside when reduced motion is requested.
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  const roleInfo = (personal.experience && personal.experience.length > 0)
    ? personal.experience[0]
    : null;

  // One editorial chapter per block. Every chapter after the first opens with
  // a hairline rule instead of extra whitespace.
  const chapters = [
    ...projects.filter((p) => p.featured).map((p) => ({
      key: p.id,
      id: 'work',
      kind: 'case',
      project: p,
      roleInfo
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
        return <Contact contact={contact} personal={personal} ui={ui} active={isActive} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div id="main" className="min-h-screen bg-canvas text-ink selection:bg-accent selection:text-canvas">
        <Navbar personal={personal} navLinks={navLinks} lang={lang} setLang={setLang} ui={ui} />
        <SideScrollNav navLinks={navLinks} activeId={activeId} />

        <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-8 lg:grid lg:grid-cols-[380px_1fr] lg:gap-16 lg:pr-40 xl:gap-24">
          <Sidebar personal={personal} contact={contact} ui={ui} />

          <main id="content-column" className="mt-16 lg:mt-0">
            {chapters.map((chapter, index) => {
              const isActive = activeId === chapter.id;
              const isFirst = index === 0;

              return (
                <div key={chapter.key}>
                  {!isFirst && (
                    <div className="my-16 sm:my-20" aria-hidden="true">
                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={REVEAL_VIEWPORT}
                        variants={lineReveal}
                        className="h-px w-full origin-left bg-line"
                      />
                    </div>
                  )}

                  {/* Chapters always render at full opacity: the only focus
                      marker is the accent on the chapter number. */}
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
