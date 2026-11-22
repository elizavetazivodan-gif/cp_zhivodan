import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LOGO_SRC from '../assets/logo.png';
import LOGO_DARK_SRC from '../assets/logo_dark.png';
import { useTheme } from '../theme';

const GREEN = '#108B6B';
const DARK = '#003D30';
const MINT = '#EAFBF4';
const NIGHT = '#06231C';

const MENU_KEY = 'header-menu-open';
const BAR_KEY = 'header-bar-index';

const KEEP_OPEN_ON_NAVIGATE = true;

/* як на десктопі */
const BAR_EXTRA = 6;
const BAR_THICKNESS = 5;
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const BAR_MS = 220;
const FADE_MS = 220;
const COLOR_MS = 220;

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/about', label: 'Про нас' },
  { href: '/events', label: 'Анонси і події' },
  { href: '/volunteering', label: 'Волонтерство та ініціативи' },
  { href: '/proposals', label: 'Пропозиції та ідеї' },
  { href: '/documents', label: 'Документи і звітність' },
  { href: '/polls', label: 'Анонімні опитування' },
  { href: '/faq', label: 'FAQ для 1 курсу' },
];

const ProfileIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{ width: 34, height: 34, display: 'block', fill: color, transition: `fill ${COLOR_MS}ms ${EASE}` }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const BurgerIcon: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: 34, height: 25, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          height: 5,
          borderRadius: 9999,
          backgroundColor: color,
          display: 'block',
          transition: `background-color ${COLOR_MS}ms ${EASE}`,
        }}
      />
    ))}
  </div>
);

