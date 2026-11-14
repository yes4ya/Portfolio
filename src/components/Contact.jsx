import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Github, Linkedin, Mail, Send } from 'lucide-react';

const Contact = ({ contact, personal, ui, active = false, lang = 'id' }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const email = personal.email || contact.email || 'yesayaroynugraha@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="flex items-baseline gap-4">
        <span className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${active ? 'text-accent' : 'text-ink-muted'}`}>05</span>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">{ui.contactTitle}</h2>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-lux">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (5 cols): Info & One-click Copy Email */}
          <div className="flex flex-col justify-between border-b border-line p-8 lg:border-b-0 lg:border-r lg:col-span-5">
            <div>
              <h3 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {contact.heading || (lang === 'en'
                  ? 'Got something to build? Let me know.'
                  : 'Ada yang mau dibangun? Kabarin saya.')}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                {contact.description || (lang === 'en'
                  ? "Whether it's a landing page, a design system, or just a second opinion on your frontend, I'm happy to chat. Drop me a message and I'll reply when I'm back at my desk."
                  : "Bisa untuk landing page, design system, atau cuma minta second opinion soal frontend kamu, saya senang ngobrol soal itu. Kirim pesan saja, nanti saya balas begitu kembali ke meja kerja.")}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* One-click copy email card */}
              <div
                onClick={handleCopyEmail}
                role="button"
                tabIndex={0}
                className="group flex  items-center justify-between rounded-2xl border border-line bg-canvas p-4 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted">Direct Email</span>
                    <span className="block truncate font-mono text-xs font-medium text-ink">{email}</span>
                  </div>
                </div>
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink-secondary transition-colors group-hover:border-accent group-hover:text-accent">
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-line bg-canvas px-4 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3 w-3 text-ink-muted" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-line bg-canvas px-4 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3 text-ink-muted" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Message Form */}
          <div className="p-8 lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {ui.nameLabel || 'Nama Lengkap'}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={lang === 'en' ? 'Your name' : 'Nama kamu'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {ui.emailLabel || 'Alamat Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="name@example.com"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {ui.messageLabel || 'Pesan Anda'}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tuliskan detail project atau pesan Anda di sini..."
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>{ui.sendButton || 'Kirim Pesan'}</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>

                {status === 'sent' && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-accent font-medium"
                  >
                    ✓ Pesan terkirim dengan sukses!
                  </motion.span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
