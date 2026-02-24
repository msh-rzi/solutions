'use client';

import { useState } from 'react';
import type { Locale } from '@repo/i18n';
import { ScrollArea, ScrollBar } from '@repo/ui-shadcn';
import { About, Contact, Footer, Header, Hero, Projects, Skills } from '../../components';
import type { WorkspaceProject } from '../../components/sections/projects/projectInventory';

type HomePageClientProps = {
  initialLocale?: Locale;
  projects: readonly WorkspaceProject[];
};

export function HomePageClient({ initialLocale = 'english', projects }: HomePageClientProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  return (
    <div className="h-screen bg-background font-sans">
      <Header locale={locale} onLocaleChange={setLocale} />

      <ScrollArea className="h-screen">
        <main>
          <Hero locale={locale} />
          <About locale={locale} />
          <Skills locale={locale} />
          <Projects locale={locale} projects={projects} />
          <Contact locale={locale} />
        </main>

        <Footer locale={locale} />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
