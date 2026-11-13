import React from 'react';

const SectionHeading = ({ number, title, active }) => (
  <div className="flex items-baseline gap-4">
    <span className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${active ? 'text-accent' : 'text-ink-muted'}`}>{number}</span>
    <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
  </div>
);

const Education = ({ education, ui, active = false }) => {
  return (
    <section id="education" className="scroll-mt-24">
      <SectionHeading number="04" title={ui.educationTitle} active={active} />
      {education.length === 0 ? (
        <p className="mt-6 text-sm text-ink-secondary">{ui.educationEmpty}</p>
      ) : (
        <ul className="mt-8 space-y-10">
          {education.map((item, index) => (
            <li key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] sm:gap-8">
              <div>
                <p className="font-mono text-xs text-ink-muted">{item.startYear} - {item.endYear}</p>
                <p className="mt-1 text-sm text-ink-secondary">{item.location}</p>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">{item.institution}</h3>
                <p className="mt-1 text-sm text-ink-secondary">{item.degree}</p>
                <p className="mt-1 text-sm text-ink-muted">{ui.specialization}: {item.specialization} &middot; {ui.gpa}: {item.gpa}/4.00</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Education;
