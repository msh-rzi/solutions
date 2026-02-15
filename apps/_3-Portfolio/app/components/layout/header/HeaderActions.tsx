import type { Locale } from '@repo/i18n';
import { LanguageSwitcher, ToggleTheme } from '@repo/ui-shadcn';
import { Menu, X } from 'lucide-react';

type HeaderActionsProps = {
  locale: Locale;
  mobileMenuOpen: boolean;
  onLocaleChange: (locale: Locale) => void;
  onMobileMenuToggle: () => void;
};

export function HeaderActions({ locale, mobileMenuOpen, onLocaleChange, onMobileMenuToggle }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <ToggleTheme />

      <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />

      <button
        type="button"
        className="p-2 text-muted-foreground hover:text-foreground lg:hidden"
        onClick={onMobileMenuToggle}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
