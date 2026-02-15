'use client';

import * as React from 'react';
import { useTheme } from '../provider';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <Button type="button" variant="outline" size="sm" aria-label="Toggle theme" onClick={toggleTheme}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

