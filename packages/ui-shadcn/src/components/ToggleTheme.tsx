'use client';

import * as React from 'react';
import { MoonIcon } from '@phosphor-icons/react/dist/csr/Moon';
import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun';
import { useTheme } from '../provider';
import { Button } from './ui/button';

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <Button type="button" variant="outline" size="sm" aria-label="Toggle theme" onClick={toggleTheme}>
      {isDark ? <SunIcon size={16} weight="light" /> : <MoonIcon size={16} weight="light" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

