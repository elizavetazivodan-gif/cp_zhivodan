import React, { useState } from 'react';

import event1 from '../assets/event1.jpg'; // актуальні події (1) - новий рік
import event2 from '../assets/event2.jpg'; // актуальні події (2) - день програміста
import archive1 from '../assets/archive1.jpg'; // архів (1) - турнір з шахів та шашок
import archive2 from '../assets/archive2.jpg'; // архів (2) - день закоханих
import hero from '../assets/hero.png'; // фото внизу сторінки (ліза і ділан ведучі)

const GREEN = '#108B6B';
const DARK = '#094036';
const MINT = '#ECFDF5';
const NIGHT = '#06231C';

const UNBOUNDED = "'Unbounded', sans-serif";
const ONEST = "'Onest', 'Manrope', system-ui, sans-serif";
const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

/* усі розміри  у пікселях макета шириною 1440p
   u() перетворює їх у vw, тож сторінка масштабується пропорційно і виглядає як макет на будь-якому екрані*/
const u = (n: number) => `${((n / 1440) * 100).toFixed(4)}vw`;

/* розмір тексту */
const TEXT_SCALE = 0.9;
const f = (n: number) => u(n * TEXT_SCALE);

/* фото внизу з лізою і діланом. true - м'яке розчинення зверху */
const HERO_FADE = true;

export default function Events() {
  const [dark, setDark] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      {/* підключення шрифтів */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@500;700&display=swap');
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
          height: u(2500),
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        {/* фото внизу сторінки */}
        <div style={{ position: 'absolute', left: 0, top: u(2025), width: '100%', height: u(475) }}>
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

        {/* актуальні події */}
        <SectionPill x={199} y={35}>
          Актуальні події
        </SectionPill>

        {/* подія 1 */}
        <EventFrame src={event1} alt="Святкування Нового року" x={57} y={189} />
        <h3 style={{ ...abs(535, 180.5), ...eventTitle }}>
          <Line>Святкування Нового року у</Line>
          <Line>бомбосховищі НТУ “ХПІ”</Line>
        </h3>
        <div style={{ ...abs(535, 276.5), ...bodyStyle }}>
          <Line>
            <B>29 грудня о 14:00</B> відбудеться святкування Нового року.
          </Line>
          <Line>На вас чекає новорічна атмосфера, музика, цікаві</Line>
          <Line>конкурси, розваги, спілкування та святковий настрій.</Line>
          <Line>Давайте разом створимо теплі спогади та зустрінемо</Line>
          <Line>Новий рік яскраво! 🎄✨</Line>
        </div>
        <JoinButton x={535} y={431} />

        {/* подія 2 */}
        <EventFrame src={event2} alt="Святкування Дня програміста" x={64} y={571} />
        <h3 style={{ ...abs(546, 544), ...eventTitle }}>
          <Line>Святкування Дня програміста у</Line>
          <Line>бомбосховищі НТУ “ХПІ”</Line>
        </h3>
        <div style={{ ...abs(546, 641.5), ...bodyStyle }}>
          <Line>
            <B>7 січня о 12:00</B> відбудеться святкування
          </Line>
          <Line>Дня програміста! 💻</Line>
          <Line>На вас чекають командні змагання, веселі конкурси та</Line>
          <Line>можливість перевірити свої навички програмування.</Line>
          <Line>Долучайтеся, щоб весело провести час та відчути</Line>
          <Line>справжню атмосферу ІТ! 🚀</Line>
        </div>
        <JoinButton x={542} y={827} />

        {/* архів подій */}
        <SectionPill x={191} y={959}>
          Архів подій
        </SectionPill>

        {/* архів 1: текст зліва, фото справа */}
        <h3 style={{ ...abs(56, 1183), ...eventTitle }}>
          <Line>Турнір з шахів та шашок</Line>
          <Line>у бомбосховищі НТУ “ХПІ”</Line>
        </h3>
        <div style={{ ...abs(56, 1281), ...bodyStyle }}>
          <Line>
            <B>6 грудня 2025 року об 11:00</B> з нагоди Дня Збройних Сил
          </Line>
          <Line>України в коледжі відбувся патріотичний захід і турнір із шахів</Line>
          <Line>та шашок «Шаховий фронт». Учасники продемонстрували силу</Line>
          <Line>розуму та командний дух.</Line>
          <Line>Дякуємо Збройним Силам України за захист!</Line>
        </div>
        <OvalPhoto src={archive1} alt="Турнір з шахів та шашок" x={823} y={1096} greenW={513} photoW={476} h={424} photoAlign="left" />

        {/* архів 2: фото зліва, текст справа */}
        <OvalPhoto src={archive2} alt="Святкування Дня Закоханих" x={99} y={1490} greenW={519} photoW={478} h={424} photoAlign="right" />
        <h3 style={{ ...abs(668, 1589), ...eventTitle }}>
          <Line>Святкування Дня Закоханих</Line>
          <Line>у бомбосховищі НТУ “ХПІ”</Line>
        </h3>
        <div style={{ ...abs(668, 1687), ...bodyStyle }}>
          <Line>
            <B>14 лютого 2025 року о 12:00</B> студенти нашого коледжу
          </Line>
          <Line>вперше за 3 роки відсвяткували День закоханих!</Line>
          <Line>На учасників чекали цікаві активності, нетворкінг,</Line>
          <Line>валентинки та солодощі. Дякуємо всім, хто долучився</Line>
          <Line>до організації та створив святкову атмосферу 🥰</Line>
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
  fontWeight: 700,
  fontSize: f(32),
  lineHeight: u(40),
};

const bodyStyle: React.CSSProperties = {
  fontFamily: ONEST,
  fontWeight: 400,
  fontSize: f(24),
  lineHeight: u(29),
};

/* один рядок тексту — переноси мають збігатися із моїм макетом */
const Line: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{children}</span>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <b style={{ fontWeight: 700 }}>{children}</b>
);

/* зелена плашка-заголовок розділу */
function SectionPill({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <h2
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(1057),
        height: u(82),
        margin: 0,
        borderRadius: 9999,
        backgroundColor: GREEN,
        color: MINT,
        fontFamily: UNBOUNDED,
        fontWeight: 700,
        fontSize: f(48),
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </h2>
  );
}

/* фото події в заокругленій зеленій рамці */
function EventFrame({ src, alt, x, y }: { src: string; alt: string; x: number; y: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(448),
        height: u(336),
        boxSizing: 'border-box',
        border: `${u(10)} solid ${GREEN}`,
        borderRadius: u(76),
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* тут фото */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

/* темна кнопка «Долучитися» */
function JoinButton({ x, y }: { x: number; y: number }) {
  return (
    <button
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(281),
        height: u(70),
        borderRadius: 9999,
        backgroundColor: DARK,
        color: MINT,
        border: 0,
        cursor: 'pointer',
        fontFamily: UNBOUNDED,
        fontWeight: 500,
        fontSize: f(24),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Долучитися
    </button>
  );
}

/* овальне фото із зеленим півмісяцем збоку (два еліпси однакової висоти) */
function OvalPhoto({
  src,
  alt,
  x,
  y,
  greenW,
  photoW,
  h,
  photoAlign,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  greenW: number;
  photoW: number;
  h: number;
  photoAlign: 'left' | 'right';
}) {
  return (
    <div style={{ position: 'absolute', left: u(x), top: u(y), width: u(greenW), height: u(h) }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: GREEN }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: u(h),
          width: u(photoW),
          [photoAlign]: 0,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {/* тут фото */}
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  );
}