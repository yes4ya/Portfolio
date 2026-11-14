import React from 'react';

const SectionHeading = ({ number, title, active }) => (
  <div className="flex items-baseline gap-4">
    <span className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${active ? 'text-accent' : 'text-ink-muted'}`}>{number}</span>
    <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
  </div>
);

const Experience = ({ experience, ui, active = false }) => {
  return (
    <section id="experience" className="scroll-mt-24">
      <SectionHeading number="03" title={ui.experienceTitle} active={active} />
      {experience.length === 0 ? (
        <p className="mt-6 text-sm text-ink-secondary">{ui.experienceEmpty}</p>
      ) : (
        <ul className="mt-8 space-y-10">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.role}`} className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] sm:gap-8">
              <div>
                <p className="font-mono text-xs text-ink-muted">{item.period}</p>
                <p className="mt-1 text-sm text-ink-secondary">{item.organization}</p>
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold tracking-tight text-ink">{item.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Experience;
