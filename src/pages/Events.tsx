import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg'; 
import archive1 from '../assets/archive1.jpg'; 
import archive2 from '../assets/archive2.jpg'; 
import hero from '../assets/hero.png'; 
import cat from '../assets/cat-exclamation.png'; 

const GREEN = '#108B6B';
const DARK = '#094036';
const MINT = '#ECFDF5';
const NIGHT = '#06231C';

const UNBOUNDED = "'Unbounded', sans-serif";
const ONEST = "'Onest', 'Manrope', system-ui, sans-serif";
const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

const u = (n: number) => `${((n / 1440) * 100).toFixed(4)}vw`;

/* розмір тексту */
const TEXT_SCALE = 0.9;
const f = (n: number) => u(n * TEXT_SCALE);

/* фото внизу з лізою і діланом. true - м'яке розчинення зверху */
const HERO_FADE = true;

/* назви подій для форм реєстрації */
const EVENTS = [
  { name: 'Святкування Нового року' },
  { name: 'Святкування Дня програміста' },
];

export default function Events() {
  const [dark, setDark] = useState(false);
  /* індекс події, для якої відкрита форма реєстрації (null - закрита) */
  const [openEvent, setOpenEvent] = useState<number | null>(null);
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
        <JoinButton x={535} y={431} onClick={() => setOpenEvent(0)} />

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
        <JoinButton x={542} y={827} onClick={() => setOpenEvent(1)} />

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

      {openEvent !== null && (
        <RegistrationModal key={openEvent} eventIndex={openEvent} onClose={() => setOpenEvent(null)} />
      )}
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

/* темна кнопка «Долучитися» - відкриває форму реєстрації на цю подію */
function JoinButton({ x, y, onClick }: { x: number; y: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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

/* вспливаюча форма реєстрації на подію (окрема для кожної кнопки) */
function RegistrationModal({ eventIndex, onClose }: { eventIndex: number; onClose: () => void }) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const eventName = EVENTS[eventIndex].name;
  /* кнопка «НАДІСЛАТИ» активна, коли заповнені всі поля і натиснута плашка підтвердження */
  const canSubmit = name.trim() !== '' && group.trim() !== '' && phone.trim() !== '' && confirmed;

  /* закриття клавішею Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    (    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(6, 35, 28, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        scrollbarGutter: 'stable',
        padding: `${u(40)} ${u(16)} ${u(40)}`,
      }}
    >
      {/* котик у лівій частині екрану — з'являється лише після надсилання */}
      {sent && (
        <img
          src={cat}
          alt="Котик зі знаком оклику"
          style={{
            position: 'fixed',
            left: u(-200),
            bottom: u(0),
            width: u(660),
            height: u(880),
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          margin: '0 auto',
          width: `min(${u(900)}, calc(100vw - 32px))`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: u(18),
        }}
      >
        {/* перший прямокутник: заголовок */}
        <h2
          style={{
            margin: 0,
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: u(70),
            backgroundColor: GREEN,
            color: MINT,
            padding: `${u(14)} ${u(28)}`,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: f(24),
            lineHeight: u(32),
          }}
        >
          Форма реєстрації на «{eventName}»
        </h2>

        {/* другий прямокутник: поля форми */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: u(60),
            backgroundColor: DARK,
            color: MINT,
            padding: `${u(26)} ${u(44)} ${u(22)}`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            style={{
              position: 'absolute',
              top: u(22),
              right: u(22),
              width: u(34),
              height: u(34),
              borderRadius: '50%',
              border: 0,
              backgroundColor: MINT,
              color: DARK,
              cursor: 'pointer',
              fontFamily: UNBOUNDED,
              fontSize: f(14),
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
            style={{ display: 'flex', flexDirection: 'column', gap: u(14) }}
          >
            <fieldset
              disabled={sent}
              style={{ border: 0, margin: 0, padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: u(14), opacity: sent ? 0.6 : 1 }}
            >
            <Field label="ПІБ для реєстрації" name="fullName" value={name} onChange={setName} />
            <Field label="Назва групи у форматі “ХХХ-ХХХ”" name="group" value={group} onChange={setGroup} />
            <Field label="Номер телефону для зворотного зв’язку" name="phone" type="tel" value={phone} onChange={setPhone} />

            {/* плашка підтвердження */}
              <button
                type="button"
                role="checkbox"
                aria-checked={confirmed}
                onClick={() => setConfirmed((c) => !c)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: u(20),
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: `${u(10)} ${u(20)}`,
                  borderRadius: u(40),
                  border: 0,
                  backgroundColor: MINT,
                  color: DARK,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: UNBOUNDED,
                  fontWeight: 400,
                  fontSize: f(22),
                  lineHeight: u(30),
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: u(44),
                    height: u(44),
                    borderRadius: '50%',
                    boxSizing: 'border-box',
                    border: `${u(4)} solid ${GREEN}`,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {confirmed && <span style={{ width: u(22), height: u(22), borderRadius: '50%', backgroundColor: GREEN }} />}
                </span>
                <span>Я підтверджую надсилання своєї реєстраційної форми на подію «{eventName}»</span>
              </button>

            {!sent && (
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  alignSelf: 'center',
                  width: u(260),
                  height: u(64),
                  borderRadius: 9999,
                  border: 0,
                  backgroundColor: GREEN,
                  color: MINT,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.5,
                  fontFamily: UNBOUNDED,
                  fontWeight: 500,
                  fontSize: f(28),
                  whiteSpace: 'nowrap',
                }}
              >
                НАДІСЛАТИ
              </button>
            )}
            </fieldset>
          </form>
        </div>

        {sent && (
          <p
            style={{
              margin: 0,
              padding: `0 ${u(40)}`,
              textAlign: 'center',
              fontFamily: UNBOUNDED,
              fontWeight: 700,
              fontSize: f(34),
              lineHeight: u(42),
              color: MINT,
            }}
          >
            Дякуємо за реєстрацію! Незабаром твою форму обов’язково опрацює адміністратор
          </p>
        )}

      </div>
    </div>
    ),
    document.body
  );
}

/* поле вводу з підписом */
function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: u(12) }}>
      <span style={{ fontFamily: UNBOUNDED, fontWeight: 400, fontSize: f(22), lineHeight: u(30) }}>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          height: u(44),
          borderRadius: 9999,
          border: 0,
          outline: 'none',
          backgroundColor: MINT,
          color: DARK,
          padding: `0 ${u(32)}`,
          fontFamily: UNBOUNDED,
          fontWeight: 400,
          fontSize: f(22),
        }}
      />
    </label>
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