import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LanguageToggle = ({ lang, setLang }) => (
  <div
    className="inline-flex items-center gap-1 font-mono text-[11px]"
    role="group"
    aria-label="Pilih bahasa / Select language"
  >
    <button
      type="button"
      onClick={() => setLang('id')}
      aria-pressed={lang === 'id'}
      className={`inline-flex min-h-[44px] min-w-[32px] items-center justify-center px-1 transition-colors ${
        lang === 'id' ? 'text-white' : 'text-typography-muted hover:text-white'
      }`}
    >
      ID
    </button>
    <span className="text-surface-border" aria-hidden="true">
      |
    </span>
    <button
      type="button"
      onClick={() => setLang('en')}
      aria-pressed={lang === 'en'}
      className={`inline-flex min-h-[44px] min-w-[32px] items-center justify-center px-1 transition-colors ${
        lang === 'en' ? 'text-white' : 'text-typography-muted hover:text-white'
      }`}
    >
      EN
    </button>
  </div>
);

const Navbar = ({ personal, navLinks, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand / Name */}
        <a
          href="#"
          className="inline-flex min-h-[44px] items-center text-sm font-semibold tracking-tight text-white hover:text-typography-secondary transition-colors md:min-h-0"
        >
          {personal.name}
          <span className="ml-2 font-mono text-xs font-normal text-typography-muted">
            / {personal.nickname}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-typography-secondary hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageToggle lang={lang} setLang={setLang} />
          {personal.cvUrl && (
            <a
              href={personal.cvUrl}
              download
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Resume
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-surface-border text-typography-primary hover:bg-surface-subtle transition-colors"
          >
            Hubungi
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-typography-secondary hover:text-white border border-surface-border"
          aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-navigation" className="lg:hidden border-b border-surface-border bg-black px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center py-2 text-typography-secondary hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-surface-borderSubtle flex flex-wrap items-center gap-2">
            {personal.cvUrl && (
              <a
                href={personal.cvUrl}
                download
                className="inline-flex min-h-[44px] items-center text-xs font-medium px-3 py-1.5 rounded-md bg-white text-black"
              >
                Resume
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex min-h-[44px] items-center text-xs font-medium px-3 py-1.5 rounded-md border border-surface-border text-typography-primary"
            >
              Hubungi via Email
            </a>
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
