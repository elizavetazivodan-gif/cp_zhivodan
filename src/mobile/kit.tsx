import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../theme';
import cat from '../assets/cat-exclamation.png';

export const GREEN = '#108B6B';
export const DARK = '#094036';
export const MINT = '#ECFDF5';
export const NIGHT = '#06231C';

export const UNBOUNDED = "'Unbounded', sans-serif";
export const ONEST = "'Onest', 'Manrope', system-ui, sans-serif";
export const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@400;500;700&display=swap');`;

export const useDark = () => useTheme()[0];

/* базові стилі тексту */
export const hStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: UNBOUNDED,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: 1.3,
};
export const pStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: ONEST,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.5,
};
export const smallUnb: React.CSSProperties = {
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.5,
};


/* плавна поява блоків при прокручуванні */
const REVEAL_MS = 220; // як у хедері (FADE_MS)
const REVEAL_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const all = Array.from(root.querySelectorAll(':scope > *, [data-reveal]')) as HTMLElement[];
    /* контейнери, всередині яких є свої data-reveal, не анімуємо: їх анімують діти */
    const els = all.filter((el: HTMLElement) => el.hasAttribute('data-reveal') || !el.querySelector('[data-reveal]'));

    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity ${REVEAL_MS}ms ${REVEAL_EASE}, transform ${REVEAL_MS}ms ${REVEAL_EASE}`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(n, 4) * 40}ms`;
          el.style.opacity = '1';
          el.style.transform = 'none';
          n += 1;
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      els.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
        el.style.transitionDelay = '';
      });
    };
  }, [ref]);
}

/* каркас сторінки: зелений фон, перемикач теми, м'ята панель */
export function MPage({ children, overlap }: { children: React.ReactNode; overlap?: boolean }) {
  const [dark, toggle] = useTheme();
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);
  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{FONTS}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 0 18px' }}>
        <span style={{ fontFamily: OPEN_SANS, fontWeight: 700, fontSize: 16, lineHeight: 1, color: MINT }}>
          Темна тема
        </span>
        <button
          onClick={() => toggle()}
          role="switch"
          aria-checked={dark}
          aria-label="Темна тема"
          style={{
            position: 'relative',
            width: 72,
            height: 34,
            borderRadius: 9999,
            backgroundColor: MINT,
            border: 0,
            padding: 0,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 4,
              left: dark ? 72 - 6 - 34 : 6,
              width: 34,
              height: 26,
              borderRadius: 9999,
              backgroundColor: DARK,
              transition: 'left 220ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </button>
      </div>

      <main
        ref={mainRef}
        style={{
          backgroundColor: dark ? NIGHT : MINT,
          color: dark ? MINT : DARK,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          padding: '28px 16px 40px',
          overflow: overlap ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        {children}
      </main>
    </div>
  );
}

/* зелена плашка-заголовок розділу (як у макеті: великі літери, стадіон) */
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: 0,
        backgroundColor: GREEN,
        color: MINT,
        borderRadius: 9999,
        padding: '14px 22px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: UNBOUNDED,
        fontWeight: 700,
        fontSize: 21,
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  );
}

/* кнопка / посилання-кнопка на всю ширину */
export function Btn({
  children,
  onClick,
  href,
  green,
  inline,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  green?: boolean;
  inline?: boolean;
}) {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: inline ? 'auto' : '100%',
    alignSelf: inline ? 'flex-start' : undefined,
    minWidth: inline ? 190 : undefined,
    minHeight: 52,
    padding: '10px 26px',
    borderRadius: 9999,
    border: 0,
    backgroundColor: green ? GREEN : DARK,
    color: MINT,
    fontFamily: UNBOUNDED,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.3,
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

/* фото в зеленій заокругленій рамці */
export function Frame({ src, alt, ratio = '4 / 3', href }: { src: string; alt: string; ratio?: string; href?: string }) {
  const box = (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        aspectRatio: ratio,
        border: `4px solid ${GREEN}`,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%' }}>
      {box}
    </a>
  ) : (
    box
  );
}

/* фото внизу сторінки з м'яким розчиненням зверху; виходить за поля панелі */
export function Hero({ src, height = 220 }: { src: string; height?: number }) {
  const mask = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 35%, #000 85%)';
  return (
    <div style={{ margin: '0 -16px -40px', height }}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
}

/* радіо-рядок: вся смужка клікабельна */
export function RadioRow({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '4px 0',
        border: 0,
        background: 'none',
        color: 'inherit',
        textAlign: 'left',
        cursor: 'pointer',
        ...smallUnb,
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          flexShrink: 0,
          borderRadius: '50%',
          backgroundColor: MINT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: GREEN }} />}
      </span>
      <span>{label}</span>
    </button>
  );
}

