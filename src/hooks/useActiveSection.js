import { useEffect, useState } from 'react';

/**
 * Tracks the section crossing the reading line under the sticky header.
 * The top navigation and the side rail share this hook, so their active
 * markers can never disagree.
 */
const useActiveSection = (ids) => {
  const [state, setState] = useState({ activeId: null, atTop: true });

  useEffect(() => {
    let ticking = false;

    const readScroll = () => {
      ticking = false;
      const y = window.scrollY;

      if (y <= 4) {
        setState((prev) =>
          prev.atTop && prev.activeId === null ? prev : { activeId: null, atTop: true }
        );
        return;
      }

      // Reading line sits ~35% down the viewport: a section becomes active
      // once its heading crosses the upper third, not just past the header.
      const line = Math.max(160, window.innerHeight * 0.35);
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }

      const atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;
      if (!current) current = ids[0] ?? null;

      setState((prev) =>
        !prev.atTop && prev.activeId === current ? prev : { activeId: current, atTop: false }
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(readScroll);
    };

    readScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return state;
};

export default useActiveSection;
