import { getPortfolioDictionary } from '../../getPortfolioDictionary';
import { ExampleLocaleProps } from '../../types';
import { SkillGroup } from './SkillGroup';
import { skillsCatalog } from './skillsCatalog';

export function Skills({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">{t.skills.title}</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">{t.skills.subtitle}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">{t.skills.description}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {skillsCatalog.map((group) => (
            <SkillGroup key={group.title} title={group.title} items={group.items} caption={t.skills.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}

