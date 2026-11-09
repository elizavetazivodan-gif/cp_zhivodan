import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import kitten from '../assets/kitten.jpeg';
import fund1 from '../assets/fund1.jpg';
import fund2 from '../assets/fund2.jpeg';
import fund3 from '../assets/fund3.jpeg';
import fund4 from '../assets/fund4.png';
import fund5 from '../assets/fund5.png';
import archive from '../assets/archive-shelter.jpg';
import hero from '../assets/horses.jpg';
import cat from '../assets/cat-exclamation.png'; 

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

const INITIATIVE_NAME = 'Допоможімо безпритульним котикам';

export default function Volunteering() {
  const [dark, setDark] = useState(false);
  /* форма реєстрації на ініціативу: відкрита / закрита */
  const [openModal, setOpenModal] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@500;700&display=swap');
      `}</style>

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
          height: u(2479),
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: u(2004), width: '100%', height: u(475) }}>
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

        {/* поточна ініціатива */}
        <h1 style={{ ...abs(77, 55), ...eventTitle }}>
          <Line>Наразі іде набір лише на одну волонтерську ініціативу</Line>
        </h1>

        <EventFrame src={kitten} alt="Допоможімо безпритульним котикам" x={99} y={139} />
        <h3 style={{ ...abs(577, 128), ...eventTitle }}>
          <Line>Допоможімо безпритульним</Line>
          <Line>котикам! 🐱</Line>
        </h3>
        <div style={{ ...abs(577, 223), ...bodyStyle }}>
          <Line>Ми вже зібрали кошти на корм для котиків, які не мають</Line>
          <Line>власного дому та перебувають у притулку в Харкові.</Line>
          <Line>Тепер шукаємо охочих, які готові поїхати разом із нами,</Line>
          <Line>щоб закупити корм і подарувати пухнастикам трохи</Line>
          <Line>турботи.</Line>
        </div>
        
        <JoinButton x={577} y={381} onClick={() => setOpenModal(true)} />

        <div
          style={{
            ...abs(70, 509),
            fontFamily: ONEST,
            fontWeight: 700,
            fontSize: f(25),
            lineHeight: u(33),
          }}
        >
          <Line>Також трохи нижче ми підготували декілька фондів, до яких ви можете</Line>
          <Line>долучитися та підтримати важливі ініціативи 💚</Line>
        </div>

        {/* фонди */}
        <FundCircle src={fund1} alt="Фонд «Повернись живим»" x={66} y={608} />
        <h3 style={{ ...abs(82, 844), ...fundName }}>
          <Line>Фонд</Line>
          <Line>“Повернись</Line>
          <Line>живим”</Line>
        </h3>
        <div style={{ ...abs(75, 946), ...fundText }}>
          <Line>Фонд</Line>
          <Line>допомоги</Line>
          <Line>військовим та</Line>
          <Line>волонтерам</Line>
          <Line>на території</Line>
          <Line>ведення</Line>
          <Line>активних</Line>
          <Line>бойових дій</Line>
        </div>
        <FundButton x={54} y={1232} href="https://savelife.in.ua/" />

        <FundCircle src={fund2} alt="Фонд Сергія Притули" x={331} y={608} />
        <h3 style={{ ...abs(367, 844), ...fundName }}>
          <Line>Фонд</Line>
          <Line>Сергія</Line>
          <Line>Притули</Line>
        </h3>
        <div style={{ ...abs(368, 946), ...fundText }}>
          <Line>Фонд</Line>
          <Line>забезпечення</Line>
          <Line>СОУ та</Line>
          <Line>допомоги</Line>
          <Line>цивільним на</Line>
          <Line>деокупованих і</Line>
          <Line>прифронтових</Line>
          <Line>територіях</Line>
        </div>
        <FundButton x={330} y={1232} href="https://prytulafoundation.org/about?gad_source=1&gad_campaignid=22705077303&gbraid=0AAAAAqGbiEhHnW3ieC4A01M31rhNtIic3&gclid=CjwKCAiAkrbXBhB2EiwA2y1E3qdbew_bCZb3733sFbQlJYoc-YQ9cZzRnwTcG7lcoHeGx33O_u8qyxoCk-wQAvD_BwE" />

        <FundCircle src={fund3} alt="Фонд «Спільнота Стеренка»" x={601} y={608} />
        <h3 style={{ ...abs(639, 850), ...fundName }}>
          <Line>Фонд</Line>
          <Line>“Спільнота</Line>
          <Line>Стеренка”</Line>
        </h3>
        <div style={{ ...abs(638, 946), ...fundText }}>
          <Line>Фонд</Line>
          <Line>забезпечення</Line>
          <Line>СБУ</Line>
          <Line>безпілотними</Line>
          <Line>технологіями,</Line>
          <Line>ударними FPV-</Line>
          <Line>дронами та з/п</Line>
          <Line>ворожим БПЛА</Line>
        </div>
        <FundButton x={611} y={1232} href="https://www.sternenkofund.org/" />

        <FundCircle src={fund4} alt="Фонд «Армія SOS»" x={866} y={608} />
        <h3 style={{ ...abs(912, 842), ...fundName }}>
          <Line>Фонд</Line>
          <Line>“Армія</Line>
          <Line>SOS”</Line>
        </h3>
        <div style={{ ...abs(906, 943), ...fundText }}>
          <Line>Фонд автоматизації</Line>
          <Line>управління</Line>
          <Line>військами,</Line>
          <Line>повітряної</Line>
          <Line>розвідки та</Line>
          <Line>технічного</Line>
          <Line>переоснащення</Line>
          <Line>підрозділів</Line>
        </div>
        <FundButton x={895} y={1232} href="https://armysos.com.ua/uk/" />

        <FundCircle src={fund5} alt="Фонд «Razom for Ukraine»" x={1140} y={600} />
        <h3 style={{ ...abs(1181, 836), ...fundName }}>
          <Line>Фонд</Line>
          <Line>“Razom for</Line>
          <Line>Ukraine”</Line>
        </h3>
        <div style={{ ...abs(1183, 946), ...fundText }}>
          <Line>Фонд</Line>
          <Line>забезпечення</Line>
          <Line>тех.</Line>
          <Line>медициною,</Line>
          <Line>засобами</Line>
          <Line>зв’язку та іншим</Line>
          <Line>обладнанням</Line>
          <Line>для медиків</Line>
        </div>
        <FundButton x={1164} y={1232} href="https://www.razomforukraine.org/ua/home_ua/" />

        {/* архів зборів */}
        <SectionPill x={223} y={1338}>
          Архів зборів
        </SectionPill>

        <h3 style={{ ...abs(90, 1531), ...eventTitle }}>
          <Line>Збір для притулку</Line>
          <Line>тварин у м. Змієві</Line>
        </h3>
        <div style={{ ...abs(90, 1629), ...bodyStyle }}>
          <Line>Завдяки спільним зусиллям вдалося зібрати необхідну</Line>
          <Line>
            допомогу для притулку. <B>19 листопада 2025 року</B> Катерина
          </Line>
          <Line>Тресницька особисто відвідала притулок та передала</Line>
          <Line>зібраний корм і допомогу тваринам.</Line>
          <Line>Дякуємо всім студентам і викладачам, які долучилися до</Line>
          <Line>збору, підтримали його та допомогли зробити добру</Line>
          <Line>справу! 🐾</Line>
        </div>
        <OvalPhoto src={archive} alt="Збір для притулку тварин у м. Змієві" x={853} y={1475} greenW={514} photoW={477} h={424} photoAlign="left" />
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

/* Один рядок тексту — переноси збігаються з макетом */
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
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

function JoinButton({ x, y, onClick }: { x: number; y: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(280),
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

/* вспливаюча форма реєстрації на ініціативу */
function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [sent, setSent] = useState(false);
  const eventName = INITIATIVE_NAME;
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
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: f(24),
            lineHeight: u(32),
          }}
        >
          Форма реєстрації на ініціативу «{INITIATIVE_NAME}»
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
                <span>Я підтверджую надсилання своєї реєстраційної форми на ініціативу «{eventName}»</span>
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
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  );
}

function FundCircle({ src, alt, x, y }: { src: string; alt: string; x: number; y: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(219),
        height: u(220),
        boxSizing: 'border-box',
        border: `${u(8)} solid ${GREEN}`,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

const fundName: React.CSSProperties = {
  margin: 0,
  fontFamily: UNBOUNDED,
  fontWeight: 700,
  fontSize: f(20),
  lineHeight: u(31),
};

const fundText: React.CSSProperties = {
  fontFamily: ONEST,
  fontWeight: 400,
  fontSize: f(26),
  lineHeight: u(33),
};

function FundButton({ x, y, href }: { x: number; y: number; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'absolute',
        left: u(x),
        top: u(y),
        width: u(241),
        height: u(70),
        borderRadius: 9999,
        backgroundColor: GREEN,
        color: MINT,
        border: 0,
        cursor: 'pointer',
        fontFamily: UNBOUNDED,
        fontWeight: 500,
        fontSize: f(24),
        lineHeight: u(30),
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      <span>Долучитися</span>
      <span>до зборів</span>
    </a>
  );
} 