/* поле вводу */
export const inputStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  height: 48,
  borderRadius: 9999,
  border: 0,
  outline: 'none',
  backgroundColor: MINT,
  color: DARK,
  padding: '0 20px',
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: 16,
};

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ ...smallUnb, fontSize: 13 }}>{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </label>
  );
}

/* спільна мобільна форма реєстрації (поверх сторінки) */
export function MobileRegistrationModal({
  title,
  confirmText,
  thanks,
  onClose,
}: {
  title: string;
  confirmText: string;
  thanks: string;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const canSubmit = name.trim() !== '' && group.trim() !== '' && phone.trim() !== '' && confirmed;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(6, 35, 28, 0.6)',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '16px 12px 32px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <h2
          style={{
            margin: 0,
            backgroundColor: GREEN,
            color: MINT,
            borderRadius: 28,
            padding: '16px 18px',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h2>

        <div style={{ position: 'relative', backgroundColor: DARK, color: MINT, borderRadius: 28, padding: '56px 16px 22px' }}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 0,
              backgroundColor: MINT,
              color: DARK,
              cursor: 'pointer',
              fontFamily: UNBOUNDED,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canSubmit) setSent(true);
            }}
          >
            <fieldset
              disabled={sent}
              style={{ border: 0, margin: 0, padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16, opacity: sent ? 0.6 : 1 }}
            >
              <Field label="ПІБ для реєстрації" value={name} onChange={setName} />
              <Field label="Назва групи у форматі “ХХХ-ХХХ”" value={group} onChange={setGroup} />
              <Field label="Номер телефону для зворотного зв’язку" type="tel" value={phone} onChange={setPhone} />

              <button
                type="button"
                role="checkbox"
                aria-checked={confirmed}
                onClick={() => setConfirmed((c) => !c)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px',
                  borderRadius: 24,
                  border: 0,
                  backgroundColor: MINT,
                  color: DARK,
                  textAlign: 'left',
                  cursor: 'pointer',
                  ...smallUnb,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    boxSizing: 'border-box',
                    border: `3px solid ${GREEN}`,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {confirmed && <span style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: GREEN }} />}
                </span>
                <span>{confirmText}</span>
              </button>

              {!sent && (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    alignSelf: 'center',
                    width: '100%',
                    maxWidth: 260,
                    height: 52,
                    borderRadius: 9999,
                    border: 0,
                    backgroundColor: GREEN,
                    color: MINT,
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    opacity: canSubmit ? 1 : 0.5,
                    fontFamily: UNBOUNDED,
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  НАДІСЛАТИ
                </button>
              )}
            </fieldset>
          </form>
        </div>

        {sent && (
          <>
            <p style={{ margin: 0, padding: '4px 8px', textAlign: 'center', fontFamily: UNBOUNDED, fontWeight: 700, fontSize: 16, lineHeight: 1.45, color: MINT }}>
              {thanks}
            </p>
            <img src={cat} alt="Котик зі знаком оклику" style={{ width: 180, alignSelf: 'center', objectFit: 'contain' }} />
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

/* кінцівка форм «Дякуємо» з котиком (для сторінок без модалки) */
export function ThanksCat({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <p style={{ margin: 0, textAlign: 'center', fontFamily: UNBOUNDED, fontWeight: 700, fontSize: 16, lineHeight: 1.45 }}>{children}</p>
      <img src={cat} alt="Котик зі знаком оклику" style={{ width: 180, objectFit: 'contain' }} />
    </div>
  );
}


/* елементи, що повторюють макет */

/* овальне фото із зеленим півмісяцем збоку (геометрія як на десктопі) */
export function OvalPhoto({
  src,
  alt,
  align,
  greenW,
  photoW,
}: {
  src: string;
  alt: string;
  align: 'left' | 'right';
  greenW: number;
  photoW: number;
}) {
  const side: React.CSSProperties = align === 'left' ? { left: 0 } : { right: 0 };
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: `${greenW} / 424` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: GREEN }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: `${(photoW / greenW) * 100}%`,
          ...side,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
  );
}

