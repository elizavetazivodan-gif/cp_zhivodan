import React, { useState } from 'react';
import { MPage, Pill, RadioRow, ThanksCat, inputStyle, smallUnb, GREEN, DARK, MINT, UNBOUNDED } from './kit';

type Msg = { id: number; q: boolean; lines: string[] };

export default function FaqMobile({ chat }: { chat: Msg[] }) {
  const [contact, setContact] = useState<'anon' | 'contact'>('anon');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);
  const canSubmit = question.trim() !== '' && (contact === 'anon' || name.trim() !== '');

  return (
    <MPage>
      <Pill>Твоє питання - наша відповідь</Pill>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) setSent(true);
        }}
        style={{ backgroundColor: DARK, color: MINT, borderRadius: 40, padding: '30px 22px' }}
      >
        <fieldset
          disabled={sent}
          style={{ border: 0, margin: 0, padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18, opacity: sent ? 0.6 : 1 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <RadioRow checked={contact === 'anon'} onClick={() => setContact('anon')} label="Я хочу залишатися анонімним" />
            <RadioRow checked={contact === 'contact'} onClick={() => setContact('contact')} label="Я надаю свій контакт для зв’язку" />
          </div>

          <p style={{ ...smallUnb, margin: 0 }}>Якщо бажаєш залишити заявку публічно, запиши своє ім’я та номер телефону</p>
          <input type="text" aria-label="Ім’я та номер телефону" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

          <p style={{ ...smallUnb, margin: 0 }}>Занотуй своє питання нижче, щоб ми надали тобі відповідь</p>
          <input type="text" aria-label="Твоє питання" value={question} onChange={(e) => setQuestion(e.target.value)} style={inputStyle} />

          {!sent && (
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                alignSelf: 'center',
                padding: '0 34px',
                height: 52,
                borderRadius: 9999,
                backgroundColor: GREEN,
                color: MINT,
                border: 0,
                cursor: canSubmit ? 'pointer' : 'default',
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

      {sent && <ThanksCat>Дякуємо за ініціативу! Незабаром твоє питання обов’язково опрацює адміністратор</ThanksCat>}

      <Pill>Питання, на які вже є відповідь</Pill>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {chat.map((m) => (
          <div key={m.id} data-reveal style={{ display: 'flex', flexDirection: 'column', alignItems: m.q ? 'flex-start' : 'flex-end', gap: 4 }}>
            <span style={{ fontFamily: UNBOUNDED, fontSize: 11, lineHeight: 1.4, color: GREEN }}>
              {m.q ? 'Студент коледжу' : 'Організація студентської'}
            </span>
            <div
              style={{
                maxWidth: '88%',
                boxSizing: 'border-box',
                padding: '14px 18px',
                backgroundColor: m.q ? GREEN : DARK,
                color: MINT,
                borderRadius: m.q ? '26px 26px 26px 4px' : '26px 26px 4px 26px',
                fontFamily: UNBOUNDED,
                fontWeight: 400,
                fontSize: 13,
                lineHeight: 1.55,
                overflowWrap: 'anywhere',
              }}
            >
              {m.lines.join(' ')}
            </div>
          </div>
        ))}
      </div>
    </MPage>
  );
}
