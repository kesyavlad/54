import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <Image src="/logo.png" alt="54 ОАБр" width={50} height={50} style={{ width: '50px', height: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
      <div className="f-name">54-та Окрема Артилерійська Бригада</div>
      <div className="f-sub">Vis et Victoria · 17-й Армійський Корпус · Сухопутні Війська ЗСУ</div>
      <div className="f-links">
        <a href="#about">Про бригаду</a>
        <a href="#vacancies">Вакансії</a>
        <a href="#form-section">Заявка</a>
        <a href="#contacts">Контакти</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="slava">Слава Україні!</div>
      <div className="f-copy">© 2025 54 ОАБр · Збройні Сили України</div>
    </footer>
  );
}
