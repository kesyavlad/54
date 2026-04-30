export default function About() {
  return (
    <section id="about">
      <div className="container">
          <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <div className="about-split">
          <div>
            <div className="s-label">Про бригаду</div>
            <h2 className="s-title">Артилерія —<br /><em>Бог Війни</em></h2>
            <p>54-та Окрема Артилерійська Бригада (54 ОАБр) — підрозділ Сухопутних військ ЗСУ, сформований у рамках переходу до корпусно-бригадної структури. Входить до складу 17-го Армійського Корпусу.</p>
            <p>На червоному шевроні з золотою облямівкою — стилізований дракон: символ вогневої сили, агресивності та нездоланності. Наш девіз: <strong style={{ color: 'var(--gold)' }}>Vis et Victoria</strong> — Сила і Перемога.</p>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-num">17</div>
                <div className="stat-lbl">Арм. корпус</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">54</div>
                <div className="stat-lbl">Номер бригади</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">2025</div>
                <div className="stat-lbl">Рік формування</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
