export default function Donate() {
  return (
    <section id="donate">
      <div className="container">
         <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <div className="donate-wrap">
          <div className="s-label" style={{ justifyContent: 'center' }}>Підтримка бригади</div>
          <h2 className="s-title" style={{ textAlign: 'center' }}>Підтримайте <em>54 ОАБр</em></h2>
          <p>Кожна ваша гривня — це зміцнений фронт та збережені життя наших бійців. Надійний тил — сильний фронт!</p>
          <a href="#contacts" className="btn-p" style={{ marginTop: '2rem', display: 'inline-block' }}>Зв&apos;язатись з нами</a>
        </div>
      </div>
      </div>
    </section>
  );
}
