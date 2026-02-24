import { About, Contact, Footer, Header, Hero, Projects, Skills } from '../../components';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
