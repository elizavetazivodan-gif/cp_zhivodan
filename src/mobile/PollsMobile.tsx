import React, { useState } from 'react';
import { MPage, Pill, RadioRow, ThanksCat, smallUnb, GREEN, DARK, MINT, UNBOUNDED } from './kit';

type Question = {
  id: string;
  text: string;
  kind: 'scale' | 'choice' | 'row';
  options?: { id: string; label: string }[];
};

export default function PollsMobile({ questions, scale }: { questions: Question[]; scale: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const pick = (key: string, value: string) => setAnswers((a) => ({ ...a, [key]: value }));
  const allAnswered = questions.every((q) => Boolean(answers[q.id]));

  return (
    <MPage>
      <Pill>Активне одне анонімне опитування</Pill>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (allAnswered) setSent(true);
        }}
        style={{ backgroundColor: DARK, color: MINT, borderRadius: 40, padding: '30px 22px' }}
      >
        <fieldset
          disabled={sent}
          style={{ border: 0, margin: 0, padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24, opacity: sent ? 0.6 : 1 }}
        >
          <p style={{ ...smallUnb, margin: 0 }}>Постав оцінку від 5 до 1, де 5 - найвищий рівень</p>

          {questions.map((q) => (
            <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ ...smallUnb, margin: 0 }}>{q.text}</p>

              {q.kind === 'scale' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
                  {scale.map((n) => (
                    <RadioRow key={n} checked={answers[q.id] === n} onClick={() => pick(q.id, n)} label={n} />
                  ))}
                </div>
              )}

              {q.kind === 'choice' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {q.options?.map((o) => (
                    <RadioRow key={o.id} checked={answers[q.id] === o.id} onClick={() => pick(q.id, o.id)} label={o.label} />
                  ))}
                </div>
              )}

              {q.kind === 'row' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 22px' }}>
                  {q.options?.map((o) => (
                    <RadioRow key={o.id} checked={answers[q.id] === o.id} onClick={() => pick(q.id, o.id)} label={o.label} />
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
                alignSelf: 'center',
                padding: '0 34px',
                height: 52,
                borderRadius: 9999,
                backgroundColor: GREEN,
                color: MINT,
                border: 0,
                cursor: allAnswered ? 'pointer' : 'default',
                opacity: allAnswered ? 1 : 0.5,
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

      {sent ? (
        <ThanksCat>Нагадуємо, опитування - анонімне! Дякуємо за участь ;)</ThanksCat>
      ) : (
        <p style={{ margin: 0, textAlign: 'center', fontFamily: UNBOUNDED, fontWeight: 700, fontSize: 16, lineHeight: 1.45 }}>
          Нагадуємо, опитування є анонімним
        </p>
      )}
    </MPage>
  );
}
