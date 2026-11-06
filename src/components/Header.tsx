import React, { useLayoutEffect, useRef, useState } from 'react';

const SCALE = 0.625;
const px = (n: number) => Math.round(n * SCALE);

const GREEN = '#108B6B';
const DARK = '#003D30';
const MINT = '#EAFBF4';

import LOGO_SRC from '../assets/logo.png';

const MENU_KEY = 'header-menu-open';
const BAR_KEY = 'header-bar-index';

/* false - лінія і підсвічування з'являються ТІЛЬКИ при наведенні курсора
   і зникають, коли курсор пішов. true — активна сторінка підсвічена завжди */
const SHOW_ACTIVE = true;

/* те, на скільки px лінія виступає з кожного боку за текст */
const BAR_EXTRA = 6;

/* Товщина лінії, px */
const BAR_THICKNESS = 6;

/* параметри анімації */
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const BAR_MS = 220; // швидкість руху лінії (і зміни кольору тексту, так як вони синхронні)
const FADE_MS = 220; // поява меню/логотипа
const COLOR_MS = 220; // загорається капсула та іконки

const NAV_ITEMS: { href: string; lines: [string, string] }[] = [
  { href: '/about', lines: ['Про', 'нас'] },
  { href: '/events', lines: ['Анонси', 'і події'] },
  { href: '/volunteering', lines: ['Волонтерство', 'та ініціативи'] },
  { href: '/proposals', lines: ['Пропозиції', 'та ідеї'] },
  { href: '/documents', lines: ['Документи', 'і звітність'] },
  { href: '/polls', lines: ['Анонімні', 'опитування'] },
  { href: '/faq', lines: ['FAQ для', '1 курсу'] },
];

const ProfileIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{
      width: px(72),
      height: px(72),
      display: 'block',
      fill: color,
      transition: `fill ${COLOR_MS}ms ${EASE}`,
    }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const BurgerIcon: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex flex-col justify-between" style={{ width: px(72), height: px(54) }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-full rounded-full"
        style={{
          height: px(12),
          backgroundColor: color,
          transition: `background-color ${COLOR_MS}ms ${EASE}`,
        }}
      />
    ))}
  </div>
);

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(MENU_KEY) === '1';
    } catch {
      return false;
    }
  });
  /* true лише після натискання на гамбургер, щоб при переході між сторінками меню не блимало */
  const [animateIn, setAnimateIn] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  /* розділ, на який клікнули (запасний варіант, якщо роутер не перезавантажує сторінку) */
  const [clickedIndex, setClickedIndex] = useState(-1);
  const pathIndex = NAV_ITEMS.findIndex((item) => item.href === currentPath);
  /* активний розділ лишається підсвіченим і з лінією, поки курсор не наведено на інший */
  const activeIndex = pathIndex >= 0 ? pathIndex : clickedIndex;

  /*рухома лінія під пунктами*/
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const barReady = useRef(false);
  const [hover, setHover] = useState<number | null>(null);
  const [bar, setBar] = useState<{ left: number; width: number; top: number } | null>(null);
  const [barAnimate, setBarAnimate] = useState(false);

  /* лінія стоїть під пунктом, на який наведено курсор; без наведення - під активним */
  const target = hover ?? (SHOW_ACTIVE ? activeIndex : -1);
  const prevTarget = useRef<number>(-1);

  const measure = (i: number) => {
    const el = itemRefs.current[i];
    if (!el) return null;
    return {
      left: el.offsetLeft - BAR_EXTRA,
      width: el.offsetWidth + BAR_EXTRA * 2,
      top: el.offsetTop + el.offsetHeight + px(4),
    };
  };

  /* початкове розташування при відкритті меню 
     якщо перейшов іншого пункту - лінія плавно доїзджає від попереднього */
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

    if (!SHOW_ACTIVE) {
      /* лінія прихована, поки немає наведення; ставлю її заздалегідь у нейтральну позицію */
      barReady.current = true;
      prevTarget.current = -1;
      setBarAnimate(false);
      setBar(measure(Math.max(activeIndex, 0)));
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

  /* лінія слідує за курсором */
  useLayoutEffect(() => {
    if (!isMenuOpen || !barReady.current) return;
    const wasHidden = prevTarget.current < 0;
    prevTarget.current = target;
    if (target < 0) return; // лінія просто плавно зникає, позицію не чіпаємо
    const next = measure(target);
    if (!next) return;
    if (wasHidden) {
      /* лінія була прихована — з'являється одразу під пунктом, без доїжджання з іншого місця */
      setBarAnimate(false);
      setBar(next);
      requestAnimationFrame(() => requestAnimationFrame(() => setBarAnimate(true)));
    } else {
      setBarAnimate(true);
      setBar(next);
    }
  }, [target]);

  /* перерахунок при зміні розміру вікна */
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

  /* єдине місце, де меню відкривається/закривається. це якраз кнопка гамбургера */
  const toggleMenu = () => {
    setAnimateIn(true);
    setHover(null);
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
      sessionStorage.setItem(BAR_KEY, String(i));
    } catch {
      /* ігнор */
    }
  };

  const fadeIn = (delayMs = 0): React.CSSProperties =>
    animateIn
      ? { animation: `hdr-in ${FADE_MS}ms ${EASE} ${delayMs}ms backwards` }
      : {};

  return (
    <header
      className="w-full box-border shadow-md overflow-hidden"
      style={{
        height: px(200),
        backgroundColor: MINT,
        borderBottomLeftRadius: px(72),
        borderBottomRightRadius: px(72),
        padding: `${px(28)}px ${px(28)}px ${px(36)}px`,
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

      {/* однаковий контейнер в обох станах: розмір і позиції іконок не змінюються
          фон капсули плавно загоряється зеленим */}
      <div
        className="hdr-anim h-full flex items-center justify-between"
        onMouseLeave={() => setHover(null)}
        style={{
          gap: px(16),
          padding: `0 ${px(36)}px`,
          borderRadius: px(56),
          backgroundColor: isMenuOpen ? GREEN : 'rgba(16, 139, 107, 0)',
          transition: `background-color ${COLOR_MS}ms ${EASE}`,
        }}
      >
        {!isMenuOpen ? (
          <a
            href="/"
            className="flex items-center min-w-0 hover:opacity-90 transition-opacity"
            style={{ gap: px(24), ...fadeIn() }}
          >
            <img
              src={LOGO_SRC}
              alt="Логотип ОСМ"
              className="shrink-0 object-contain"
              style={{ height: 72, width: 'auto', maxWidth: 200 }}
            />
            <div
              className="font-unbounded font-bold whitespace-nowrap"
              style={{ color: DARK, fontSize: 24, lineHeight: 1.2 }}
            >
              <div>Офіційна сторінка ОСМ (ОСС)</div>
              <div>ВСП “ХКТФК НТУ “ХПІ”</div>
            </div>
          </a>
        ) : (
          <nav
            className="relative self-stretch flex-1 min-w-0 flex items-center justify-between overflow-x-auto font-unbounded font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              gap: px(12),
              fontSize: 'min(22px, 1.3vw)',
              lineHeight: 1.15,
              /* відступи, щоб лінія першого й останнього пунктів не обрізалась краєм меню */
              paddingLeft: BAR_EXTRA,
              paddingRight: BAR_EXTRA,
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={item.href}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => onItemClick(i)}
                className="whitespace-nowrap"
                style={{
                  color: i === target ? DARK : '#FFFFFF',
                  fontWeight: 600,
                  transition: `color ${BAR_MS}ms ${EASE}`,
                  ...fadeIn(i * 20),
                }}
              >
                <span className="block">{item.lines[0]}</span>
                <span className="block">{item.lines[1]}</span>
              </a>
            ))}

            {/* лінія, що плавно іде за курсором */}
            {bar && (
              <span
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  left: bar.left,
                  top: bar.top,
                  width: bar.width,
                  height: BAR_THICKNESS,
                  borderRadius: 999,
                  backgroundColor: DARK,
                  opacity: target >= 0 ? 1 : 0,
                  transition: barAnimate
                    ? `left ${BAR_MS}ms ${EASE}, width ${BAR_MS}ms ${EASE}, opacity ${BAR_MS}ms ${EASE}`
                    : `opacity ${BAR_MS}ms ${EASE}`,
                }}
              />
            )}
          </nav>
        )}

        <div
          className="flex items-center shrink-0"
          style={{ gap: px(16) }}
          onMouseEnter={() => setHover(null)}
        >
          <a href="/profile" className="hover:opacity-80 transition-opacity" aria-label="Профіль">
            <ProfileIcon color={isMenuOpen ? '#FFFFFF' : GREEN} />
          </a>
          <button
            onClick={toggleMenu}
            className="hover:opacity-80 transition-opacity"
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
          >
            <BurgerIcon color={isMenuOpen ? '#FFFFFF' : GREEN} />
          </button>
        </div>
      </div>
    </header>
  );
};
