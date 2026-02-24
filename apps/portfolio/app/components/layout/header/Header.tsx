'use client';

import { useMemo, useState } from 'react';
import { getDictionary, type Locale } from '@repo/i18n';
import { portfolioDictionaries } from '@repo/i18n/portfolio';
import { HeaderActions } from './HeaderActions';
import { HeaderBrand } from './HeaderBrand';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileNav } from './HeaderMobileNav';
import { buildHeaderNavItems } from './buildHeaderNavItems';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>('english');

  const t = getDictionary(portfolioDictionaries, locale);
  const navItems = useMemo(() => buildHeaderNavItems(t), [t]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/60">
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <HeaderBrand brand={t.nav.brand} brandMark={t.nav.brandMark} tagline={t.nav.tagline} />

          <HeaderDesktopNav items={navItems} />

          <HeaderActions locale={locale} mobileMenuOpen={mobileMenuOpen} onLocaleChange={setLocale} onMobileMenuToggle={() => setMobileMenuOpen((isOpen) => !isOpen)} />
        </div>

        <HeaderMobileNav items={navItems} isOpen={mobileMenuOpen} onItemClick={() => setMobileMenuOpen(false)} />
      </nav>
    </header>
  );
}

