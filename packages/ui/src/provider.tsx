import React from 'react';
import { createTheme, MantineProvider as Mantine } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Your theme override here */
});

export const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  return <Mantine theme={theme}>{children}</Mantine>;
};
