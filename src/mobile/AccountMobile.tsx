import React from 'react';
import cat from '../assets/cat-helmet.png';
import { MPage, GREEN, MINT, UNBOUNDED } from './kit';

export default function AccountMobile() {
  return (
    <MPage>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src={cat} alt="Котик у касці з викруткою" style={{ width: '46%', flexShrink: 0, objectFit: 'contain' }} />
        <h1
          style={{
            margin: 0,
            flex: 1,
            textAlign: 'center',
            padding: '12px 0',
            borderRadius: 9999,
            backgroundColor: GREEN,
            color: MINT,
            fontFamily: UNBOUNDED,
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1,
          }}
        >
          ОЙ!
        </h1>
      </div>

      <div style={{ backgroundColor: GREEN, color: MINT, borderRadius: 40, padding: '26px 24px' }}>
        <p style={{ margin: 0, fontFamily: UNBOUNDED, fontWeight: 500, fontSize: 20, lineHeight: 1.35 }}>
          Вхід тимчасово недоступний... Ця функція буде розблокована для презентації дипломного проєкту!
        </p>
      </div>
    </MPage>
  );
}
