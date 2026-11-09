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

type Question = {
  id: string;
  text: string;
  kind: 'scale' | 'choice' | 'row';
  options?: { id: string; label: string }[];
};

const SCALE_VALUES = ['5', '4', '3', '2', '1'];

const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Як тобі загалом навчання в коледжі?', kind: 'scale' },
  { id: 'q2', text: 'Наскільки тобі комфортно навчатися в коледжі?', kind: 'scale' },
  { id: 'q3', text: 'Наскільки ти задоволений/а роботою студради?', kind: 'scale' },
  {
    id: 'q4',
    text: 'Як ти найчастіше дізнаєшся про заходи коледжу?',
    kind: 'choice',
    options: [
      { id: 'q4a', label: 'Від старости групи' },
      { id: 'q4b', label: 'Із соцмереж' },
      { id: 'q4c', label: 'Від класного керівника' },
      { id: 'q4d', label: 'Із сайту студради' },
    ],
  },
  {
    id: 'q5',
    text: 'Який спосіб комунікації з нами (ОСС) тобі найзручніший?',
    kind: 'choice',
    options: [
      { id: 'q5a', label: 'Сайт студради' },
      { id: 'q5b', label: 'Telegram' },
      { id: 'q5c', label: 'Instagram' },
    ],
  },
  {
    id: 'q6',
    text: 'Чого тобі найбільше не вистачає в студентському житті?',
    kind: 'choice',
    options: [
      { id: 'q6a', label: 'Розважальних заходів' },
      { id: 'q6b', label: 'Волонтерських ініціатив' },
      { id: 'q6c', label: 'Networking, студентські зустрічі' },
    ],
  },
  {
    id: 'q7',
    text: 'Чи знаєш ти, чим займається студентське самоврядування?',
    kind: 'row',
    options: [
      { id: 'q7a', label: 'Так' },
      { id: 'q7b', label: 'Ні' },
      { id: 'q7c', label: '50/50' },
    ],
  },
];

const pollText: React.CSSProperties = {
  fontFamily: UNBOUNDED,
  fontWeight: 400,
  fontSize: f(26),
  lineHeight: u(34),
};

export default function Polls() {
  const [dark, setDark] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const pick = (key: string, value: string) => setAnswers((a) => ({ ...a, [key]: value }));
  const allAnswered = QUESTIONS.every((q) => Boolean(answers[q.id]));
  const panelBg = dark ? NIGHT : MINT;
  const textColor = dark ? MINT : DARK;

  return (
    <div style={{ backgroundColor: GREEN, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&family=Open+Sans:wght@700&family=Unbounded:wght@400;500;700&display=swap');
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

        <h1
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
          Активне одне анонімне опитування
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (allAnswered) setSent(true);
          }}
          style={{
            marginTop: u(60),
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
              gap: u(40),
              opacity: sent ? 0.6 : 1,
            }}
          >
            <p style={{ margin: 0, textAlign: 'center', ...pollText }}>Постав оцінку від 5 до 1, де 5 - найвищий рівень</p>

            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u(20) }}
              >
                <p style={{ margin: 0, textAlign: 'center', ...pollText }}>{q.text}</p>

                {q.kind === 'scale' && (
                  <div style={{ display: 'flex', gap: u(36), alignItems: 'center' }}>
                    {SCALE_VALUES.map((n) => (
                      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: u(12) }}>
                        <Radio checked={answers[q.id] === n} onClick={() => pick(q.id, n)} label={n} />
                        <span style={pollText}>{n}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.kind === 'choice' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: u(14), alignSelf: 'center', width: u(540) }}>
                    {q.options?.map((o) => (
                      <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: u(16) }}>
                        <Radio checked={answers[q.id] === o.id} onClick={() => pick(q.id, o.id)} label={o.label} />
                        <span style={pollText}>{o.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.kind === 'row' && (
                  <div style={{ display: 'flex', gap: u(70), alignItems: 'center' }}>
                    {q.options?.map((o) => (
                      <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: u(16) }}>
                        <Radio checked={answers[q.id] === o.id} onClick={() => pick(q.id, o.id)} label={o.label} />
                        <span style={pollText}>{o.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {!sent && (
              <button
                type="submit"
                disabled={!allAnswered}
                style={{
                  marginTop: u(8),
                  width: u(280),
                  height: u(70),
                  borderRadius: 9999,
                  backgroundColor: GREEN,
                  color: MINT,
                  border: 0,
                  cursor: allAnswered ? 'pointer' : 'default',
                  opacity: allAnswered ? 1 : 0.5,
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

        <p
          style={{
            margin: `${u(50)} 0 0`,
            width: u(1000),
            padding: `0 ${u(40)}`,
            boxSizing: 'border-box',
            textAlign: 'center',
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: f(34),
            lineHeight: u(42),
          }}
        >
          {sent ? (
            <>
              <span style={{ display: 'block' }}>Дякуємо за участь! Твою відповідь</span>
              <span style={{ display: 'block' }}>обов’язково опрацює адміністратор</span>
            </>
          ) : (
            <>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Нагадуємо, опитування є анонімним</span>
            </>
          )}
        </p>

        {sent && (
          <img
            src={cat}
            alt="Котик зі знаком оклику"
            style={{
              position: 'absolute',
              left: u(-200),
              bottom: u(0),
              width: u(660),
              height: u(880),
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        )}
      </main>
    </div>
  );
}

function Radio({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
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
