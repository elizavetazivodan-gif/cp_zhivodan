import React, { useState } from 'react';
import cat from '../assets/cat-helmet.png'; 

const GREEN = '#108B6B';
const DARK = '#094036';
const MINT = '#ECFDF5';
const NIGHT = '#06231C';

const UNBOUNDED = "'Unbounded', sans-serif";
const ONEST = "'Onest', 'Manrope', system-ui, sans-serif";
const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

/* усі розміри нижче — у пікселях макета шириною 1440px
   u() перетворює їх у vw, тож сторінка масштабується пропорційно і виглядає як макет на будь-якому екрані */
const u = (n: number) => `${((n / 1440) * 100).toFixed(4)}vw`;

/* розмір тексту */
const TEXT_SCALE = 0.9;
const f = (n: number) => u(n * TEXT_SCALE);

/* Фото внизу: true - м'який перехід зверху */
const HERO_FADE = true;


/* збільшення котика */
const CAT_ZOOM = 1;

export default function Account() {
  const [dark, setDark] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      {/* підключення шрифтів */}
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

      {/* мʼятна панель із заокругленими верхніми краями */}
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: u(691),
          backgroundColor: panelBg,
          color: textColor,
          transition: 'background-color 220ms ease, color 220ms ease',
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
        }}
      >
        {/* котик у касці з викруткою */}
        <img
          src={cat}
          alt="Котик у касці з викруткою"
          style={{
            position: 'absolute',
            left: u(75),
            top: u(52),
            width: u(485),
            height: u(592),
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
            transform: `scale(${CAT_ZOOM})`,
            transformOrigin: 'center',
          }}
        />

        {/* ОЙ! */}
        <h1
          style={{
            position: 'absolute',
            left: u(670),
            top: u(128),
            width: u(202),
            height: u(82),
            margin: 0,
            borderRadius: 9999,
            backgroundColor: GREEN,
            color: MINT,
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: f(48),
            lineHeight: 1,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ОЙ!
        </h1>

        {/* повідомлення */}
        <div
          style={{
            position: 'absolute',
            left: u(623),
            top: u(247),
            width: u(685),
            height: u(291),
            boxSizing: 'border-box',
            borderRadius: u(80),
            backgroundColor: GREEN,
            color: MINT,
          }}
        >
          <div
            style={{
              ...abs(48, 31.5),
              fontFamily: UNBOUNDED,
              fontWeight: 500,
              fontSize: f(40),
              lineHeight: u(45),
            }}
          >
            <Line>Вхід тимчасово</Line>
            <Line>недоступний... Ця функція</Line>
            <Line>буде розблокована для</Line>
            <Line>презентації дипломного</Line>
            <Line>проєкту!</Line>
          </div>
        </div>
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
