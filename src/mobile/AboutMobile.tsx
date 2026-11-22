import React, { useState } from 'react';
import org1 from '../assets/org1.jpg';
import org2 from '../assets/org2.jpg';
import {
  MPage, Btn, OvalPhoto, TgTag, MobileRegistrationModal, useDark,
  hStyle, pStyle, GREEN, DARK, MINT, NIGHT, UNBOUNDED,
} from './kit';

type Member = {
  role: [string, string];
  name: [string, string];
  tag?: { text: string; link: string };
  photo: string;
  empty?: boolean;
};

/* смужка соцмереж */
function SocialBar({ links }: { links: { instagram: string; youtube: string; tiktok: string } }) {
  const pill = (href: string, label: string, bg: string, glyph: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 'min(82px, 25vw)',
        alignSelf: 'stretch',
        borderRadius: 9999,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {glyph}
    </a>
  );
  return (
    <div
      style={{
        height: 58,
        borderRadius: 9999,
        backgroundColor: GREEN,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 'min(22px, 5vw)',
      }}
    >
      {pill(
        links.instagram,
        'Instagram',
        DARK,
        <svg viewBox="0 0 56 56" aria-hidden="true" style={{ width: 40, height: 40 }}>
          <rect width="56" height="56" rx="14" fill={MINT} />
          <circle cx="28" cy="28" r="11" fill="none" stroke={DARK} strokeWidth="5" />
          <circle cx="43" cy="13" r="3.2" fill={DARK} />
        </svg>
      )}
      {pill(
        links.youtube,
        'YouTube',
        MINT,
        <svg viewBox="0 0 71 50" aria-hidden="true" style={{ width: 50, height: 35 }}>
          <rect width="71" height="50" rx="15" fill={DARK} />
          <path d="M28 14.5v21L46.5 25z" fill={MINT} />
        </svg>
      )}
      {pill(
        links.tiktok,
        'TikTok',
        DARK,
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 38, height: 38 }}>
          <path
            fill={MINT}
            d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.76.15-3.58 1.15-5.09 1.25-1.9 3.42-3.13 5.73-3.23l.03 4.17c-1.34.02-2.58.74-3.26 1.88-.34.56-.54 1.23-.55 1.89-.01 1.05.41 2.08 1.16 2.82.91.9 2.29 1.28 3.56.96 1.26-.31 2.29-1.28 2.65-2.54.17-.61.22-1.25.21-1.88-.04-4.83-.01-9.67-.03-14.5z"
          />
        </svg>
      )}
    </div>
  );
}

const title: React.CSSProperties = { ...hStyle, fontSize: 22 };

