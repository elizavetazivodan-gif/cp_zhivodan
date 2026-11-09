import React, { useState } from 'react';

import cat from '../assets/cat-exclamation.png'; 

const GREEN = '#108B6B';
const DARK = '#094036';
const MINT = '#ECFDF5';
const NIGHT = '#06231C';

const UNBOUNDED = "'Unbounded', sans-serif";
const OPEN_SANS = "'Open Sans', system-ui, sans-serif";

const u = (n: number) => `${((n / 1440) * 100).toFixed(4)}vw`;
const TEXT_SCALE = 0.9;
const f = (n: number) => u(n * TEXT_SCALE);

/* чат з макета: q - запитання студента (зелена бульбашка зліва), інакше відповідь (темна справа).
   w, h - розмір бульбашки на макеті; lines - рядки тексту як на макеті */
const CHAT = [
  { id: 1, q: true, w: 429, h: 146, lines: ['Чи можна бути', 'одночасно у двох', 'міністерствах?'] },
  { id: 2, q: false, w: 619, h: 236, lines: ['Ні, офіційно можна бути лише в', 'одному міністерстві. Проте', 'міністерства можуть', 'співпрацювати над спільними', 'проєктами'] },
  { id: 3, q: true, w: 428, h: 117, lines: ['Профспілка - це теж', 'міністерство?'] },
  { id: 4, q: false, w: 620, h: 237, lines: ['Ні, профспілка - це окрема від', 'ОСМ організація, яка, зокрема,', 'надає фінансову підтримку', 'студентам і працівникам', 'коледжу.'] },
  { id: 5, q: true, w: 428, h: 117, lines: ['Що потрібно робити', 'члену міністерства?'] },
  { id: 6, q: false, w: 620, h: 237, lines: ['Працювати над проєктами, брати', 'участь у зборах щонайменше раз', 'на місяць та пропонувати власні', 'ідеї. За активність надаємо +0.5', 'бала'] },
  { id: 7, q: true, w: 428, h: 147, lines: ['Чи можна вступити', 'до ОСМ посеред', 'навчального року?'] },
  { id: 8, q: false, w: 620, h: 237, lines: ['Так! Цього року набір триває до', 'кінця навчального року.', 'Заповніть анкету у відповідному', 'розділі, вони переглядаються раз', 'на тиждень'] },
  { id: 9, q: true, w: 453, h: 146, lines: ['Чи можна перейти до', 'іншого міністерства', 'або вийти з нього?'] },
  { id: 10, q: false, w: 620, h: 236, lines: ['Так! Для переходу потрібно', 'узгодити рішення з керівниками', 'обох міністерств. Якщо хочете', 'припинити участь, повідомте про', 'це свого міністра'] },
  { id: 11, q: true, w: 477, h: 146, lines: ['Чи обов’язково', 'вступати до ОСМ, щоб', 'брати участь у заходах?'] },
  { id: 12, q: false, w: 620, h: 199, lines: ['Ні! Усі студенти можуть', 'долучатися до конкурсів, заходів', 'і зустрічей, які організовує ОСМ,', 'незалежно від членства'] },
  { id: 13, q: true, w: 570, h: 146, lines: ['Чи можу я вступити до ОСМ,', 'якщо перебуваю за кордоном', 'або в іншому місті?'] },
  { id: 14, q: false, w: 711, h: 245, lines: ['Так! Ми працюємо дистанційно, тому до', 'команди можна долучитися з будь-', 'якого міста чи країни. Очні зустрічі', 'відвідуються за можливості, якщо', 'цього потребує завдання'] },
];

const pollText: React.CSSProperties = {
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: f(26),
  lineHeight: u(34),
};

const chatText: React.CSSProperties = {
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: f(30),
  lineHeight: u(39.5),
};

const Line: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{children}</span>
);

const fieldStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  width: u(640),
  height: u(64),
  border: 0,
  outline: 'none',
  borderRadius: 9999,
  backgroundColor: MINT,
  color: DARK,
  padding: `0 ${u(32)}`,
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: f(24),
};

