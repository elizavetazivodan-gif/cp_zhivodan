import React, { useState } from 'react';
import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg';
import archive1 from '../assets/archive1.jpg';
import archive2 from '../assets/archive2.jpg';
import hero from '../assets/hero.png';
import { MPage, Pill, Btn, Frame, Hero, OvalPhoto, MobileRegistrationModal, hStyle, pStyle } from './kit';

const EVENTS = [
  {
    name: 'Святкування Нового року',
    src: event1,
    title: 'Святкування Нового року у бомбосховищі НТУ “ХПІ”',
    body: (
      <>
        <b>29 грудня о 14:00</b> відбудеться святкування Нового року. На вас чекає новорічна атмосфера, музика, цікаві конкурси,
        розваги, спілкування та святковий настрій. Давайте разом створимо теплі спогади та зустрінемо Новий рік яскраво! 🎄✨
      </>
    ),
  },
  {
    name: 'Святкування Дня програміста',
    src: event2,
    title: 'Святкування Дня програміста у бомбосховищі НТУ “ХПІ”',
    body: (
      <>
        <b>7 січня о 12:00</b> відбудеться святкування Дня програміста! 💻 На вас чекають командні змагання, веселі конкурси та
        можливість перевірити свої навички програмування. Долучайтеся, щоб весело провести час та відчути справжню атмосферу ІТ! 🚀
      </>
    ),
  },
];

const title: React.CSSProperties = { ...hStyle, fontSize: 20 };

export default function EventsMobile() {
  const [openEvent, setOpenEvent] = useState<number | null>(null);

  return (
    <MPage>
      <Pill>Актуальні події</Pill>

      {EVENTS.map((e, i) => (
        <div key={e.name} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Frame src={e.src} alt={e.name} ratio="448 / 336" />
          <h3 style={title}>{e.title}</h3>
          <p style={pStyle}>{e.body}</p>
          <Btn inline onClick={() => setOpenEvent(i)}>
            Долучитися
          </Btn>
        </div>
      ))}

      <Pill>Архів подій</Pill>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <OvalPhoto src={archive2} alt="Турнір з шахів та шашок" align="left" greenW={513} photoW={476} />
        <h3 style={title}>Турнір з шахів та шашок у бомбосховищі НТУ “ХПІ”</h3>
        <p style={pStyle}>
          <b>6 грудня 2025 року об 11:00</b> з нагоди Дня Збройних Сил України в коледжі відбувся патріотичний захід і турнір із
          шахів та шашок «Шаховий фронт». Учасники продемонстрували силу розуму та командний дух. Дякуємо Збройним Силам України
          за захист!
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <OvalPhoto src={archive1} alt="Святкування Дня Закоханих" align="right" greenW={519} photoW={478} />
        <h3 style={title}>Святкування Дня Закоханих у бомбосховищі НТУ “ХПІ”</h3>
        <p style={pStyle}>
          <b>14 лютого 2025 року о 12:00</b> студенти нашого коледжу вперше за 3 роки відсвяткували День закоханих! На учасників
          чекали цікаві активності, нетворкінг, валентинки та солодощі. Дякуємо всім, хто долучився до організації та створив
          святкову атмосферу 🥰
        </p>
      </div>

      <Hero src={hero} />

      {openEvent !== null && (
        <MobileRegistrationModal
          key={openEvent}
          title={`Форма реєстрації на «${EVENTS[openEvent].name}»`}
          confirmText={`Я підтверджую надсилання своєї реєстраційної форми на подію «${EVENTS[openEvent].name}»`}
          thanks="Дякуємо за реєстрацію! Незабаром твою форму обов’язково опрацює адміністратор"
          onClose={() => setOpenEvent(null)}
        />
      )}
    </MPage>
  );
}
