import React from 'react';

const FEATURED_ORGANIZATION = 'Penerbit Erlangga';

const Experience = ({ experience = [] }) => {
  const entries = experience.filter(
    (item) => item.organization === FEATURED_ORGANIZATION
  );

  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Pengalaman
            </h2>
          </div>

          <div className="md:col-span-9">
            {entries.length === 0 ? (
              <p className="text-sm text-typography-secondary">
                Belum ada pengalaman kerja yang dicantumkan.
              </p>
            ) : (
              <ul className="space-y-6">
                {entries.map((item) => (
                  <li key={`${item.organization}-${item.role}`}>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {item.role}
                      </h3>
                      <span className="font-mono text-[11px] text-typography-muted shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-typography-secondary mt-0.5">
                      {item.organization}
                    </div>

                    <p className="text-xs sm:text-sm text-typography-secondary leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
