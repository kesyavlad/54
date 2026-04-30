import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Vacancies from './components/Vacancies';
import FormSection from './components/FormSection';
import Contacts from './components/Contacts';
import FAQ from './components/FAQ';
import Socials from './components/Socials';
import Donate from './components/Donate';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="divider"></div>

      {/* Dragon tail block: About → Socials */}
      <div style={{ position: 'relative' }}>
        {/* Dragon image stretched across this block only */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/dragon-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,1,1,0.35) 0%, rgba(8,1,1,0.25) 40%, rgba(8,1,1,0.30) 70%, rgba(8,1,1,0.40) 100%)',
          }} />
        </div>

        {/* Sections */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <About />
          <div className="divider"></div>
          <Vacancies />
          <div className="divider"></div>
          <FormSection />
          <div className="divider"></div>
          <Contacts />
          <div className="divider"></div>
          <FAQ />
          <div className="divider"></div>
          <Socials />
          <div className="divider"></div>
          <Donate />
        </div>
      </div>

      <Footer />
    </>
  );
}
