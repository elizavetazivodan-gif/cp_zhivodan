import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cat from '../assets/cat-exclamation.png';

import org1 from '../assets/org1.jpg';
import org2 from '../assets/org2.jpg';
import liza from '../assets/liza.jpg'; 
import glib from '../assets/glib.jpg'; 
import illya from '../assets/illya.jpg'; 
import katya from '../assets/katya.jpg'; 
import dasha from '../assets/dasha.jpg'; 
import lina from '../assets/lina.jpg'; 
import nastya from '../assets/nastya.jpg'; 

const ORG_PHOTO = org1;
const STRUCTURE_PHOTO = org2;

const LINKS = {
  instagram: 'https://www.instagram.com/osm.khctfc?igsh=MWVhd2cxaGd4azl5bQ==',
  youtube: 'https://youtube.com/@osmvsphktfkntuhpi?si=SlbKrB_a5GDu48Ck',
  tiktok: 'https://www.tiktok.com/@hktfcollege?_t=8r5LRcxbXpW&_r=1',
};

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

type Member = {
  x: number;
  y: number;
  role: [string, string];
  name: [string, string];
  tag?: { x: number; y: number; text: string; link: string };
  circle: { x: number; y: number };
  photo: string;
  empty?: boolean;
};

const TEAM: Member[] = [
  {
    x: 54, y: 1413,
    role: ['Голова студентського', 'самоврядування'], name: ['Єлизавета', 'ЖИВОДАН'],
    tag: { x: 54, y: 1563, text: '@calgreddi', link: 'https://t.me/calgreddi' },
    circle: { x: 436, y: 1384 },
    photo: liza,
  },
  {
    x: 740, y: 1444,
    role: ['Перша заступниця', 'Голови'], name: ['Поки', 'відсутня'],
    circle: { x: 1128, y: 1384 },
    photo: '', empty: true,
  },
  {
    x: 61, y: 1690,
    role: ['Секретар', 'ОСМ'], name: ['Гліб', 'ЄГОРОВ'],
    tag: { x: 61, y: 1840, text: '@d1ndz1nd', link: 'https://t.me/d1ndz1nd' },
    circle: { x: 447, y: 1668 },
    photo: glib,
  },
  {
    x: 746, y: 1691,
    role: ['Міністр внутрішніх', 'справ'], name: ['Ілля', 'КОСТЕНЮК'],
    tag: { x: 746, y: 1841, text: '@exnernity', link: 'https://t.me/exnernity' },
    circle: { x: 1127, y: 1668 },
    photo: illya,
  },
  {
    x: 61, y: 1972,
    role: ['Міністерка довкілля', 'і природних ресурсів'], name: ['Катерина', 'ТРЕСНИЦЬКА'],
    tag: { x: 61, y: 2122, text: '@k_tresnickaya', link: 'https://t.me/k_tresnickaya' },
    circle: { x: 457, y: 1949 },
    photo: katya,
  },
  {
    x: 739, y: 1970,
    role: ['Міністерка культури', 'і цифрової політики'], name: ['Дар’я', 'МІРОШНИЧЕНКО'],
    tag: { x: 746, y: 2120, text: '@darmiro', link: 'https://t.me/darmiro' },
    circle: { x: 1139, y: 1938 },
    photo: dasha,
  },
  {
    x: 61, y: 2252,
    role: ['В.О. Міністерки освіти', 'і студентських справ'], name: ['Ангеліна', 'ЧЕТВЕРІКОВА'],
    tag: { x: 68, y: 2405, text: '@linochka2213', link: 'https://t.me/linochka2213' },
    circle: { x: 457, y: 2218 },
    photo: lina,
  },
  {
    x: 746, y: 2253,
    role: ['Міністерка', 'молоді та спорту'], name: ['Анастасія', 'ВОЛОШ'],
    tag: { x: 746, y: 2406, text: '@A_n_a_s_t_a_s_i_o_n', link: 'https://t.me/A_n_a_s_t_a_s_i_o_n' },
    circle: { x: 1138, y: 2217 },
    photo: nastya,
  },
];

