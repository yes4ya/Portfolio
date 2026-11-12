import React, { useEffect, useState } from 'react';
import portfolioData from './data/portfolioData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reveal from './components/Reveal';

const readStoredLang = () => {
  try {
    return window.localStorage.getItem('lang') === 'en' ? 'en' : 'id';
  } catch {
    return 'id';
  }
};

function App() {
  const [lang, setLang] = useState(readStoredLang);
  const { personal, navLinks, skills, projects, education, contact } = portfolioData[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      window.localStorage.setItem('lang', lang);
    } catch {
      // Storage can be blocked; the toggle still works for this session.
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-black text-typography-primary flex flex-col font-sans">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Lewati ke konten utama
      </a>

      <Navbar personal={personal} navLinks={navLinks} lang={lang} setLang={setLang} />

      <main id="main" className="flex-1">
        <Hero personal={personal} />
        <Reveal>
          <About personal={personal} />
        </Reveal>
        <Reveal>
          <Skills skills={skills} />
        </Reveal>
        <Reveal>
          <Projects projects={projects} />
        </Reveal>
        <Reveal>
          <Experience experience={personal.experience} />
        </Reveal>
        <Reveal>
          <Education education={education} />
        </Reveal>
        <Reveal>
          <Contact contact={contact} personal={personal} />
        </Reveal>
      </main>

      <Footer personal={personal} navLinks={navLinks} />
    </div>
  );
}

export default App;
