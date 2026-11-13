import React from 'react';

const Stack = ({ skills, ui, active = false }) => {
  const categories = skills.categories || [];

  return (
    <section id="stack" className="scroll-mt-24">
      <div className="flex items-baseline gap-4">
        <span className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${active ? 'text-accent' : 'text-ink-muted'}`}>02</span>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{ui.stackTitle}</h2>
      </div>

      {categories.length === 0 ? (
        <p className="mt-6 text-sm text-ink-secondary">{ui.stackEmpty}</p>
      ) : (
        <div className="mt-8 space-y-8">
          {categories.map((category) => (
            <div key={category.categoryName}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{category.categoryName}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(category.items || []).map((item) => (
                  <li key={item.name}>
                    <span className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm text-ink transition-colors hover:border-ink hover:text-accent">
                      {item.name}
                      <span className="font-mono text-[11px] text-ink-muted">{item.category}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Stack;
