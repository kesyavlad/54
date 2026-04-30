'use client';

const scrollToForm = () => {
  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
};

const vacancies = [
  { ico: '🎯', tag: 'Бойовий розрахунок', title: 'Навідник', desc: 'Наведення гармати на ціль, точне виконання вогневих завдань.' },
  { ico: '🚁', tag: 'Технології', title: 'Оператор БпЛА', desc: 'Управління дронами для розвідки та коригування вогню.' },
  { ico: '⚙️', tag: 'Техніка', title: 'Водій-механік', desc: 'Керування та обслуговування самохідних артилерійських систем.' },
  { ico: '🏥', tag: 'Медицина', title: 'Медик', desc: 'Надання першої медичної допомоги та евакуація поранених.' },
];

export default function Vacancies() {
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
            <div key={v.title} className="vac-card" onClick={scrollToForm}>
              <div className="vac-ico">{v.ico}</div>
              <div className="vac-tag">{v.tag}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
