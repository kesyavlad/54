'use client';

import { useState } from 'react';

const scrollToForm = () => {
  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
};

const vacancies = [
  { title: 'Навідник' },
  { title: 'Оператор БпЛА', drone: true, desc: 'Управління дронами для розвідки та коригування вогню.' },
  { title: 'Водій-механік' },
  { title: 'Медик' },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Vacancies() {
  const [droneHovered, setDroneHovered] = useState(false);

  return (
    <section id="vacancies">
      <div className="container">
         <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <div className="s-label">Відкриті позиції</div>
        <h2 className="s-title">Випалюй ворога <em>з нами</em></h2>

        <div className="vac-grid">
          {vacancies.map((v) => (
            <div
              key={v.title}
              className={`vac-card${v.drone ? ' vac-card--drone' : ''}`}
              onClick={scrollToForm}
              onMouseEnter={v.drone ? () => setDroneHovered(true) : undefined}
              onMouseLeave={v.drone ? () => setDroneHovered(false) : undefined}
            >
              {v.drone && (
                <>
                  <img src={`${basePath}/first.jpeg`} alt="" aria-hidden className="drone-img" style={{ opacity: droneHovered ? 0 : 1 }} />
                  <img src={`${basePath}/second.jpeg`} alt="" aria-hidden className="drone-img" style={{ opacity: droneHovered ? 1 : 0 }} />
                  <div className="drone-overlay" />
                </>
              )}
              <div
                className="drone-text"
                style={v.drone ? { transform: droneHovered ? 'translateY(-1.5rem)' : 'translateY(0)' } : undefined}
              >
                <h3>{v.title}</h3>
                {v.desc && (
                  <p className="drone-desc" style={{ opacity: droneHovered ? 1 : 0, maxHeight: droneHovered ? '6rem' : '0' }}>
                    {v.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
