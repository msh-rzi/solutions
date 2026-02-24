import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@repo/ui-shadcn';
import { getPortfolioDictionary } from '../../getPortfolioDictionary';
import type { ExampleLocaleProps } from '../../types';
import { renderTextWithBold } from './renderTextWithBold';
import { sectionLinks } from './sectionLinks';
import type { ExpertiseCategory } from './types';

export function Expertise({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);
  const problemCategories: ExpertiseCategory[] = [
    { categoryKey: 'frontend', problems: t.expertise.items.frontend },
    { categoryKey: 'backend', problems: t.expertise.items.backend },
    { categoryKey: 'saas', problems: t.expertise.items.saas },
  ];

  return (
    <section id="expertise" className="relative px-6 pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl">
        <Button asChild variant="ghost" size="sm" className="mb-10">
          <Link href="/">
            <ArrowLeft className="me-2 h-4 w-4" />
            {t.expertise.back}
          </Link>
        </Button>

        <h1 className="mb-4 font-display text-4xl text-foreground sm:text-5xl">{t.expertise.title}</h1>
        <p className="mb-16 max-w-3xl leading-relaxed text-muted-foreground">{t.expertise.subtitle}</p>

        <div className="space-y-20">
          {problemCategories.map((category) => (
            <section key={category.categoryKey} className="space-y-8">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{t.expertise.categoryLabel}</p>
                <h2 className="font-display text-2xl text-foreground sm:text-3xl">{t.expertise.categories[category.categoryKey]}</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {category.problems.map((item) => (
                  <div
                    key={item.problem}
                    className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-ambient"
                  >
                    <h3 className="mb-4 text-lg font-semibold leading-snug text-foreground">{renderTextWithBold(item.problem)}</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p className="text-pretty">
                        <span className="font-semibold text-primary">{t.expertise.whyMatters} </span>
                        {renderTextWithBold(item.why)}
                      </p>
                      <p>
                        <span className="font-semibold text-primary">{t.expertise.approach} </span>
                        {renderTextWithBold(item.approach)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link href={sectionLinks[category.categoryKey]} className="text-sm font-semibold text-primary hover:underline">
                  {t.expertise.viewSource}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
