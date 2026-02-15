import { getDictionary } from '@repo/i18n';
import { portfolioDictionaries } from '@repo/i18n/portfolio';
import { Button, ToggleTheme } from '@repo/ui-shadcn';

export default function Home() {
  const t = getDictionary(portfolioDictionaries, 'english');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{t.heading}</h1>
          <p className="text-zinc-700 dark:text-zinc-300">{t.description}</p>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-4 py-2 text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {t.cta}
          </button>
          <p>فارسی</p>
          <ToggleTheme />
          <Button variant="default">shadcn Button</Button>
          <p>english</p>
        </section>
      </main>
    </div>
  );
}

