import Link from 'next/link';
import { ArrowRight, Mail, Download } from 'lucide-react';
import { Button } from '@repo/ui-shadcn';
import { buildHeroHighlights } from './buildHeroHighlights';
import { HeroHighlights } from './HeroHighlights';
import { HeroSnapshot } from './HeroSnapshot';
import { ExampleLocaleProps } from '../../types';
import { getPortfolioDictionary } from '../../getPortfolioDictionary';

function downloadResume() {
  const lang = document.documentElement.lang || 'english';
  console.log({ lang });
  const link = document.createElement('a');
  const resumePath = lang === 'english' ? '/Mehdi_Rezaei_Fullstack_Engineer_EN_2026.pdf' : '/Mehdi_Rezaei_Fullstack_Engineer_DE_2026.pdf';
  link.href = resumePath;
  const langLabel = lang === 'english' ? 'EN' : 'DE';
  link.download = `Mehdi_Rezaei_Fullstack_Engineer_${langLabel}_2026.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function Hero({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);
  const highlightItems = buildHeroHighlights(t.hero.highlights);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{t.hero.title}</p>
          <h1 className="mb-6 mt-4 text-balance font-display text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">{t.hero.name}</h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-6 shadow-ambient">
              <Link href="/#projects">
                {t.hero.cta}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full border-border/70 px-6">
              <Link href="#contact">
                <Mail className="me-2 h-4 w-4" />
                {t.hero.contact}
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="rounded-full px-6 shadow-ambient cursor-pointer" onClick={downloadResume}>
              <Download className="me-2 h-4 w-4" />
              {t.hero.downloadResume}
            </Button>
          </div>

          <HeroHighlights items={highlightItems} label={t.hero.highlightsLabel} />
        </div>

        <HeroSnapshot items={t.hero.snapshotItems} title={t.hero.snapshotTitle} />
      </div>
    </section>
  );
}

