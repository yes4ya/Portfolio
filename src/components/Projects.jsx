import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Proyek
            </h2>
          </div>
          <div className="md:col-span-9">
            <p className="text-sm text-typography-secondary">
              Pilihan implementasi perangkat lunak, prototipe antarmuka interaktif, dan aplikasi web yang pernah saya kerjakan.
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="border border-surface-border rounded-lg p-5 sm:p-6 bg-surface hover:border-typography-muted hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[11px] text-typography-muted">
                      0{idx + 1} &middot; {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-typography-secondary font-normal mt-0.5">
                    {project.tagline}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded border border-surface-border text-typography-secondary hover:text-white hover:bg-surface-subtle transition-colors sm:min-h-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Kode</span>
                    </a>
                  )}
                  <a
                    href={project.figmaUrl || project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded bg-white text-black hover:bg-neutral-200 transition-colors sm:min-h-0"
                  >
                    <span>{project.primaryActionLabel || "Demo"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-typography-secondary leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Figma Interactive Embed */}
              {project.embedUrl && (
                <div className="my-5 rounded-md border border-surface-border overflow-hidden bg-black">
                  <div className="px-3.5 py-2 bg-surface-muted border-b border-surface-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-mono text-[11px] text-typography-secondary">
                        Figma Prototype Embed &middot; Interaktif
                      </span>
                    </div>
                    <a
                      href={project.figmaUrl || project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center font-mono text-[11px] text-typography-muted hover:text-white gap-1 transition-colors sm:min-h-0"
                    >
                      <span>Layar Penuh</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative w-full aspect-video sm:h-[440px] bg-black">
                    <iframe
                      title={`${project.title} Figma Prototype Embed`}
                      src={project.embedUrl}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Functional features list */}
              <div className="mb-4 pt-3 border-t border-surface-borderSubtle">
                <div className="text-xs font-mono text-typography-muted mb-2">
                  Implementasi & Karakteristik:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-typography-primary">
                  {project.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-typography-muted select-none">&bull;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-muted text-typography-muted border border-surface-borderSubtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
