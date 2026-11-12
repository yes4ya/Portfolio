import React from 'react';

const Footer = ({ personal, navLinks }) => {
  return (
    <footer className="py-8 bg-black text-xs text-typography-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div>
          <span>{personal.name}</span> &middot;{' '}
          <span className="font-mono text-typography-faint">Salatiga, Indonesia</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-typography-muted hover:text-typography-primary transition-colors sm:min-h-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-typography-muted hover:text-typography-primary transition-colors sm:min-h-0"
          >
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
