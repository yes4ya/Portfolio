import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = ({ personal, navLinks, ui }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:pr-40">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-sm text-ink">
              {personal.name} <span className="text-ink-muted">&middot;</span> {personal.location}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{personal.role}</p>
          </div>

          <nav aria-label="Footer links" className="flex flex-wrap items-center gap-5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs text-ink-secondary transition-colors hover:text-ink">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink-muted transition-colors hover:text-ink">
              <Github className="h-4 w-4" />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-muted transition-colors hover:text-ink">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-ink-muted">{year} {personal.name}. {ui.footerNote}</p>
      </div>
    </footer>
  );
};

export default Footer;
