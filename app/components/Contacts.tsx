export default function Contacts() {
  return (
    <section id="contacts">
      <div className="container">
         <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <div className="s-label">Зв&apos;язок</div>
        <h2 className="s-title"><em>Контакти</em></h2>
        <div className="contacts-grid">
          <a href="https://t.me/army_54oabr" target="_blank" rel="noreferrer" className="c-card">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </div>
            <h2 >Telegram</h2>
            <span style={{ color: '#fff' }}>@army_54oabr</span>
          </a>
          <a href="tel:+380967108774" className="c-card">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.63 5 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-1.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h2>Телефон</h2>
            <span style={{ color: '#fff' }}>096-710-87-74</span>
          </a>
          <a href="https://www.instagram.com/54oabr?igsh=Y2dxOGs4am8zcWg2" target="_blank" rel="noreferrer" className="c-card">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <h2>Instagram</h2>
            <span style={{ color: '#fff' }}>@54oabr</span>
          </a>
          <div className="c-card">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h2>Графік роботи</h2>
            <p>Пн–Пт: 9:00–18:00</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
