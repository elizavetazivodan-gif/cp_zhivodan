import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cat from '../assets/cat-exclamation.png';
import cat1 from '../assets/cat1.png'; 
import cat2 from '../assets/cat2.png';
import hero from '../assets/group.png'; 

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

export default function Proposals() {
  const [dark, setDark] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@500;700&display=swap');
      `}</style>

      <img
        src={cat1}
        alt="Котик із гучномовцем"
        style={{ position: 'absolute', left: u(246), top: u(52), width: u(400), height: u(452), objectFit: 'contain', zIndex: 5, pointerEvents: 'none' }}
      />

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

      <main
        style={{
          position: 'relative',
          width: '100%',
          height: u(2043),
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: u(1568), width: '100%', height: u(475) }}>
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

        <h1 style={{ ...abs(734, 60), ...eventTitle }}>
          <Line>Маєш ідею?</Line>
          <Line>Поділися нею!</Line>
        </h1>
        <div style={{ ...abs(735, 165), ...bodyStyle }}>
          <Line>
            <B>Ми шукаємо круті пропозиції</B>
          </Line>
          <Line>
            <B>щодо навчання, студентського</B>
          </Line>
          <Line>
            <B>життя та комфорту.</B> Готові
          </Line>
          <Line>вислухати та реалізувати навіть</Line>
          <Line>найменшу ідею))</Line>
        </div>

        <SectionPill x={189} y={365}>
          Форма для ідей студенства
        </SectionPill>

        <JoinButton x={518} y={473} w={410} onClick={() => setOpenModal(true)}>
          Запропонувати ідею
        </JoinButton>

        <h3 style={{ ...abs(100, 596), ...eventTitle }}>
          <Line>Які ідеї можна запропонувати?</Line>
        </h3>
        <div style={{ ...abs(132, 651), ...bodyStyle }}>
          <Bullet>
            <Line>
              <B>Ідеї щодо освітнього процесу, занять та матеріалів</B>
            </Line>
          </Bullet>
          <Bullet>
            <Line>
              <B>Заходи, конкурси, зустрічі та нові активності</B>
            </Line>
          </Bullet>
          <Bullet>
            <Line>
              <B>Комфорт у коледжі</B>
            </Line>
          </Bullet>
          <Bullet>
            <Line>
              <B>Пропозиції щодо простору, умов навчання та</B>
            </Line>
            <Line>
              <B>відпочинку</B>
            </Line>
          </Bullet>
          <Bullet>
            <Line>Будь-яка ідея, яка може зробити студентське життя</Line>
            <Line>кращим)</Line>
          </Bullet>
        </div>

        <h3 style={{ ...abs(100, 904), ...eventTitle }}>
          <Line>🗣️ «Як це працює?»</Line>
        </h3>
        <h4 style={{ ...abs(119, 955), ...stepNumber }}>01</h4>
        <div style={{ ...abs(119, 991.5), ...bodyStyle }}>
          <Line>💭 Подумай, що можна змінити або</Line>
          <Line>покращити</Line>
        </div>
        <h4 style={{ ...abs(119, 1052), ...stepNumber }}>02</h4>
        <div style={{ ...abs(119, 1088.5), ...bodyStyle }}>
          <Line>📝 Заповни коротку форму</Line>
        </div>
        <h4 style={{ ...abs(119, 1120), ...stepNumber }}>03</h4>
        <div style={{ ...abs(119, 1156.5), ...bodyStyle }}>
          <Line>🚀 Студрада ознайомиться з пропозицією</Line>
          <Line>та, за можливості, допоможе її реалізувати</Line>
        </div>

        <div
          style={{
            position: 'absolute',
            left: u(675),
            top: u(957),
            width: u(592),
            height: u(259),
            borderRadius: u(70),
            backgroundColor: GREEN,
            color: MINT,
          }}
        >
          <h3 style={{ ...abs(52, 34), ...eventTitle }}>
            <Line>Маєш ідею?</Line>
            <Line>Поділися нею!</Line>
          </h3>
          <div style={{ ...abs(52, 130.5), ...bodyStyle, fontWeight: 700 }}>
            <Line>Не бійся пропонувати навіть те, що</Line>
            <Line>здається маленьким. Саме з таких ідей</Line>
            <Line>починаються великі зміни!</Line>
          </div>
        </div>

        <img
          src={cat2}
          alt="Котик у хустинці"
          style={{ position: 'absolute', left: u(883), top: u(548), width: u(310), height: u(439), objectFit: 'contain', display: 'block' }}
        />

        <h3
          style={{
            ...abs(403, 1329),
            width: u(600),
            textAlign: 'center',
            margin: 0,
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: f(32),
            lineHeight: u(40),
          }}
        >
          <Line>Дякуємо, що ділишся</Line>
          <Line>своїми ідеями з нами!</Line>
          <Line>Це надихає ❤️</Line>
        </h3>
      </main>
      {openModal && <RegistrationModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

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
      {/* тут фто */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

/* темна кнопка, яка відкриває спливаючу форму */
function JoinButton({
  x,
  y,
  w = 281,
  onClick,
  children = 'Долучитися',
}: {
  x: number;
  y: number;
  w?: number;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(w),
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
      {children}
    </button>
  );
}

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
        {/* фото */}
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  );
}

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', paddingLeft: u(22) }}>
    <span style={{ position: 'absolute', left: u(2), top: 0 }}>•</span>
    {children}
  </div>
);

const stepNumber: React.CSSProperties = {
  margin: 0,
  fontFamily: UNBOUNDED,
  fontWeight: 700,
  fontSize: f(28),
  lineHeight: u(36),
};

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
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
          Форма для твоєї ідеї
        </h2>

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
                <span>Я підтверджую надсилання своєї форми з ідеєю</span>
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
            Дякуємо за ідею! Незабаром твою форму обов’язково опрацює адміністратор
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