/* смужка соцмереж: зелена капсула, пігулки на всю її висоту (як у макеті) */
export function SocialBar({ links }: { links: { instagram: string; youtube: string; tiktok: string } }) {
  const pill = (href: string, label: string, bg: string, glyph: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 'min(82px, 25vw)',
        alignSelf: 'stretch',
        borderRadius: 9999,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {glyph}
    </a>
  );
  return (
    <div
      style={{
        height: 58,
        borderRadius: 9999,
        backgroundColor: GREEN,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 'min(22px, 5vw)',
      }}
    >
      {pill(
        links.instagram,
        'Instagram',
        DARK,
        <svg viewBox="0 0 56 56" aria-hidden="true" style={{ width: 40, height: 40 }}>
          <rect width="56" height="56" rx="14" fill={MINT} />
          <circle cx="28" cy="28" r="11" fill="none" stroke={DARK} strokeWidth="5" />
          <circle cx="43" cy="13" r="3.2" fill={DARK} />
        </svg>
      )}
      {pill(
        links.youtube,
        'YouTube',
        MINT,
        <svg viewBox="0 0 71 50" aria-hidden="true" style={{ width: 50, height: 35 }}>
          <rect width="71" height="50" rx="15" fill={DARK} />
          <path d="M28 14.5v21L46.5 25z" fill={MINT} />
        </svg>
      )}
      {pill(
        links.tiktok,
        'TikTok',
        DARK,
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 38, height: 38 }}>
          <path
            fill={MINT}
            d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.76.15-3.58 1.15-5.09 1.25-1.9 3.42-3.13 5.73-3.23l.03 4.17c-1.34.02-2.58.74-3.26 1.88-.34.56-.54 1.23-.55 1.89-.01 1.05.41 2.08 1.16 2.82.91.9 2.29 1.28 3.56.96 1.26-.31 2.29-1.28 2.65-2.54.17-.61.22-1.25.21-1.88-.04-4.83-.01-9.67-.03-14.5z"
          />
        </svg>
      )}
    </div>
  );
}

/* Telegram-плашка: темна капсула із зеленою капсулою всередині */
export function TgTag({ text, link }: { text: string; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Telegram: ${text}`}
      style={{ position: 'relative', display: 'block', height: 34, borderRadius: 9999, backgroundColor: DARK, textDecoration: 'none' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '17%',
          right: 0,
          borderRadius: 9999,
          backgroundColor: GREEN,
          color: MINT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: UNBOUNDED,
          fontWeight: 500,
          fontSize: 10,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {text}
      </div>
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ position: 'absolute', left: '3%', top: 6, width: 22, height: 22 }}>
        <path fill={MINT} d="M21.9 2.6 1.8 10.4c-.8.3-.8 1.4 0 1.6l5 1.6 1.9 5.9c.2.6 1 .8 1.4.3l2.8-2.6 5 3.7c.6.4 1.4.1 1.6-.6l3.3-16.2c.2-.8-.5-1.4-1.2-1.1zM8.4 13.1l9.6-6-7.4 7.2-.3 3.3z" />
      </svg>
    </a>
  );
}
