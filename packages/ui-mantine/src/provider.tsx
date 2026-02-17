"use client";

import type { ReactNode } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./fonts.css";

const theme = createTheme({});

export function UiMantineProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" limit={5} />
      {children}
    </MantineProvider>
  );
}
