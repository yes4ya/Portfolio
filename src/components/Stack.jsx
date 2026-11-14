import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Code2, Palette, Cpu, Layers, Terminal, Globe, Smartphone, Database } from 'lucide-react';

const getCategoryIcon = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('frontend') || lower.includes('front-end')) return <Code2 className="h-5 w-5 text-accent" />;
  if (lower.includes('ui') || lower.includes('ux') || lower.includes('design')) return <Palette className="h-5 w-5 text-accent" />;
  if (lower.includes('backend') || lower.includes('data')) return <Database className="h-5 w-5 text-accent" />;
  return <Cpu className="h-5 w-5 text-accent" />;
};

const BentoCard = ({ label, items, className = '' }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%);`;

  const handlePointerMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    x.set(-400);
    y.set(-400);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-lux transition-all duration-300 hover:border-accent/40 select-none ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: spotlight }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas">
              {getCategoryIcon(label)}
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{label}</p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {items.map((item) => (
              <li key={item.name}>
                <span className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-line bg-canvas px-4 font-mono text-xs text-ink transition-colors duration-200 hover:border-accent/50 hover:text-accent">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mini visual token swatch for UI/UX or Frontend card */}
        <div className="mt-8 border-t border-line pt-4 flex items-center justify-end font-mono text-[11px] text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-accent/60" />
            <span className="h-3 w-3 rounded-full bg-line" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Stack = ({ skills, ui, active = false }) => {
  const categories = skills.categories || [];

  return (
    <section id="stack" className="scroll-mt-24">
      <div className="flex items-baseline gap-4">
        <span className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-500 ${active ? 'text-accent' : 'text-ink-muted'}`}>02</span>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">{ui.stackTitle}</h2>
      </div>

      {categories.length === 0 ? (
        <p className="mt-6 text-sm text-ink-secondary">{ui.stackEmpty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          {categories.map((category, index) => {
            const isFirst = index === 0;
            const spanClass = isFirst ? 'md:col-span-7' : 'md:col-span-5';
            return (
              <BentoCard
                key={category.categoryName}
                label={category.categoryName}
                items={category.items || []}
                className={spanClass}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Stack;