export const HeaderMobile: React.FC = () => {
  const [dark] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
    if (!KEEP_OPEN_ON_NAVIGATE) return false;
    try {
      return sessionStorage.getItem(MENU_KEY) === '1';
    } catch {
      return false;
    }
  });
  /* true лише після натискання на гамбургер, щоб при переході між сторінками меню не блимало */
  const [animateIn, setAnimateIn] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const [clickedIndex, setClickedIndex] = useState(-1);
  const pathIndex = NAV_ITEMS.findIndex((item) => item.href === currentPath);
  const activeIndex = pathIndex >= 0 ? pathIndex : clickedIndex;

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const barReady = useRef(false);
  const [bar, setBar] = useState<{ left: number; width: number; top: number } | null>(null);
  const [barAnimate, setBarAnimate] = useState(false);

  /* на телефоні немає наведення, тож лінія стоїть під активним пунктом */
  const target = activeIndex;

  const measure = (i: number) => {
    const el = itemRefs.current[i];
    if (!el) return null;
    return {
      left: el.offsetLeft - BAR_EXTRA,
      width: el.offsetWidth + BAR_EXTRA * 2,
      top: el.offsetTop + el.offsetHeight + 2,
    };
  };

  /* початкове розташування при відкритті меню;
     якщо перейшов на інший пункт - лінія плавно доїжджає від попереднього */
  useLayoutEffect(() => {
    if (!isMenuOpen) {
      barReady.current = false;
      setBar(null);
      try {
        sessionStorage.setItem(BAR_KEY, String(activeIndex));
      } catch {
        /* ігнор */
      }
      return;
    }

    let prev = activeIndex;
    try {
      const saved = sessionStorage.getItem(BAR_KEY);
      if (saved !== null) prev = Number(saved);
    } catch {
      /* ігнор */
    }
    const startIndex = prev >= 0 && prev < NAV_ITEMS.length ? prev : activeIndex;

    barReady.current = false;
    setBarAnimate(false);
    setBar(startIndex >= 0 ? measure(startIndex) : null);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        barReady.current = true;
        setBarAnimate(true);
        setBar(activeIndex >= 0 ? measure(activeIndex) : null);
      });
    });
    try {
      sessionStorage.setItem(BAR_KEY, String(activeIndex));
    } catch {
      /* ігнор */
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (!isMenuOpen) return;
    const onResize = () => {
      if (target < 0) return;
      const next = measure(target);
      if (next) {
        setBarAnimate(false);
        setBar(next);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen, target]);

  const toggleMenu = () => {
    setAnimateIn(true);
    setIsMenuOpen((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(MENU_KEY, next ? '1' : '0');
      } catch {
        /* ігноруємо */
      }
      return next;
    });
  };

  /* клік по пункту: запам'ятав, де зараз лінія, щоб на новій сторінці вона не стрибала */
  const onItemClick = (i: number) => {
    setClickedIndex(i);
    try {
      sessionStorage.setItem(BAR_KEY, String(activeIndex));
      if (!KEEP_OPEN_ON_NAVIGATE) sessionStorage.setItem(MENU_KEY, '0');
    } catch {
      /* ігнор */
    }
  };

  const fadeIn = (delayMs = 0): React.CSSProperties =>
    animateIn ? { animation: `hdr-in ${FADE_MS}ms ${EASE} ${delayMs}ms backwards` } : {};

  const iconColor = isMenuOpen ? '#FFFFFF' : GREEN;

  return (
    <div style={{ position: 'relative', isolation: 'isolate' }}>
      {/* зелений фон за нижніми заокругленими кутами шапки */}
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, backgroundColor: GREEN, zIndex: -1 }} />

      <header
        style={{
          boxSizing: 'border-box',
          padding: '12px 12px 14px',
          backgroundColor: dark ? NIGHT : MINT,
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          transition: `background-color ${COLOR_MS}ms ${EASE}`,
        }}
      >
        <style>{`
          @keyframes hdr-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: none; }
          }
          @media (prefers-reduced-motion: reduce) {
            .hdr-anim, .hdr-anim * { animation: none !important; transition: none !important; }
          }
        `}</style>

        {/* однакова капсула в обох станах: фон плавно загоряється зеленим */}
        <div
          className="hdr-anim"
          style={{
            borderRadius: 32,
            padding: isMenuOpen ? '10px 18px 20px' : '0 2px',
            backgroundColor: isMenuOpen ? GREEN : 'rgba(16, 139, 107, 0)',
            transition: `background-color ${COLOR_MS}ms ${EASE}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 56 }}>
            {!isMenuOpen ? (
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, textDecoration: 'none', ...fadeIn() }}>
                <img src={dark ? LOGO_DARK_SRC : LOGO_SRC} alt="Логотип ОСМ" style={{ height: 40, width: 'auto', flexShrink: 0, objectFit: 'contain' }} />
                <div
                  style={{
                    minWidth: 0,
                    color: dark ? MINT : DARK,
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: 700,
                    fontSize: 9.5,
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    transition: `color ${COLOR_MS}ms ${EASE}`,
                  }}
                >
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Офіційна сторінка ОСМ (ОСС)</div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>ВСП “ХКТФК НТУ “ХПІ”</div>
                </div>
              </a>
            ) : (
              <span />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <Link to="/acc" aria-label="Акаунт" style={{ display: 'flex', padding: 4 }}>
                <ProfileIcon color={iconColor} />
              </Link>
              <button
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
                aria-expanded={isMenuOpen}
                style={{ border: 0, background: 'none', padding: 6, cursor: 'pointer' }}
              >
                <BurgerIcon color={iconColor} />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, marginTop: 4, paddingLeft: BAR_EXTRA }}>
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={item.href}
                  onClick={() => onItemClick(i)}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    color: i === target ? DARK : '#FFFFFF',
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.25,
                    textDecoration: 'none',
                    transition: `color ${BAR_MS}ms ${EASE}`,
                    ...fadeIn(i * 20),
                  }}
                >
                  {item.label}
                </a>
              ))}

              {/* лінія, що плавно їде між пунктами */}
              {bar && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: bar.left,
                    top: bar.top,
                    width: bar.width,
                    height: BAR_THICKNESS,
                    borderRadius: 999,
                    backgroundColor: DARK,
                    opacity: target >= 0 ? 1 : 0,
                    transition: barAnimate
                      ? `left ${BAR_MS}ms ${EASE}, top ${BAR_MS}ms ${EASE}, width ${BAR_MS}ms ${EASE}, opacity ${BAR_MS}ms ${EASE}`
                      : `opacity ${BAR_MS}ms ${EASE}`,
                  }}
                />
              )}
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};
