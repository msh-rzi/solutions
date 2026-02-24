import { getPortfolioDictionary } from '../../getPortfolioDictionary';
import type { ExampleLocaleProps } from '../../types';
import { getWorkspaceProjects } from './projectInventory';

export async function Projects({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);
  const projects = await getWorkspaceProjects();
  const cardClassName =
    'rounded-2xl border border-border/60 bg-card/80 p-6 shadow-ambient transition duration-300';

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">{t.projects.title}</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">{t.projects.subtitle}</h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{t.projects.description}</p>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((project) => {
              const cardBody = (
                <article
                  className={`${cardClassName}${project.appUrl ? ' cursor-pointer hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">{project.category}</p>
                    <span className="rounded-full border border-border/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      {project.packageName}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl text-foreground">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                  <div className="mt-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{t.projects.pathLabel}</p>
                    <p className="mt-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">{project.path}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{t.projects.stackLabel}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.stack.map((entry) => (
                        <span key={entry} className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-xs text-muted-foreground">
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );

              if (!project.appUrl) {
                return <div key={project.id}>{cardBody}</div>;
              }

              return (
                <a
                  key={project.id}
                  href={project.appUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${project.title}`}
                  className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {cardBody}
                </a>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-border/60 bg-card/70 p-6 text-sm text-muted-foreground">{t.projects.empty}</p>
        )}
      </div>
    </section>
  );
}
