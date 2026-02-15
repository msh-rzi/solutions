'use client';

import type { ReactNode } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './fonts.css';

const theme = createTheme({});

export function UiMantineProvider({ children }: { children: ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

