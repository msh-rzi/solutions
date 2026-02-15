import { About, Contact, Footer, Header, Hero, Skills } from '../../components';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
