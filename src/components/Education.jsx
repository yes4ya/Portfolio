import React from 'react';

const Education = ({ education }) => {
  return (
    <section id="education" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Pendidikan
            </h2>
          </div>

          <div className="md:col-span-9 space-y-6">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="border border-surface-border rounded-lg p-5 sm:p-6 bg-surface"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-base font-bold text-white">
                    {item.institution}
                  </h3>
                  <span className="font-mono text-xs text-typography-muted">
                    {item.location}
                  </span>
                </div>

                <div className="text-sm font-medium text-typography-primary mb-1">
                  {item.degree} &middot; {item.major}
                </div>

                <div className="text-xs font-mono text-typography-secondary mb-2">
                  Spesialisasi: {item.specialization}
                </div>

                {(item.startYear || item.gpa) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-typography-muted mb-4">
                    {item.startYear && item.endYear && (
                      <span>Periode: {item.startYear} - {item.endYear}</span>
                    )}
                    {item.gpa && <span>IPK: {item.gpa} / 4.00</span>}
                  </div>
                )}

                <div className="pt-3 border-t border-surface-borderSubtle">
                  <div className="text-xs font-mono text-typography-muted mb-2">
                    Fokus Kurikulum & Rekayasa:
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-typography-secondary">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-typography-muted select-none">&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
