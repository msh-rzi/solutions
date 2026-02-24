import type { ExampleLocaleProps } from '../../types';
import { getPortfolioDictionary } from '../../getPortfolioDictionary';

export function Footer({ locale = 'english' }: ExampleLocaleProps) {
  const t = getPortfolioDictionary(locale);

  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.footer.credit}</p>
        <p className="text-sm text-muted-foreground">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