export default function AboutMobile({
  links,
  team,
}: {
  links: { instagram: string; youtube: string; tiktok: string };
  team: Member[];
}) {
  const dark = useDark();
  const [openModal, setOpenModal] = useState(false);

  return (
    <MPage>
      <SocialBar links={links} />

      <h2 style={title}>Організація студентської молоді (самоврядування)</h2>
      <p style={pStyle}>
        — це простір для реалізації сміливих ідей та активного студентського життя.{' '}
        <b>Тут твоя ініціатива, від крутих івентів до корисних проєктів, отримує підтримку</b>
      </p>
      <p style={pStyle}>
        Бути частиною нашої команди — це можливість розвивати навички, працювати над реальними проєктами та знайти
        однодумців. <b>Ми чекаємо на тих, хто готовий діяти, нестандартно мислити й робити наш коледж кращим.</b>
      </p>
      <p style={pStyle}>
        <b>Це твій шанс розкрити потенціал і творити історію нашого коледжу</b>
      </p>

      <OvalPhoto src={org1} alt="Студенти" align="left" greenW={513} photoW={476} />

      {/* плашка Email: виходить з лівого краю, як у макеті */}
      <div
        style={{
          margin: '0 0 0 -16px',
          padding: '14px 22px 14px 18px',
          backgroundColor: GREEN,
          color: MINT,
          borderTopRightRadius: 9999,
          borderBottomRightRadius: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <svg viewBox="0 0 57 45" aria-hidden="true" style={{ width: 38, height: 30, flexShrink: 0 }}>
          <path fill={MINT} d="M0 9C0 4 4 0 9 0h.6l18.9 17L47.4 0h.6c5 0 9 4 9 9v36H46V19.5L28.5 35 11 19.5V45H0z" />
        </svg>
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...pStyle, fontSize: 14, fontWeight: 500 }}>Залишилися питання? Надішли нам лист!</span>
          <a
            href="mailto:organizaciastudentskoimolodi@gmail.com"
            style={{ ...pStyle, fontSize: 14, fontWeight: 700, color: MINT, textDecoration: 'none', overflowWrap: 'anywhere' }}
          >
            organizaciastudentskoimolodi@gmail.com
          </a>
        </div>
      </div>

      <h2 style={title}>Структура студради ВСП “ХКТФК НТУ “ХПІ”</h2>
      <OvalPhoto src={org2} alt="Структура студради" align="right" greenW={521} photoW={481} />
      <p style={{ ...pStyle, fontWeight: 700 }}>
        Студрада — це команда студентів, яка представляє їхні інтереси, розвиває студентське життя та створює можливості для активної участі
      </p>
      <p style={pStyle}>
        Голова Студради керує роботою команди, координує діяльність та представляє інтереси студентів. Перший заступник Голови
        допомагає в організації роботи, координує завдання та за потреби замінює Голову. Секретар відповідає за документацію,
        протоколи та організаційні питання
      </p>
      <p style={pStyle}>
        Окремі напрями роботи забезпечують міністерства. Кожне має свою сферу діяльності та відповідає за проєкти й заходи: від
        освіти та спорту до культури, інформації й екології
      </p>

      <button
        type="button"
        onClick={() => setOpenModal(true)}
        style={{
          alignSelf: 'center',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '16px 30px',
          borderRadius: 9999,
          border: 0,
          backgroundColor: DARK,
          color: MINT,
          cursor: 'pointer',
          fontFamily: UNBOUNDED,
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        Тиць, аби долучитися до нашої спільноти
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 4 }}>
        {team.map((m) => (
          <div key={m.role[0] + m.name[1]} data-reveal style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  backgroundColor: GREEN,
                  color: MINT,
                  borderRadius: 22,
                  padding: '14px 8px',
                  textAlign: 'center',
                  fontFamily: UNBOUNDED,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 11.5, lineHeight: 1.25 }}>
                  {m.role.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
                <div style={{ fontWeight: 500, fontSize: 11, lineHeight: 1.25 }}>
                  {m.name.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
              </div>
              {m.tag && <TgTag text={m.tag.text} link={m.tag.link} />}
            </div>

            <div
              style={{
                width: '44%',
                flexShrink: 0,
                aspectRatio: '1 / 1',
                position: 'relative',
                boxSizing: 'border-box',
                borderRadius: '50%',
                border: `6px solid ${GREEN}`,
                overflow: 'hidden',
                backgroundColor: dark ? NIGHT : MINT,
              }}
            >
              {m.empty ? (
                <>
                  <span style={{ position: 'absolute', left: '33.3%', top: '9.3%', width: '32.9%', height: '32.9%', borderRadius: '50%', backgroundColor: GREEN }} />
                  <span style={{ position: 'absolute', left: '13.5%', top: '51.5%', width: '72.6%', height: '39.7%', borderRadius: '50%', backgroundColor: GREEN }} />
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
          </div>
        ))}
      </div>

      {openModal && (
        <MobileRegistrationModal
          title="Форма реєстрації в «ОСМ»"
          confirmText="Я підтверджую надсилання своєї реєстраційної форми в «ОСМ»"
          thanks="Дякуємо за реєстрацію! Незабаром твою форму обов’язково опрацює адміністратор"
          onClose={() => setOpenModal(false)}
        />
      )}
    </MPage>
  );
}