export default function Faq() {
  const [dark, setDark] = useState(false);
  const [contact, setContact] = useState<'anon' | 'contact'>('anon');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;
  const canSubmit = question.trim() !== '' && (contact === 'anon' || name.trim() !== '');

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@400;500;700&display=swap');
      `}</style>

      {/* перемикач теми */}
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
          <span style={{ fontFamily: OPEN_SANS, fontWeight: 700, fontSize: u(20), lineHeight: 1, color: MINT, whiteSpace: 'nowrap' }}>
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

      {/* мʼятна панель */}
      <main
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: panelBg,
          color: textColor,
          borderTopLeftRadius: u(70),
          borderTopRightRadius: u(70),
          overflow: 'hidden',
          paddingTop: u(40),
          paddingBottom: u(90),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'background-color 220ms ease, color 220ms ease',
        }}
      >
        {/* заголовок в один рядок */}
        <TitlePill>Твоє питання - наша відповідь</TitlePill>

        {/* темна картка з формою */}
        <div style={{ position: 'relative', width: u(1034), marginTop: u(60) }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) setSent(true);
          }}
          style={{
            width: u(1034),
            boxSizing: 'border-box',
            padding: `${u(70)} ${u(60)} ${u(64)}`,
            borderRadius: u(80),
            backgroundColor: DARK,
            color: MINT,
          }}
        >
          <fieldset
            disabled={sent}
            style={{
              border: 0,
              margin: 0,
              padding: 0,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: u(32),
              opacity: sent ? 0.6 : 1,
            }}
          >
            {/* вибір: анонімно чи з контактом */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: u(14), alignSelf: 'center', width: u(640) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: u(16) }}>
                <Radio checked={contact === 'anon'} onClick={() => setContact('anon')} label="Я хочу залишатися анонімним" />
                <span style={pollText}>Я хочу залишатися анонімним</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: u(16) }}>
                <Radio checked={contact === 'contact'} onClick={() => setContact('contact')} label="Я надаю свій контакт для зв’язку" />
                <span style={pollText}>Я надаю свій контакт для зв’язку</span>
              </div>
            </div>

            <p style={{ margin: 0, textAlign: 'center', ...pollText }}>
              Якщо бажаєш залишити заявку публічно, запиши своє ім’я та номер телефону
            </p>
            <input
              type="text"
              aria-label="Ім’я та номер телефону"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={fieldStyle}
            />

            <p style={{ margin: 0, textAlign: 'center', ...pollText }}>Занотуй своє питання нижче, щоб ми надали тобі відповідь</p>
            <input
              type="text"
              aria-label="Твоє питання"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={fieldStyle}
            />

            {!sent && (
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  marginTop: u(8),
                  width: u(280),
                  height: u(70),
                  borderRadius: 9999,
                  backgroundColor: GREEN,
                  color: MINT,
                  border: 0,
                  cursor: canSubmit ? 'pointer' : 'default',
                  opacity: canSubmit ? 1 : 0.5,
                  fontFamily: UNBOUNDED,
                  fontWeight: 500,
                  fontSize: f(24),
                  whiteSpace: 'nowrap',
                }}
              >
                НАДІСЛАТИ
              </button>
            )}
          </fieldset>
        </form>
        {sent && (
          <img
            src={cat}
            alt="Котик зі знаком оклику"
            style={{
              position: 'absolute',
              left: u(-400),
              bottom: u(-129),
              width: u(660),
              height: u(880),
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        )}
        </div>

        {/* подяка лише після надсилання */}
        {sent && (
          <p
            style={{
              margin: `${u(50)} 0 0`,
              width: u(900),
              boxSizing: 'border-box',
              textAlign: 'center',
              fontFamily: UNBOUNDED,
              fontWeight: 700,
              fontSize: f(34),
              lineHeight: u(42),
            }}
          >
            Дякуємо за ініціативу! Незабаром твоє питання обов’язково опрацює адміністратор
          </p>
        )}

        {/* питання, на які вже є відповідь */}
        <div style={{ marginTop: u(90) }}>
          <TitlePill>Питання, на які вже є відповідь</TitlePill>
        </div>

        {/* чат */}
        <div style={{ width: u(1150), marginTop: u(60), display: 'flex', flexDirection: 'column', gap: u(36) }}>
          {CHAT.map((m) => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.q ? 'flex-start' : 'flex-end' }}>
              <span style={{ ...chatText, fontSize: f(24), lineHeight: u(40), color: GREEN, marginBottom: u(6) }}>
                {m.q ? 'Студент коледжу' : 'Організація студентської'}
              </span>
              <div
                style={{
                  ...chatText,
                  width: u(m.w),
                  height: u(m.h),
                  boxSizing: 'border-box',
                  backgroundColor: m.q ? GREEN : DARK,
                  color: MINT,
                  borderRadius: m.q ? `${u(48)} ${u(48)} ${u(48)} ${u(6)}` : `${u(48)} ${u(48)} ${u(6)} ${u(48)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: m.q ? 'flex-start' : 'center',
                  padding: m.q ? `0 ${u(36)} 0 ${u(64)}` : `0 ${u(36)}`,
                  textAlign: m.q ? 'left' : 'center',
                }}
              >
                {m.lines.map((l) => (
                  <Line key={l}>{l}</Line>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* зелена плашка-заголовок в один рядок */
function TitlePill({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: 0,
        backgroundColor: GREEN,
        color: MINT,
        borderRadius: 9999,
        padding: `${u(18)} ${u(60)}`,
        fontFamily: UNBOUNDED,
        fontWeight: 700,
        fontSize: f(34),
        lineHeight: u(56),
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </h2>
  );
}

function Radio({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      style={{
        width: u(44),
        height: u(44),
        flexShrink: 0,
        padding: 0,
        border: 0,
        borderRadius: '50%',
        backgroundColor: MINT,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked && <span style={{ width: u(20), height: u(20), borderRadius: '50%', backgroundColor: GREEN }} />}
    </button>
  );
}
