import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isFine, setIsFine] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setIsFine(media.matches);
    const listener = (e) => setIsFine(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Re-run when isFine flips: the cursor div only exists after this render
  useEffect(() => {
    if (!isFine) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    // rAF loop, direct DOM write: no React re-render on pointer movement
    let rafId = requestAnimationFrame(animate);
    function animate() {
      cursorX = mouseX;
      cursorY = mouseY;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, [role="button"], label, select');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('[data-cursor], button, a, [role="button"], label, select')) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [isFine]);

  if (!isFine) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-[width,height,background-color] duration-150 ${
          isHovered
            ? 'h-11 w-11 border-accent/20 bg-accent/10'
            : 'h-7 w-7 border-accent/60 bg-transparent'
        }`}
      >
        {cursorText ? (
          <span className="px-2 text-center font-mono text-[9px] uppercase tracking-wider text-accent">
            {cursorText}
          </span>
        ) : (
          <div
            className={`rounded-full bg-accent transition-[width,height] duration-150 ${
              isHovered ? 'h-2 w-2' : 'h-1.5 w-1.5'
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
