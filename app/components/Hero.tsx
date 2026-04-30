import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: 0 }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/hero.png`}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,0,0,0.55) 0%, rgba(4,0,0,0.45) 60%, rgba(4,0,0,0.65) 100%)' }} />
      </div>

      {/* Left (desktop) / Center (mobile): Chevron + Text */}
      <div style={{
        position: 'absolute',
        top: '96px',
        left: 0,
        right: 0,
        zIndex: 1,
        padding: '0 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
        className="hero-content"
      >
        {/* Chevron */}
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
          alt="54 ОАБр"
          width={200}
          height={200}
          style={{
            width: 'clamp(180px, 13vw, 200px)',
            height: 'auto',
            filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.9))',
            marginBottom: '1.5rem',
          }}
        />

        {/* Text */}
        <h1 style={{
          fontFamily: "'Russo One', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(3.5rem, 3.5vw, 3rem)',
          textAlign:'left',
          textTransform: 'uppercase',
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: '1rem',
          letterSpacing: '.02em',
        }}>
          54 Окрема<br />
          Артилерійська<br />
          <em style={{ color: 'var(--red-b)', fontStyle: 'normal' }}>Бригада</em>
        </h1>

        <div style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(1.2rem, 1.8vw, 1.3rem)',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '.3rem',
        }}>
          Vis et Victoria
        </div>
        <div style={{
          fontSize: '.85rem',
          color: 'var(--muted)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
        }}>
          Сила і Перемога
        </div>
      </div>

      {/* Buttons — centered at bottom instead of scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: 0,
        right: 0,
        zIndex: 1,
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 1.5rem',
      }}>
        <a href="#form-section" className="btn-p">Вступити до бригади</a>
        <a href="#about" className="btn-s">Дізнатись більше</a>
      </div>
    </section>
  );
}
