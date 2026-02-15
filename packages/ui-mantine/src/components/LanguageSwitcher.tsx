'use client';

import type { Locale } from '@repo/i18n';
import { localeLabels, locales, type LocaleLabelMap } from '@repo/i18n';
import { Button, Menu } from '@mantine/core';

export type MantineLanguageSwitcherProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  langs?: readonly Locale[];
  labels?: LocaleLabelMap;
};

export function MantineLanguageSwitcher({ locale, onLocaleChange, langs = locales, labels }: MantineLanguageSwitcherProps) {
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
    <Menu shadow="md" width={180} withinPortal>
      <Menu.Target>
        <Button variant="default" size="xs">
          {activeLabel}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {langs.map((lang) => (
          <Menu.Item key={lang} onClick={() => onLocaleSelect(lang)} fw={lang === locale ? 600 : 400}>
            {mergedLabels[lang] ?? lang}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

