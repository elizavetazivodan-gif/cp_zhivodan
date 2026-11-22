import { useLayoutEffect, useRef } from 'react';

const MS = 220; // як у хедері (FADE_MS)
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'; // той самий, що в хедері

/* плавне виринання блоків десктопної версії при прокручуванні */
export function useDesktopReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const all = Array.from(root.querySelectorAll(':scope > *, [data-reveal]')) as HTMLElement[];
    const els = all.filter((el: HTMLElement) => el.hasAttribute('data-reveal') || !el.querySelector('[data-reveal]'));

    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.translate = '0 2.2vw';
      el.style.transition = `opacity ${MS}ms ${EASE}, translate ${MS}ms ${EASE}`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(n, 4) * 40}ms`;
          el.style.opacity = '1';
          el.style.translate = '0 0';
          n += 1;
          io.unobserve(el);
          /* після завершення прибираємо інлайнові стилі, щоб не заважали hover/іншим переходам */
          window.setTimeout(() => {
            el.style.transition = '';
            el.style.transitionDelay = '';
            el.style.translate = '';
            el.style.opacity = '';
          }, MS + 400 + 40 * 4);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      els.forEach((el) => {
        el.style.opacity = '';
        el.style.translate = '';
        el.style.transition = '';
        el.style.transitionDelay = '';
      });
    };
  }, []);

  return ref;
}