export default function About() {
  const [dark, setDark] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@500;700&display=swap');
      `}</style>

      {/* Перемикач теми */}
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

      {/* основна панель */}
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: u(2493),
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        {/* соцмережі */}
        <div
          style={{
            position: 'absolute',
            left: u(196),
            top: u(35),
            width: u(1057),
            height: u(82),
            borderRadius: 9999,
            backgroundColor: GREEN,
          }}
        >
          <SocialPill left={516 - 196} bg={DARK} label="Instagram" href={LINKS.instagram}>
            <InstagramGlyph />
          </SocialPill>
          <SocialPill left={662 - 196} bg={MINT} label="YouTube" href={LINKS.youtube}>
            <YoutubeGlyph />
          </SocialPill>
          <SocialPill left={810 - 196} bg={DARK} label="TikTok" href={LINKS.tiktok}>
            <TiktokGlyph />
          </SocialPill>
        </div>

        {/* блок 1 */}
        <h2 style={{ ...abs(104, 194), ...titleStyle }}>
          <Line>Організація студентської</Line>
          <Line>молоді (самоврядування)</Line>
        </h2>

        <div style={{ ...abs(104, 291), ...bodyStyle }}>
          <Line>— це простір для реалізації сміливих ідей та активного</Line>
          <Line>
            студентського життя. <B>Тут твоя ініціатива, від крутих івентів</B>
          </Line>
          <Line>
            <B>до корисних проєктів, отримує підтримку</B>
          </Line>
        </div>

        <div style={{ ...abs(104, 392), ...bodyStyle }}>
          <Line>Бути частиною нашої команди — це можливість розвивати</Line>
          <Line>навички, працювати над реальними проєктами та знайти</Line>
          <Line>
            однодумців. <B>Ми чекаємо на тих, хто готовий діяти,</B>
          </Line>
          <Line>
            <B>нестандартно мислити й робити наш коледж кращим.</B>
          </Line>
        </div>

        <div style={{ ...abs(106, 523), ...bodyStyle }}>
          <Line>
            <B>Це твій шанс розкрити потенціал і</B>
          </Line>
          <Line>
            <B>творити історію нашого коледжу</B>
          </Line>
        </div>

        <OvalPhoto src={ORG_PHOTO} alt="Студенти" x={871} y={178} greenW={513} photoW={476} h={424} photoAlign="left" />

        {/* Плашка Email */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: u(611),
            width: u(810),
            height: u(82),
            backgroundColor: GREEN,
            borderTopRightRadius: 9999,
            borderBottomRightRadius: 9999,
          }}
        />
        <svg
          viewBox="0 0 57 45"
          aria-hidden="true"
          style={{ position: 'absolute', left: u(27), top: u(630), width: u(57), height: u(45) }}
        >
          <path
            fill={MINT}
            d="M0 9C0 4 4 0 9 0h.6l18.9 17L47.4 0h.6c5 0 9 4 9 9v36H46V19.5L28.5 35 11 19.5V45H0z"
          />
        </svg>
        <div
          style={{
            ...abs(115, 623.5),
            ...bodyStyle,
            color: MINT,
            fontWeight: 500,
          }}
        >
          <Line>Залишилися питання?</Line>
          <Line>Надішли нам лист!</Line>
        </div>
        <a
          href="mailto:organizaciastudentskoimolodi@gmail.com"
          style={{
            ...abs(405, 623.5),
            ...bodyStyle,
            color: MINT,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <Line>organizaciastudentskoimolodi</Line>
          <Line>@gmail.com</Line>
        </a>

        {/* блок 2 */}
        <OvalPhoto src={STRUCTURE_PHOTO} alt="Структура студради" x={59} y={803} greenW={521} photoW={481} h={424} photoAlign="right" />

        <h2 style={{ ...abs(641, 712), ...titleStyle }}>
          <Line>Структура студради</Line>
          <Line>ВСП “ХКТФК НТУ “ХПІ”</Line>
        </h2>

        <div style={{ ...abs(636, 805.5), ...bodyStyle, fontWeight: 700 }}>
          <Line>Студрада — це команда студентів, яка представляє їхні</Line>
          <Line>інтереси, розвиває студентське життя та створює</Line>
          <Line>можливості для активної участі</Line>
        </div>

        <div style={{ ...abs(637, 906.5), ...bodyStyle }}>
          <Line>Голова Студради керує роботою команди, координує</Line>
          <Line>діяльність та представляє інтереси студентів.</Line>
          <Line>Перший заступник Голови допомагає в організації роботи,</Line>
          <Line>координує завдання та за потреби замінює Голову.</Line>
          <Line>Секретар відповідає за документацію, протоколи та</Line>
          <Line>організаційні питання</Line>
        </div>

        <div style={{ ...abs(641, 1100.5), ...bodyStyle }}>
          <Line>Окремі напрями роботи забезпечують міністерства. Кожне</Line>
          <Line>має свою сферу діяльності та відповідає за проєкти й заходи:</Line>
          <Line>від освіти та спорту до культури, інформації й екології</Line>
        </div>

        {/* кнопка */}
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          style={{
            position: 'absolute',
            left: u(320),
            top: u(1265),
            width: u(782),
            height: u(88),
            borderRadius: 9999,
            backgroundColor: DARK,
            color: MINT,
            border: 0,
            cursor: 'pointer',
            fontFamily: UNBOUNDED,
            fontWeight: 500,
            fontSize: f(28),
            whiteSpace: 'nowrap',
            paddingLeft: u(40),
            paddingRight: u(56),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Тиць, аби долучитися до нашої спільноти
        </button>

        {/* команда */}
        {TEAM.map((m) => (
          <TeamMember key={m.role[0] + m.name[1]} m={m} dark={dark} />
        ))}
      </main>
      {openModal && <RegistrationModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const eventName = 'ОСМ';
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
      {/* котик у лівій частині екрану. з'являється лише після надсилання */}
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
          Форма реєстрації в «{eventName}»
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
                <span>Я підтверджую надсилання своєї реєстраційної форми в «{eventName}»</span>
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
const abs = (x: number, y: number): React.CSSProperties => ({
  position: 'absolute',
  left: u(x),
  top: u(y),
});

const titleStyle: React.CSSProperties = {
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

function SocialPill({
  left,
  bg,
  label,
  href,
  children,
}: {
  left: number;
  bg: string;
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        position: 'absolute',
        left: u(left),
        top: 0,
        width: u(115),
        height: u(82),
        borderRadius: 9999,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </a>
  );
}

const InstagramGlyph = () => (
  <svg viewBox="0 0 56 56" aria-hidden="true" style={{ width: u(56), height: u(56) }}>
    <rect width="56" height="56" rx="14" fill={MINT} />
    <circle cx="28" cy="28" r="11" fill="none" stroke={DARK} strokeWidth="5" />
    <circle cx="43" cy="13" r="3.2" fill={DARK} />
  </svg>
);

const YoutubeGlyph = () => (
  <svg viewBox="0 0 71 50" aria-hidden="true" style={{ width: u(71), height: u(50) }}>
    <rect width="71" height="50" rx="15" fill={DARK} />
    <path d="M28 14.5v21L46.5 25z" fill={MINT} />
  </svg>
);

const TiktokGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: u(54), height: u(54) }}>
    <path
      fill={MINT}
      d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.76.15-3.58 1.15-5.09 1.25-1.9 3.42-3.13 5.73-3.23l.03 4.17c-1.34.02-2.58.74-3.26 1.88-.34.56-.54 1.23-.55 1.89-.01 1.05.41 2.08 1.16 2.82.91.9 2.29 1.28 3.56.96 1.26-.31 2.29-1.28 2.65-2.54.17-.61.22-1.25.21-1.88-.04-4.83-.01-9.67-.03-14.5z"
    />
  </svg>
);

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
        <img
          src={src}
          alt={alt}
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden';
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  );
}

function TeamMember({ m, dark }: { m: Member; dark: boolean }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: u(m.x),
          top: u(m.y),
          width: u(368),
          height: u(139),
          borderRadius: u(32),
          backgroundColor: GREEN,
          color: MINT,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: UNBOUNDED, fontWeight: 700, fontSize: f(24), lineHeight: u(29) }}>
          <Line>{m.role[0]}</Line>
          <Line>{m.role[1]}</Line>
        </div>
        <div style={{ fontFamily: UNBOUNDED, fontWeight: 500, fontSize: f(22), lineHeight: u(28), marginTop: u(3) }}>
          <Line>{m.name[0]}</Line>
          <Line>{m.name[1]}</Line>
        </div>
      </div>

      {m.tag && (
        <a
          href={m.tag.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Telegram: ${m.tag.text}`}
          style={{ position: 'absolute', left: u(m.tag.x), top: u(m.tag.y), width: u(368), height: u(46), textDecoration: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, borderRadius: 9999, backgroundColor: DARK }} />
          <div
            style={{
              position: 'absolute',
              left: u(62),
              top: 0,
              width: u(306),
              height: u(46),
              borderRadius: 9999,
              backgroundColor: GREEN,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: UNBOUNDED,
              fontWeight: 500,
              fontSize: f(20),
              color: MINT,
              whiteSpace: 'nowrap',
            }}
          >
            {m.tag.text}
          </div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ position: 'absolute', left: u(14), top: u(8), width: u(32), height: u(30) }}
          >
            <path fill={MINT} d="M21.9 2.6 1.8 10.4c-.8.3-.8 1.4 0 1.6l5 1.6 1.9 5.9c.2.6 1 .8 1.4.3l2.8-2.6 5 3.7c.6.4 1.4.1 1.6-.6l3.3-16.2c.2-.8-.5-1.4-1.2-1.1zM8.4 13.1l9.6-6-7.4 7.2-.3 3.3z" />
          </svg>
        </a>
      )}

      <div
        style={{
          position: 'absolute',
          left: u(m.circle.x),
          top: u(m.circle.y),
          width: u(257),
          height: u(257),
          borderRadius: '50%',
          border: `${u(10)} solid ${GREEN}`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          backgroundColor: dark ? NIGHT : MINT,
        }}
      >
        {m.empty ? (
          <>
            <span
              style={{
                position: 'absolute',
                left: u(1217 - 1128 - 10),
                top: u(1723 - 1691 - 10),
                width: u(78),
                height: u(78),
                borderRadius: '50%',
                backgroundColor: GREEN,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: u(1170 - 1128 - 10),
                top: u(1823 - 1691 - 10),
                width: u(172),
                height: u(94),
                borderRadius: '50%',
                backgroundColor: GREEN,
              }}
            />
          </>
        ) : (
          <img
            src={m.photo}
            alt={`${m.name[0]} ${m.name[1]}`}
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>
    </>
  );
}