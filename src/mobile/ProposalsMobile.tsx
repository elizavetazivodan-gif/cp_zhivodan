import React, { useState } from 'react';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import hero from '../assets/group.png';
import { MPage, Pill, Btn, Hero, MobileRegistrationModal, hStyle, pStyle, GREEN, MINT, UNBOUNDED } from './kit';

const title: React.CSSProperties = { ...hStyle, fontWeight: 500, fontSize: 20 };

const IDEAS = [
  'Ідеї щодо освітнього процесу, занять та матеріалів',
  'Заходи, конкурси, зустрічі та нові активності',
  'Комфорт у коледжі',
  'Пропозиції щодо простору, умов навчання та відпочинку',
];

const STEPS = [
  { n: '01', t: '💭 Подумай, що можна змінити або покращити' },
  { n: '02', t: '📝 Заповни коротку форму' },
  { n: '03', t: '🚀 Студрада ознайомиться з пропозицією та, за можливості, допоможе її реалізувати' },
];

export default function ProposalsMobile() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <MPage overlap>
      {/* котик із гучномовцем трохи виступає над панеллю */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: -16, position: 'relative', zIndex: 2 }}>
        <img src={cat1} alt="Котик із гучномовцем" style={{ width: '44%', flexShrink: 0, objectFit: 'contain', display: 'block', marginTop: -6 }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 22 }}>
          <h1 style={title}>Маєш ідею? Поділися нею!</h1>
          <p style={{ ...pStyle, fontSize: 15 }}>
            <b>Ми шукаємо круті пропозиції щодо навчання, студентського життя та комфорту.</b> Готові вислухати та реалізувати
            навіть найменшу ідею))
          </p>
        </div>
      </div>

      <Pill>Форма для ідей студенства</Pill>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Btn inline onClick={() => setOpenModal(true)}>
          Запропонувати ідею
        </Btn>
      </div>

      <h3 style={title}>Які ідеї можна запропонувати?</h3>
      <ul style={{ ...pStyle, margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {IDEAS.map((t) => (
          <li key={t}>
            <b>{t}</b>
          </li>
        ))}
        <li>Будь-яка ідея, яка може зробити студентське життя кращим)</li>
      </ul>

      <h3 style={title}>🗣️ «Як це працює?»</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <h4 style={{ margin: 0, fontFamily: UNBOUNDED, fontWeight: 700, fontSize: 20, lineHeight: 1.3 }}>{s.n}</h4>
            <p style={pStyle}>{s.t}</p>
          </div>
        ))}
      </div>

      {/* картка з котиком, що сидить на її верхньому краї */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
        <img src={cat2} alt="Котик у хустинці" style={{ width: '42%', alignSelf: 'flex-end', marginRight: 20, marginBottom: -26, objectFit: 'contain', position: 'relative', zIndex: 1 }} />
        <div style={{ backgroundColor: GREEN, color: MINT, borderRadius: 36, padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={title}>Маєш ідею? Поділися нею!</h3>
          <p style={{ ...pStyle, fontWeight: 700 }}>
            Не бійся пропонувати навіть те, що здається маленьким. Саме з таких ідей починаються великі зміни!
          </p>
        </div>
      </div>

      <h3 style={{ ...hStyle, fontSize: 21, textAlign: 'center', marginTop: 12 }}>
        Дякуємо, що ділишся своїми ідеями з нами! Це надихає ❤️
      </h3>

      <Hero src={hero} />

      {openModal && (
        <MobileRegistrationModal
          title="Форма для твоєї ідеї"
          confirmText="Я підтверджую надсилання своєї форми з ідеєю"
          thanks="Дякуємо за ідею! Незабаром твою форму обов’язково опрацює адміністратор"
          onClose={() => setOpenModal(false)}
        />
      )}
    </MPage>
  );
}
