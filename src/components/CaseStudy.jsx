import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Monitor, Smartphone, Maximize, X, BookOpen, CheckCircle2 } from 'lucide-react';
import { EASE_EDITORIAL, useMotionPresets } from '../lib/motion';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

const INTRINSIC = {
  desktop: { width: 1440, height: 820 },
  mobile: { width: 375, height: 812 },
};

const LOCAL_UI = {
  id: {
    fullscreen: 'Layar Penuh',
    close: 'Tutup (Esc)',
    
    breakdown: 'Bedah Studi Kasus',
    modalTitle: 'Arsitektur & Studi Kasus Sistem E-Library',
    problem: 'Tantangan & Konteks',
    architecture: 'Arsitektur UI/UX',
    frontend: 'Implementasi Frontend',
    highlights: 'Poin Utama',
  },
  en: {
    fullscreen: 'Fullscreen',
    close: 'Close (Esc)',
    
    breakdown: 'Case Study Breakdown',
    modalTitle: 'E-Library System Case Study & Architecture',
    problem: 'Problem & Context',
    architecture: 'UI/UX Architecture',
    frontend: 'Frontend Implementation',
    highlights: 'Key Highlights',
  },
};

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const SectionLabel = ({ number, title, active }) => (
  <div className="flex items-baseline gap-4">
    <span
      className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${
        active ? 'text-accent' : 'text-ink-muted'
      }`}
    >
      {number}
    </span>
    <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
  </div>
);

const BreakdownModal = ({ project, local, onClose }) => {
  const closeRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    lockScroll();
    closeRef.current?.focus();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-lux"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            <h3 className="font-sans text-lg font-bold text-ink">{local.modalTitle}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={local.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">{local.problem}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              Mendesain dan mengembangkan sistem perpustakaan digital interaktif untuk Penerbit Erlangga yang dapat menangani ribuan katalog buku secara efisien dengan performa render tinggi serta pengalaman membaca digital yang mulus di berbagai perangkat (desktop dan mobile).
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">{local.architecture}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              Menggunakan sistem grid modular 8-kolom, hierografi tipografi bersih, serta transisi state berbasis Framer Motion untuk memastikan setiap perpindahan halaman terasa instan dan terstruktur.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">{local.frontend}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              Dibangun dengan React 18, Vite, Tailwind CSS, dan Framer Motion. Mengimplementasikan teknik GPU-accelerated transforms, lazy loading citra, serta manajemen state reaktif yang bersih tanpa dependensi berat.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">{local.highlights}</h4>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(project.features || []).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-3.5 text-xs text-ink-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const FullscreenModal = ({ project, local, onClose, triggerRef }) => {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const [availW, setAvailW] = useState(0);
  const [availH, setAvailH] = useState(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    lockScroll();
    closeRef.current?.focus();
    return () => {
      unlockScroll();
      (trigger || document.body)?.focus?.();
    };
  }, [triggerRef]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      setAvailW(el.clientWidth);
      setAvailH(el.clientHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const nodes = Array.from(dialogRef.current?.querySelectorAll(FOCUSABLE) || []).filter(
        (node) => node.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const { width: iW, height: iH } = INTRINSIC.desktop;
  const scale = Math.min(1, (availW || iW) / iW, (availH || iH) / iH);
  const w = iW * scale;
  const h = iH * scale;

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
      className="fixed inset-0 z-[60] flex flex-col bg-canvas"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-ink-muted">
          {project.demoUrl}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-xs text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          {local.close}
        </button>
      </div>

      <div ref={contentRef} className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
        <div
          className="relative overflow-hidden rounded-lg border border-line bg-canvas shadow-lux"
          style={{ width: w, height: h }}
        >
          <div
            style={{
              width: iW,
              height: iH,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <iframe
              src={project.demoUrl}
              title={`${project.title} fullscreen preview`}
              width={iW}
              height={iH}
              className="block border-0"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

const CaseStudy = ({ project, roleInfo, ui, lang = 'id', active = false }) => {
  const local = LOCAL_UI[lang] || LOCAL_UI.id;
  const [device, setDevice] = useState('desktop');
  const [fullscreen, setFullscreen] = useState(false);
  
  const [breakdown, setBreakdown] = useState(false);
  const wrapRef = useRef(null);
  const fullscreenBtnRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['0 10px 30px -10px rgba(0,0,0,0.05)', '0 25px 50px -12px rgba(46,111,64,0.12)', '0 10px 30px -10px rgba(0,0,0,0.05)']
  );

  const [measuredW, setMeasuredW] = useState(0);
  const intrinsic = INTRINSIC[device];

  const measure = useCallback(() => {
    if (wrapRef.current) {
      setMeasuredW(wrapRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, device]);

  const measured = measuredW > 0;
  const frameWidth = measuredW;
  const frameHeight = Math.round(measuredW * (intrinsic.height / intrinsic.width));
  const frameScale = measuredW / intrinsic.width;

  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  return (
    <section id="work" ref={sectionRef} className="scroll-mt-24">
      <SectionLabel number="01" title={ui.featuredWork} active={active} />
      <div className="mt-8">
              <h3 className="font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">{project.title}</h3>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary">{project.description}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.timelineLabel}</span>
                <p className="mt-1 font-mono text-xs text-ink">{project.timeline}</p>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.toolsLabel}</span>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {(project.tools || []).map((t) => (
              <li key={t}>
                <span className="inline-flex min-h-[28px] items-center rounded-md border border-line bg-surface px-2.5 font-mono text-[11px] text-ink">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface shadow-lux"
        style={{ scale: cardScale, boxShadow: cardShadow }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5 rounded-lg border border-line bg-canvas p-1">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded px-3 text-xs font-mono transition-colors ${
                device === 'desktop' ? 'bg-accent text-accent-contrast shadow-sm' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded px-3 text-xs font-mono transition-colors ${
                device === 'mobile' ? 'bg-accent text-accent-contrast shadow-sm' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              Mobile
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              ref={fullscreenBtnRef}
              type="button"
              onClick={() => setFullscreen(true)}
              className="group inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-xs text-ink-secondary transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Maximize className="h-3.5 w-3.5 transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              {local.fullscreen}
            </button>
            
          </div>
        </div>

        <div className="relative border-b border-line bg-surface px-4 py-2.5 flex items-center gap-3">
          
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-ink-muted">{project.demoUrl}</span>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[36px] shrink-0 items-center gap-1 font-mono text-[11px] text-ink-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {ui.newTab}
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="relative p-3 sm:p-5">
          
          <div ref={wrapRef} className="relative z-0 w-full">
            {measured ? (
              <motion.div
                className="relative mx-auto overflow-hidden rounded-md border border-line bg-canvas"
                style={{ width: frameWidth, height: frameHeight }}
              >
                <motion.div
                  style={{
                    width: intrinsic.width,
                    height: intrinsic.height,
                    scale: frameScale,
                    transformOrigin: 'top left',
                  }}
                >
                  <iframe
                    src={project.demoUrl}
                    title={`${project.title} live preview`}
                    width={intrinsic.width}
                    height={intrinsic.height}
                    loading="lazy"
                    className="block border-0"
                    style={{ width: '100%', height: '100%' }}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <div
                className="relative mx-auto overflow-hidden rounded-md border border-line bg-canvas"
                style={{ width: '100%', aspectRatio: device === 'desktop' ? '1440 / 820' : '375 / 812' }}
              />
            )}
          </div>
        </div>
      </motion.div>

      {project.features && project.features.length > 0 && (
        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.features}</p>
          <ol className="mt-4 space-y-4">
            {project.features.map((feature, index) => (
              <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink-secondary">
                <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setBreakdown(true)}
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-md border border-accent/30 accent-soft px-4 text-sm font-medium text-accent transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {local.breakdown}
        </button>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <Github className="h-4 w-4" aria-hidden="true" />
          {ui.sourceCode}
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-4 text-sm text-accent-contrast transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {ui.liveDemo}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>

      {fullscreen && <FullscreenModal project={project} local={local} onClose={closeFullscreen} triggerRef={fullscreenBtnRef} />}
      <AnimatePresence>
        {breakdown && <BreakdownModal project={project} local={local} onClose={() => setBreakdown(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default CaseStudy;
