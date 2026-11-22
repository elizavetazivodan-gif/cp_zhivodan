import React from 'react';
import cat from '../assets/cat-notebook.png';
import doc1 from '../assets/doc-statut.jpg';
import doc2 from '../assets/doc-polozhennya.jpg';
import hero from '../assets/team-selfie.jpg';
import { MPage, Btn, Frame, Hero, hStyle, UNBOUNDED } from './kit';

export default function DocumentsMobile({
  docsUrl,
  statutUrl,
  polozhennyaUrl,
}: {
  docsUrl: string;
  statutUrl: string;
  polozhennyaUrl: string;
}) {
  const caption: React.CSSProperties = { margin: 0, textAlign: 'center', fontFamily: UNBOUNDED, fontWeight: 500, fontSize: 13, lineHeight: 1.3 };
  const link: React.CSSProperties = { color: 'inherit', textDecoration: 'none' };
  const docText: React.CSSProperties = { margin: 0, fontFamily: UNBOUNDED, fontWeight: 400, fontSize: 13, lineHeight: 1.45 };

  return (
    <MPage>
      <h1 style={{ ...hStyle, fontWeight: 500, fontSize: 20 }}>
        Наша діяльність здійснюється згідно до ст. 41 Закону Про фахову перед вищу освіту
      </h1>
      <Btn inline href={docsUrl}>
        Переглянути документообіг і звітність
      </Btn>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <img src={cat} alt="Котик із зошитом" style={{ width: '38%', flexShrink: 0, objectFit: 'contain' }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
          <p style={docText}>Також ми працюємо згідно до нормативно-правових документів:</p>
          <ol style={{ ...docText, margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>
              <a href={statutUrl} target="_blank" rel="noopener noreferrer" style={link}>
                Статут Організації студентського самоврядування у ВСП “ХКТФК НТУ “ХПІ”
              </a>
            </li>
            <li>
              <a href={polozhennyaUrl} target="_blank" rel="noopener noreferrer" style={link}>
                Положення про студентське самоврядування у ВСП “ХКТФК НТУ “ХПІ”
              </a>
            </li>
          </ol>
        </div>
      </div>

      {/* два документи поруч, як у макеті */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Frame src={doc1} alt="Статут ОСС" ratio="420 / 619" href={statutUrl} />
          <p style={caption}>Статут ОСС</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Frame src={doc2} alt="Положення про ОСС" ratio="420 / 619" href={polozhennyaUrl} />
          <p style={caption}>Положення про ОСС</p>
        </div>
      </div>

      <Hero src={hero} height={240} />
    </MPage>
  );
}
