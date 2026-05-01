'use client';
import { useEffect } from 'react';

const CARD_SELECTORS = [
  '.vac-card',
  '.why-card',
  '.c-card',
  '.stat-box',
  '.glass-block',
  '.vac-more-card',
  '.faq-item',
  '.big-soc',
].join(', ');

const STEP = 80;

// Check if element is already visible on page load to prevent initial flash
function inViewport(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

export default function ScrollRevealInit() {
  useEffect(() => {
    // rootMargin:
    //   top -30px  → элемент перестаёт быть intersecting когда уходит на 30px за верх
    //               (анимация скрытия стартует пока элемент ещё чуть виден)
    //   bottom -130px → элемент перестаёт быть intersecting за 130px до нижнего края
    //               (при скролле вверх — анимация скрытия видна на экране)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.style.transitionDelay = el.dataset.revealDelay ?? '0ms';
            el.classList.add('is-visible');
          } else {
            el.style.transitionDelay = el.dataset.hideDelay ?? '0ms';
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '-30px 0px -130px 0px' }
    );

    document.querySelectorAll<HTMLElement>('section:not(#hero)').forEach((el) => {
      el.classList.add('reveal');
      // Immediately mark visible sections to avoid background flash on load
      if (inViewport(el)) el.classList.add('is-visible');
      observer.observe(el);
    });

    document.querySelectorAll<HTMLElement>(CARD_SELECTORS).forEach((el) => {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((c) =>
        c.matches(CARD_SELECTORS)
      );
      const total = siblings.length;
      const idx = siblings.indexOf(el);
      el.dataset.revealDelay = `${idx * STEP}ms`;
      el.dataset.hideDelay   = `${(total - 1 - idx) * STEP}ms`;
      el.classList.add('reveal-card');
      if (inViewport(el)) el.classList.add('is-visible');
      el.style.transitionDelay = el.dataset.revealDelay;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
