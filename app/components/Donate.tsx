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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a
              href="https://razom.com/brygady/54-okrema-artyleriyska-bryhada?fbclid=PAVERFWARgCZ5leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafZEMDPZyEIH0lw4OibYHq51C-30U9wv58f_pnisDg8_0lFnXVS-87fNV4vHQ_aem_Fj2g2hjtdU0KAveZtmx-yA"
              className="btn-p"
              target="_blank"
              rel="noopener noreferrer"
            >
              Задонатити через Razom
            </a>
            <a
              href="https://tviykrok.com.ua/projects/maysterni/workshop-54abr/?fbclid=PAdGRleARgCcFleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAaeS5YLqwhU_-XVwanfE-2-XM2zEerxzeNuRY_oVkc4WPZobeyl1qdm3SCxjug_aem_48YEvmMR1g4NFRsosF7nMg"
              className="btn-s"
              target="_blank"
              rel="noopener noreferrer"
            >
              Твій крок — Майстерня
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
