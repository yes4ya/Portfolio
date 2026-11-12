import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Contact = ({ contact, personal }) => {
  const [copyState, setCopyState] = useState('idle');
  const copyTimer = useRef(null);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 2500);
  };

  const copyLabel = {
    idle: 'Salin alamat email',
    copied: 'Email tersalin',
    failed: 'Gagal menyalin, blok manual'
  }[copyState];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan portofolio dari ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nDari: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const githubLabel = contact.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const linkedinLabel = contact.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <section id="contact" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Kontak
            </h2>
          </div>

          <div className="md:col-span-9 space-y-8">
            <p className="text-base text-typography-primary leading-relaxed">
              {contact.ctaText}
            </p>

            {/* Direct Contact & Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-md border border-surface-border bg-surface">
                <div className="text-typography-muted mb-1 font-mono uppercase tracking-wider text-[11px]">
                  Email
                </div>
                <div className="font-medium text-white mb-2 break-all">
                  {contact.email}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[44px] items-center font-mono text-[11px] text-typography-secondary hover:text-white underline decoration-surface-border hover:decoration-white transition-colors sm:min-h-0"
                >
                  <span aria-live="polite">{copyLabel}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-surface-border bg-surface">
                <div className="text-typography-muted mb-1 font-mono uppercase tracking-wider text-[11px]">
                  GitHub
                </div>
                <div className="font-medium text-white mb-2">
                  {githubLabel}
                </div>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-typography-secondary hover:text-white underline decoration-surface-border hover:decoration-white transition-colors"
                >
                  <span>Buka profil</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded-md border border-surface-border bg-surface">
                <div className="text-typography-muted mb-1 font-mono uppercase tracking-wider text-[11px]">
                  LinkedIn
                </div>
                <div className="font-medium text-white mb-2">
                  {linkedinLabel}
                </div>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-typography-secondary hover:text-white underline decoration-surface-border hover:decoration-white transition-colors"
                >
                  <span>Buka profil</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Direct Form */}
            <div className="p-5 sm:p-6 rounded-lg border border-surface-border bg-surface">
              <h3 className="text-sm font-semibold text-white mb-1">
                Kirim Pesan
              </h3>
              <p className="text-xs text-typography-muted mb-4">
                Form ini membuka aplikasi email Anda dengan pesan yang sudah terisi, lalu dikirim ke {contact.email}.
              </p>

              {sent ? (
                <div className="space-y-3" role="status" aria-live="polite">
                  <div className="p-4 rounded border border-surface-border bg-surface-muted text-xs text-typography-primary">
                    Aplikasi email sudah dibuka. Tekan kirim di aplikasi tersebut untuk menyelesaikan pesan.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', email: '', message: '' });
                      setSent(false);
                    }}
                    className="inline-flex min-h-[44px] items-center font-mono text-[11px] text-typography-secondary hover:text-white underline decoration-surface-border hover:decoration-white transition-colors sm:min-h-0"
                  >
                    Tulis pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-typography-secondary mb-1">
                        Nama
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded bg-surface-muted border border-neutral-500 focus:border-white focus:outline-none text-white placeholder:text-typography-muted"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-typography-secondary mb-1">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded bg-surface-muted border border-neutral-500 focus:border-white focus:outline-none text-white placeholder:text-typography-muted"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-typography-secondary mb-1">
                      Pesan
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded bg-surface-muted border border-neutral-500 focus:border-white focus:outline-none text-white placeholder:text-typography-muted resize-none"
                      placeholder="Tuliskan pesan atau kebutuhan proyek..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center text-xs font-medium px-4 py-2 rounded bg-white text-black hover:bg-neutral-200 transition-colors sm:min-h-0"
                  >
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
