import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { EASE_EDITORIAL, useMotionPresets } from '../lib/motion';

const CopyEmailLink = ({ email, ui }) => {
  const [copied, setCopied] = useState(false);
  const { prefersReduced } = useMotionPresets();

  const handleCopy = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; the mailto link still works.
    }
  };

  return (
    <div className="group relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-accent"
        aria-label={copied ? ui.emailCopied : ui.copyEmail}
      >
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-ink-muted transition-colors group-hover:text-accent">
          {copied
            ? <Check className="h-4 w-4 text-accent" aria-hidden="true" />
            : <Copy className="h-4 w-4" aria-hidden="true" />}
        </span>
        <span className="break-all">{email}</span>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_EDITORIAL }}
            role="status"
            className="absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 text-xs text-ink shadow-sm"
          >
            {ui.emailCopied}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactLink = ({ href, icon: Icon, label, external = false }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-accent"
  >
    <Icon className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-accent" aria-hidden="true" />
    <span className="break-all">{label}</span>
    {external && (
      <ArrowUpRight
        className="h-3.5 w-3.5 text-ink-muted transition-transform duration-200 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden="true"
      />
    )}
  </a>
);

/**
 * Left column of the editorial split: identity, availability, a two sentence
 * summary, and the fast contact links. The blocks arrive one after another so
 * the column reads like a printed masthead being set.
 */
const Sidebar = ({ personal, ui }) => {
  const { fadeUp, staggerContainer } = useMotionPresets();

  return (
    <motion.aside
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.06, 0.05)}
      className="lg:sticky lg:top-24 lg:self-start"
    >
      <motion.p
        variants={fadeUp}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
      >
        {ui.kicker}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="mt-4 font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink"
      >
        {personal.name}
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-3 text-sm text-ink-secondary">
        {personal.role}
      </motion.p>

      <motion.ul variants={fadeUp} className="mt-6 space-y-2 text-sm text-ink-secondary">
        <li className="flex items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {personal.status}
        </li>
        <li className="flex items-center gap-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
          {personal.location}
        </li>
      </motion.ul>

      <motion.p
        variants={fadeUp}
        className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-secondary"
      >
        {personal.bio}
      </motion.p>

      <motion.nav
        variants={fadeUp}
        aria-label={ui.contactQuick}
        className="mt-8 border-t border-line pt-6"
      >
        <ul className="space-y-3.5">
          <li>
            <CopyEmailLink email={personal.email} ui={ui} />
          </li>
          <li>
            <ContactLink href={personal.github} icon={Github} label="GitHub" external />
          </li>
          <li>
            <ContactLink href={personal.linkedin} icon={Linkedin} label="LinkedIn" external />
          </li>
        </ul>
      </motion.nav>
    </motion.aside>
  );
};

export default Sidebar;
