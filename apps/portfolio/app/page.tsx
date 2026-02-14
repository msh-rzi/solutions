import { Button } from '@repo/ui/button';
import { getDictionary } from '@repo/i18n';
import { portfolioDictionaries } from '@repo/i18n/portfolio';

export default function Home() {
  const t = getDictionary(portfolioDictionaries, 'english');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{t.heading}</h1>
          <p className="text-zinc-700 dark:text-zinc-300">{t.description}</p>
          <Button appName="portfolio">{t.cta}</Button>
        </section>
      </main>
    </div>
  );
}
