import React, { useState } from 'react';
import kitten from '../assets/kitten.jpeg';
import fund1 from '../assets/fund1.jpg';
import fund2 from '../assets/fund2.jpeg';
import fund3 from '../assets/fund3.jpeg';
import fund4 from '../assets/fund4.png';
import fund5 from '../assets/fund5.png';
import archive from '../assets/archive-shelter.jpg';
import hero from '../assets/horses.jpg';
import {
  MPage, Pill, Btn, Frame, Hero, OvalPhoto, MobileRegistrationModal,
  hStyle, pStyle, GREEN, UNBOUNDED, ONEST,
} from './kit';

const INITIATIVE_NAME = 'Допоможімо безпритульним котикам';

const FUNDS = [
  {
    src: fund1,
    name: ['Фонд', '“Повернись', 'живим”'],
    text: 'Фонд допомоги військовим та волонтерам на території ведення активних бойових дій',
    href: 'https://savelife.in.ua/',
  },
  {
    src: fund2,
    name: ['Фонд', 'Сергія', 'Притули'],
    text: 'Фонд забезпечення СОУ та допомоги цивільним на деокупованих і прифронтових територіях',
    href: 'https://prytulafoundation.org/about?gad_source=1&gad_campaignid=22705077303&gbraid=0AAAAAqGbiEhHnW3ieC4A01M31rhNtIic3&gclid=CjwKCAiAkrbXBhB2EiwA2y1E3qdbew_bCZb3733sFbQlJYoc-YQ9cZzRnwTcG7lcoHeGx33O_u8qyxoCk-wQAvD_BwE',
  },
  {
    src: fund3,
    name: ['Фонд', '“Спільнота', 'Стеренка”'],
    text: 'Фонд забезпечення СБУ безпілотними технологіями, ударними FPV-дронами та з/п ворожим БПЛА',
    href: 'https://www.sternenkofund.org/',
  },
  {
    src: fund4,
    name: ['Фонд', '“Армія', 'SOS”'],
    text: 'Фонд автоматизації управління військами, повітряної розвідки та технічного переоснащення підрозділів',
    href: 'https://armysos.com.ua/uk/',
  },
  {
    src: fund5,
    name: ['Фонд', '“Razom for', 'Ukraine”'],
    text: 'Фонд забезпечення тех. медициною, засобами зв’язку та іншим обладнанням для медиків',
    href: 'https://www.razomforukraine.org/ua/home_ua/',
  },
];

const title: React.CSSProperties = { ...hStyle, fontWeight: 500, fontSize: 20 };

export default function VolunteeringMobile() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <MPage>
      <h1 style={title}>Наразі іде набір лише на одну волонтерську ініціативу</h1>

      <Frame src={kitten} alt={INITIATIVE_NAME} ratio="448 / 336" />
      <h3 style={title}>Допоможімо безпритульним котикам! 🐱</h3>
      <p style={pStyle}>
        Ми вже зібрали кошти на корм для котиків, які не мають власного дому та перебувають у притулку в Харкові. Тепер шукаємо
        охочих, які готові поїхати разом із нами, щоб закупити корм і подарувати пухнастикам трохи турботи.
      </p>
      <Btn inline onClick={() => setOpenModal(true)}>
        Долучитися
      </Btn>

      <p style={{ ...pStyle, fontWeight: 700 }}>
        Також трохи нижче ми підготували декілька фондів, до яких ви можете долучитися та підтримати важливі ініціативи 💚
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '26px 14px' }}>
        {FUNDS.map((f, i) => (
          <div
            key={f.href}
            data-reveal
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 10,
              /* непарний останній фонд стоїть по центру рядка */
              ...(FUNDS.length % 2 === 1 && i === FUNDS.length - 1
                ? { gridColumn: '1 / -1', justifySelf: 'center', width: 'calc((100% - 14px) / 2)' }
                : {}),
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                boxSizing: 'border-box',
                border: `6px solid ${GREEN}`,
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img src={f.src} alt={f.name.join(' ')} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <h3 style={{ margin: 0, fontFamily: UNBOUNDED, fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>
              {f.name.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </h3>
            <p style={{ margin: 0, fontFamily: ONEST, fontSize: 14, lineHeight: 1.4, flex: 1 }}>{f.text}</p>
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                alignSelf: 'stretch',
                boxSizing: 'border-box',
                padding: '10px 6px',
                borderRadius: 9999,
                backgroundColor: GREEN,
                color: '#ECFDF5',
                fontFamily: UNBOUNDED,
                fontWeight: 500,
                fontSize: 12,
                lineHeight: 1.3,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Долучитися
              <br />
              до зборів
            </a>
          </div>
        ))}
      </div>

      <Pill>Архів зборів</Pill>

      <OvalPhoto src={archive} alt="Збір для притулку тварин у м. Змієві" align="left" greenW={514} photoW={477} />

      <h3 style={title}>Збір для притулку тварин у м. Змієві</h3>
      <p style={pStyle}>
        Завдяки спільним зусиллям вдалося зібрати необхідну допомогу для притулку. <b>19 листопада 2025 року</b> Катерина
        Тресницька особисто відвідала притулок та передала зібраний корм і допомогу тваринам. Дякуємо всім студентам і
        викладачам, які долучилися до збору, підтримали його та допомогли зробити добру справу! 🐾
      </p>

      <Hero src={hero} />

      {openModal && (
        <MobileRegistrationModal
          title={`Форма реєстрації на ініціативу «${INITIATIVE_NAME}»`}
          confirmText={`Я підтверджую надсилання своєї реєстраційної форми на ініціативу «${INITIATIVE_NAME}»`}
          thanks="Дякуємо за реєстрацію! Незабаром твою форму обов’язково опрацює адміністратор"
          onClose={() => setOpenModal(false)}
        />
      )}
    </MPage>
  );
}
