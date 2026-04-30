'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-logo">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="54 ОАБр" width={36} height={36} />
        <p style={{ fontFamily: "'Russo One',sans-serif", fontSize: 'clamp(1rem,5vw,1rem)', fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>54 ОАБр
        </p>
      </div>

      <ul
        className="nav-links"
        style={
          menuOpen
            ? {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '64px',
                left: 0,
                right: 0,
                background: 'rgba(5,1,1,0.98)',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(200,168,75,.2)',
                gap: '1.25rem',
                zIndex: 99,
              }
            : undefined
        }
      >
        <li><a href="#about" onClick={closeMenu}>Про бригаду</a></li>
        <li><a href="#vacancies" onClick={closeMenu}>Вакансії</a></li>
        <li><a href="#contacts" onClick={closeMenu}>Контакти</a></li>
        <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
        <li><a href="#form-section" onClick={closeMenu}>Заявка</a></li>
      </ul>

      <a href="#form-section" className="nav-cta">Вступити</a>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
