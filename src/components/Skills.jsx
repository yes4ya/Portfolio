import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Label Section */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Keahlian Teknis
            </h2>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-8">
            {/* Quick highlight bar */}
            <div>
              <div className="text-xs text-typography-muted mb-3 font-mono">
                Teknologi yang sering digunakan:
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.highlights.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-surface-muted border border-surface-border text-typography-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Structured Table/List by Category */}
            <div className="space-y-6 pt-2">
              {skills.categories.map((cat) => (
                <div key={cat.categoryName} className="border border-surface-border rounded-md overflow-hidden bg-surface">
                  <div className="px-4 py-2.5 bg-surface-muted border-b border-surface-border flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="text-xs font-semibold text-white">
                      {cat.categoryName}
                    </span>
                    <span className="text-[11px] text-typography-muted sm:text-right">
                      {cat.description}
                    </span>
                  </div>

                  <div className="divide-y divide-surface-borderSubtle">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-surface-muted/50 transition-colors"
                      >
                        <span className="font-medium text-typography-primary">
                          {item.name}
                        </span>
                        <span className="font-mono text-xs text-typography-muted">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
