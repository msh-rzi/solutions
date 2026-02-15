import { Button } from '@repo/ui-shadcn';
import { ContactSocialLink } from './ContactSocialLink';
import { socialLinks } from './socialLinks';
import { ExampleLocaleProps } from '../../types';
import { getPortfolioDictionary } from '../../getPortfolioDictionary';

export function Contact({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-10 shadow-ambient md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
          <div className="relative grid items-start gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">{t.contact.title}</p>
              <h2 className="mb-4 mt-4 text-balance font-display text-3xl text-foreground sm:text-4xl">{t.contact.heading}</h2>
              <p className="max-w-xl leading-relaxed text-muted-foreground">{t.contact.description}</p>

              <Button asChild className="mt-6 rounded-full px-6 shadow-ambient">
                <a href="mailto:hello@mehdi.dev">{t.contact.cta}</a>
              </Button>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <ContactSocialLink key={link.name} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

