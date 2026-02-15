'use client';

import type { Locale } from '@repo/i18n';
import { localeLabels, locales, type LocaleLabelMap } from '@repo/i18n';
import { Check, Globe } from 'lucide-react';
import { cn } from '../utils';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export type LanguageSwitcherProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  langs?: readonly Locale[];
  labels?: LocaleLabelMap;
  className?: string;
  contentAlign?: 'start' | 'center' | 'end';
};

export function LanguageSwitcher({ locale, onLocaleChange, langs = locales, labels, className, contentAlign = 'start' }: LanguageSwitcherProps) {
  const mergedLabels = { ...localeLabels, ...labels };
  const activeLabel = mergedLabels[locale] ?? locale;

  const onLocaleSelect = (selectedLocale: Locale) => {
    if (selectedLocale !== locale) {
      onLocaleChange(selectedLocale);

      document.documentElement.lang = selectedLocale;
      document.documentElement.dir = selectedLocale === 'persian' ? 'rtl' : 'ltr';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={cn('gap-2', className)}>
          <Globe size={16} />
          <span className="text-xs font-semibold tracking-wide">{activeLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={contentAlign}>
        {langs.map((lang) => {
          const isActive = lang === locale;

          return (
            <DropdownMenuItem key={lang} onClick={() => onLocaleSelect(lang)} className={cn('justify-between', isActive && 'bg-accent')}>
              <span>{mergedLabels[lang] ?? lang}</span>
              {isActive ? <Check size={14} /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

