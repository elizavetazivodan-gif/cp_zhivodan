import React, { useState } from 'react';

import cat from '../assets/cat-notebook.png'; 
import doc1 from '../assets/doc-statut.jpg'; 
import doc2 from '../assets/doc-polozhennya.jpg'; 
import hero from '../assets/team-selfie.jpg'; 

const DOCS_URL = 'https://khctcollege-my.sharepoint.com/personal/a_zalevska_ct-college_net/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fa%5Fzalevska%5Fct%2Dcollege%5Fnet%2FDocuments%2F%D0%A1%D0%A2%D0%A3%D0%94%D0%95%D0%9D%D0%A2%D0%A1%D0%AC%D0%9A%D0%95%20%D0%A1%D0%90%D0%9C%D0%9E%D0%92%D0%A0%D0%AF%D0%94%D0%A3%D0%92%D0%90%D0%9D%D0%9D%D0%AF%2F2026%2D2027%20%D0%BD%2D%D1%80%2F%D0%9F%D0%A0%D0%9E%D0%A2%D0%9E%D0%9A%D0%9E%D0%9B%D0%98%20%D0%97%D0%90%D0%A1%D0%86%D0%94%D0%90%D0%9D%D0%AC&ga=1&share=cgrmDt5dKHihQ639jez0zjNlEgUCYPFi%5F8OM1CDveZ%2DqrmAKgQ&lpmkr=FdC8YoDNE4Y';
const STATUT_URL = 'https://drive.google.com/file/d/1ZPFmnPdSd4GdGKle0b1jmsOcphsaCgFD/view?usp=sharing';
const POLOZHENNYA_URL = 'https://drive.google.com/file/d/1HN9VFsyrTwblb6l-F6agmNBfsRgeWO1e/view?usp=sharing';

const GREEN = '#108B6B';
const DARK = '#094036';
const MINT = '#ECFDF5';
const NIGHT = '#06231C';

const UNBOUNDED = "'Unbounded', sans-serif";
const ONEST = "'Onest', 'Manrope', system-ui, sans-serif";
const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

const u = (n: number) => `${((n / 1440) * 100).toFixed(4)}vw`;

const TEXT_SCALE = 0.9;
const f = (n: number) => u(n * TEXT_SCALE);

const HERO_FADE = true;

export default function Documents() {
  const [dark, setDark] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      {/* підключення шрифтів*/}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@400;500;700&display=swap');
      `}</style>

      {/* перемикач теми на зеленому фоні */}
      <div style={{ position: 'relative', height: u(122) }}>
        <div
          style={{
            position: 'absolute',
            top: u(40),
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: u(14),
            transform: `translateX(${u(-1.5)})`,
          }}
        >
          <span
            style={{
              fontFamily: OPEN_SANS,
              fontWeight: 700,
              fontSize: u(20),
              lineHeight: 1,
              color: MINT,
              whiteSpace: 'nowrap',
            }}
          >
            Темна тема
          </span>
          <button
            onClick={() => setDark((d) => !d)}
            role="switch"
            aria-checked={dark}
            aria-label="Темна тема"
            style={{
              position: 'relative',
              width: u(119),
              height: u(42),
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
                top: u(5.5),
                left: dark ? u(119 - 8 - 54) : u(8),
                width: u(54),
                height: u(31),
                borderRadius: 9999,
                backgroundColor: DARK,
                transition: 'left 220ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </button>
        </div>
      </div>

      {/* мʼятна панель із заокругленими верхніми краями*/}
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: u(1860),
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        {/*фото внизу сторінки*/}
        <div style={{ position: 'absolute', left: 0, top: u(960), width: '100%', height: u(900) }}>
          <img
            src={hero}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              ...(HERO_FADE
                ? {
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 35%, #000 85%)',
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 35%, #000 85%)',
                  }
                : {}),
            }}
          />
        </div>

        {/*заголовок і кнопка*/}
        <h1 style={{ ...abs(82, 54), ...eventTitle }}>
          <Line>Наша діяльність здійснюється згідно до ст.</Line>
          <Line>41 Закону Про фахову перед вищу освіту</Line>
        </h1>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            left: u(965),
            top: u(50),
            width: u(415),
            height: u(86),
            borderRadius: u(43),
            backgroundColor: DARK,
            color: MINT,
            border: 0,
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: UNBOUNDED,
            fontWeight: 500,
            fontSize: f(24),
            lineHeight: u(29),
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>Переглянути</span>
          <span>документообіг і звітність</span>
        </a>

        {/* котик із зошитом */}
        <img
          src={cat}
          alt="Котик із зошитом"
          style={{ position: 'absolute', left: u(108), top: u(167), width: u(316), height: u(358), objectFit: 'contain', display: 'block' }}
        />

        {/* ===== Нормативні документи ===== */}
        <div style={{ ...abs(108, 549.5), ...docText }}>
          <Line>Також ми працюємо згідно до</Line>
          <Line>нормативно-правових</Line>
          <Line>документів:</Line>
          <Item n="1." href={STATUT_URL}>
            <Line>Статут Організації</Line>
            <Line>студентського</Line>
            <Line>самоврядування у ВСП</Line>
            <Line>“ХКТФК НТУ “ХПІ”</Line>
          </Item>
          <Item n="2." href={POLOZHENNYA_URL}>
            <Line>Положення про студентське</Line>
            <Line>самоврядування у ВСП</Line>
            <Line>“ХКТФК НТУ “ХПІ”</Line>
          </Item>
        </div>

        {/*фото документів */}
        <DocFrame src={doc1} alt="Статут ОСС" x={554} y={202} href={STATUT_URL} />
        <DocFrame src={doc2} alt="Положення про ОСС" x={1000} y={202} href={POLOZHENNYA_URL} />
        <p style={{ ...abs(554, 839), ...caption }}>Статут ОСС</p>
        <p style={{ ...abs(1000, 839), ...caption }}>Положення про ОСС</p>
      </main>
    </div>
  );
}

/* допоміжні стилі та дрібні компоненти */

const abs = (x: number, y: number): React.CSSProperties => ({
  position: 'absolute',
  left: u(x),
  top: u(y),
});

const eventTitle: React.CSSProperties = {
  margin: 0,
  fontFamily: UNBOUNDED,
  fontWeight: 500,
  fontSize: f(32),
  lineHeight: u(41),
};

const bodyStyle: React.CSSProperties = {
  fontFamily: ONEST,
  fontWeight: 400,
  fontSize: f(24),
  lineHeight: u(29),
};

const Line: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{children}</span>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <b style={{ fontWeight: 700 }}>{children}</b>
);


const docText: React.CSSProperties = {
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: f(24),
  lineHeight: u(29),
};

const caption: React.CSSProperties = {
  width: u(420),
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  fontFamily: UNBOUNDED,
  fontWeight: 500,
  fontSize: f(32),
  lineHeight: u(40),
};

/* пункт нумерованого списку: номер зліва, рядки тексту з відступом */
const Item: React.FC<{ n: string; href: string; children: React.ReactNode }> = ({ n, href, children }) => (
  <div style={{ position: 'relative', paddingLeft: u(37) }}>
    <span style={{ position: 'absolute', left: 0, top: 0 }}>{n}</span>
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
      {children}
    </a>
  </div>
);

/* фото документа в заокругленій зеленій рамці */
function DocFrame({ src, alt, x, y, href }: { src: string; alt: string; x: number; y: number; href: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(420),
        height: u(619),
        boxSizing: 'border-box',
        border: `${u(10)} solid ${GREEN}`,
        borderRadius: u(60),
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* тут фото */}
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </a>
    </div>
  );
}
