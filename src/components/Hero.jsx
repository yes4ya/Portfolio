import React from 'react';
import Reveal from './Reveal';
import { ArrowUpRight, Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = ({ personal }) => {
  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="min-w-0 flex-1">

            {/* Availability note */}
            <div className="flex items-center gap-2 mb-6 text-xs text-typography-secondary">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{personal.status}</span>
            </div>

            {/* Name & Role */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              {personal.name}
            </h1>

            <p className="text-lg sm:text-xl text-typography-primary font-medium mb-3">
              {personal.role} &middot; <span className="text-typography-muted">{personal.degree}</span>
            </p>

            <p className="text-base sm:text-lg text-typography-secondary max-w-2xl leading-relaxed mb-8">
              {personal.subheadline}
            </p>

            {/* Direct links & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center text-xs sm:text-sm font-medium px-4 py-2 rounded-md bg-white text-black hover:bg-neutral-200 transition-colors sm:min-h-0"
              >
                Lihat Proyek
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md border border-surface-border text-typography-secondary hover:text-white hover:bg-surface-subtle transition-colors sm:min-h-0"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-typography-muted" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md border border-surface-border text-typography-secondary hover:text-white hover:bg-surface-subtle transition-colors sm:min-h-0"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-typography-muted" />
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md border border-surface-border text-typography-secondary hover:text-white hover:bg-surface-subtle transition-colors sm:min-h-0"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{personal.email}</span>
              </a>

              {personal.cvUrl && (
                <a
                  href={personal.cvUrl}
                  download
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md border border-surface-border text-typography-secondary hover:text-white hover:bg-surface-subtle transition-colors sm:min-h-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh CV</span>
                </a>
              )}
            </div>
          </div>

          {personal.photoUrl && (
            <div className="relative shrink-0">
              <img
                src={personal.photoUrl}
                alt={`Foto ${personal.name}`}
                width="800"
                height="1200"
                fetchPriority="high"
                decoding="async"
                className="w-32 sm:w-40 lg:w-48 h-auto"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* Metadata summary bar */}
        <div className="mt-10 pt-6 border-t border-surface-borderSubtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-typography-muted">
          <div>
            <div className="text-typography-faint uppercase tracking-wider mb-1">Pendidikan</div>
            <div className="text-typography-secondary">S.Kom UKSW</div>
          </div>
          <div>
            <div className="text-typography-faint uppercase tracking-wider mb-1">Spesialisasi</div>
            <div className="text-typography-secondary">{personal.specialization}</div>
          </div>
          <div>
            <div className="text-typography-faint uppercase tracking-wider mb-1">Fokus Inti</div>
            <div className="text-typography-secondary">React, Tailwind CSS</div>
          </div>
          <div>
            <div className="text-typography-faint uppercase tracking-wider mb-1">Lokasi</div>
            <div className="text-typography-secondary">Salatiga, Indonesia</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
