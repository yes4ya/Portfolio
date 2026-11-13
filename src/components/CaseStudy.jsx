import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, animate, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Github, Monitor, Smartphone, Maximize, X } from 'lucide-react';
import { EASE_EDITORIAL, useMotionPresets } from '../lib/motion';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

const INTRINSIC = {
  desktop: { width: 1440, height: 820 },
  mobile: { width: 375, height: 812 },
};

const LOCAL_UI = {
  id: { fullscreen: 'Layar Penuh', close: 'Tutup (Esc)' },
  en: { fullscreen: 'Fullscreen', close: 'Close (Esc)' },
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
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          {local.close}
        </button>
      </div>
      <div ref={contentRef} className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
        <div style={{ width: w, height: h }}>
          <div style={{ width: iW, height: iH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <iframe
              src={project.demoUrl}
              title={`${project.title} live preview`}
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

const CaseStudy = ({ project, roleInfo, ui, lang, active = false }) => {
  const [device, setDevice] = useState('desktop');
  const [fullscreen, setFullscreen] = useState(false);
  const wrapRef = useRef(null);
  const fullscreenBtnRef = useRef(null);
  const [wrapWidth, setWrapWidth] = useState(0);
  const { prefersReduced, frameSpring, spring } = useMotionPresets();

  const frameWidth = useMotionValue(0);
  const frameHeight = useMotionValue(0);
  const frameScale = useMotionValue(1);

  useLayoutEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const measure = () => setWrapWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!wrapWidth) return;
    const { width: iW, height: iH } = INTRINSIC[device];
    const s = Math.min(1, wrapWidth / iW);
    const w = device === 'desktop' ? wrapWidth : Math.min(iW, wrapWidth);
    frameWidth.set(w);
    frameHeight.set(iH * s);
    frameScale.set(s);
  }, [wrapWidth]);

  useEffect(() => {
    if (!wrapWidth) return;
    const { width: iW, height: iH } = INTRINSIC[device];
    const s = Math.min(1, wrapWidth / iW);
    const targetW = device === 'desktop' ? wrapWidth : Math.min(iW, wrapWidth);
    const targetH = iH * s;

    const controls = [
      animate(frameWidth, targetW, frameSpring),
      animate(frameHeight, targetH, frameSpring),
      animate(frameScale, s, frameSpring)
    ];
    return () => controls.forEach((control) => control.stop());
  }, [device, wrapWidth, frameSpring]);

  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  const measured = wrapWidth > 0;
  const intrinsic = INTRINSIC[device];
  const local = LOCAL_UI[lang || 'id'];

  return (
    <section id="work" className="scroll-mt-24">
      <SectionLabel number="01" title={ui.featuredWork} active={active} />
      <div className="mt-8">
        <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{project.title}</h3>
        <p className="mt-2 text-sm text-ink-secondary">{project.tagline}</p>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary">{project.description}</p>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-line py-5 sm:grid-cols-3 sm:gap-8">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.role}</dt>
          <dd className="mt-1.5 text-sm text-ink">
            {roleInfo ? roleInfo.role : project.category}
            {roleInfo && <span className="block text-ink-secondary">{roleInfo.organization}</span>}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.period}</dt>
          <dd className="mt-1.5 text-sm text-ink">{roleInfo ? roleInfo.period : ' '}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{ui.technology}</dt>
          <dd className="mt-1.5 text-sm text-ink">{project.tags.join(', ')}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={ui.previewMode} className="inline-flex items-center gap-0.5 rounded-md border border-line bg-surface p-0.5">
          {[
            { value: 'desktop', label: ui.desktop, Icon: Monitor },
            { value: 'mobile', label: ui.mobile, Icon: Smartphone },
          ].map(({ value, label, Icon }) => {
            const isActive = device === value;
            return (
              <motion.button
                key={value}
                type="button"
                onClick={() => setDevice(value)}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                aria-pressed={isActive}
                className={`relative inline-flex min-h-[36px] items-center gap-1.5 rounded px-2.5 text-xs transition-colors ${isActive ? 'text-canvas' : 'text-ink-muted hover:text-ink'}`}
              >
                {isActive && (
                  <motion.span layoutId={`device-pill-${project.id}`} className="absolute inset-0 rounded bg-ink" transition={spring} />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
                <span className="relative z-10">{label}</span>
              </motion.button>
            );
          })}
        </div>
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

      <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex items-center gap-3 border-b border-line px-3 py-2">
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
        <div className="p-3 sm:p-5">
          <div ref={wrapRef} className="w-full">
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
      </div>

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
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <Github className="h-4 w-4" aria-hidden="true" />
          {ui.sourceCode}
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-2 rounded-md bg-ink px-4 text-sm text-canvas transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {ui.liveDemo}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
      {fullscreen && <FullscreenModal project={project} local={local} onClose={closeFullscreen} triggerRef={fullscreenBtnRef} />}
    </section>
  );
};

export default CaseStudy;
