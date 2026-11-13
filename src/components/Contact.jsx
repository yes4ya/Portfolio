import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { EASE_EDITORIAL, useMotionPresets } from '../lib/motion';

const Contact = ({ contact, personal, ui, active = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedError, setCopiedError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { prefersReduced } = useMotionPresets();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setIsCopied(true);
      setCopiedError(false);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      setCopiedError(true);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const resetForm = () => setFormSubmitted(false);

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="flex items-baseline gap-4">
        <span
          className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${
            active ? 'text-accent' : 'text-ink-muted'
          }`}
        >
          05
        </span>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{ui.contactTitle}</h2>
      </div>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-secondary">
        {contact.ctaText}
      </p>

      {/* Email row */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex min-h-[44px] items-center gap-3 rounded-md border border-line bg-surface px-3 text-sm text-ink">
          <span className="break-all">{personal.email}</span>
        </div>
        <motion.button
          type="button"
          onClick={handleCopyEmail}
          whileTap={prefersReduced ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.16, ease: EASE_EDITORIAL }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line px-3 text-sm text-ink transition-colors hover:border-ink"
          aria-live="polite"
          aria-label={isCopied ? ui.emailCopied : ui.copyEmail}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isCopied ? 'copied' : 'copy'}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: prefersReduced ? 0 : 0.16, ease: EASE_EDITORIAL }}
              className="inline-flex"
            >
              {isCopied
                ? <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                : <Copy className="h-4 w-4" aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
          <span>{isCopied ? ui.emailCopied : (copiedError ? ui.emailFailed : ui.copyEmail)}</span>
        </motion.button>
      </div>

      {/* Contact form */}
      <div className="mt-10 border-t border-line pt-8">
        <AnimatePresence mode="wait" initial={false}>
          {!formSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_EDITORIAL }}
            >
              <h3 className="font-display text-lg text-ink">{ui.formTitle}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                {ui.formHint} <span className="text-ink">{personal.email}</span>
              </p>

              <form
                className="mt-6 space-y-5"
                onSubmit={handleFormSubmit}
                action={`mailto:${personal.email}`}
                method="post"
                encType="text/plain"
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-ink-secondary">{ui.nameLabel}</label>
                  <input type="text" id="name" name="name" required className="mt-1.5 block w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-ink-secondary">{ui.emailLabel}</label>
                  <input type="email" id="email" name="email" required className="mt-1.5 block w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-ink-secondary">{ui.messageLabel}</label>
                  <textarea id="message" name="message" rows="4" required className="mt-1.5 block w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink" />
                </div>
                <motion.button
                  type="submit"
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.16, ease: EASE_EDITORIAL }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-ink px-4 text-sm text-canvas transition-opacity hover:opacity-90"
                >
                  {ui.sendMessage}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.3, ease: EASE_EDITORIAL }}
            >
              <h3 className="font-display text-lg text-ink">{ui.formSent}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{ui.formHint} {personal.email}</p>
              <button type="button" onClick={resetForm} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line px-4 text-sm text-ink transition-colors hover:border-ink">
                {ui.writeAnother}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
