export default function Socials() {
  return (
    <section id="socials">
      <div className="container" style={{ textAlign: 'center' }}>
         <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <h2 style={{ fontFamily: "'Russo One',sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, textTransform: 'uppercase', color: '#fff', letterSpacing: '.04em', marginBottom: '1rem' }}>
          СЛІДКУЙ ЗА <em style={{ color: 'var(--red-b)', fontStyle: 'normal' }}>54 ОАБр</em>
        </h2>
        <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Новини, фоторепортажі, відеосюжети та відео бойової роботи.<br />Підпишіться та будьте в курсі!
        </p>
        <div className="big-socials">
          <a href="https://www.facebook.com/share/1J5QqWZHG4/" target="_blank" rel="noreferrer" className="big-soc" title="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.youtube.com/@54oabr" target="_blank" rel="noreferrer" className="big-soc" title="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
          </a>
          <a href="https://www.instagram.com/54oabr?igsh=Y2dxOGs4am8zcWg2" target="_blank" rel="noreferrer" className="big-soc" title="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.tiktok.com/@54_oabr" target="_blank" rel="noreferrer" className="big-soc" title="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
          </a>
          <a href="https://t.me/army_54oabr" target="_blank" rel="noreferrer" className="big-soc" title="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </a>
          {/* <a href="#" className="big-soc" title="X (Twitter)">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a> */}
          <a href="https://lobbyx.army/brigades/54-okrema-artyleriiska-bryhada/" target="_blank" rel="noreferrer" className="big-soc" title="LobbyX" style={{ fontFamily: "'Russo One',sans-serif", fontSize: '2rem', letterSpacing: '.05em' }}>
            LX
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
