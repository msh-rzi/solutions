'use client';

import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { MoonIcon } from '@phosphor-icons/react/dist/csr/Moon';
import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun';
import { useMounted } from '@mantine/hooks';

export function MantineThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const mounted = useMounted();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon onClick={toggleColorScheme} variant="default" size="lg" aria-label="Toggle color scheme">
      {mounted && computedColorScheme === 'dark' ? (
        <SunIcon size={20} weight="light" />
      ) : (
        <MoonIcon size={20} weight="light" />
      )}
    </ActionIcon>
  );
}
