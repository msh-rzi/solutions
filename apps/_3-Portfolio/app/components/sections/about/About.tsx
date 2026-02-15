import { getPortfolioDictionary } from '../../getPortfolioDictionary';
import { ExampleLocaleProps } from '../../types';
import { AboutFocusList } from './AboutFocusList';

export function About({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">{t.about.title}</p>
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">{t.about.p1}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.about.p2}</p>
        </div>

        <div className="space-y-6">
          <p className="leading-relaxed text-muted-foreground">{t.about.p3}</p>
          <AboutFocusList items={t.about.focusItems} title={t.about.focusTitle} />
        </div>
      </div>
    </section>
  );
}

