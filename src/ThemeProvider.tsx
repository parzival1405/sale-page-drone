import React from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useAtom } from 'jotai';
import { colorSchemeAtom } from '@atom/applicationAtoms';

export const theme: MantineThemeOverride = {};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme] = useAtom(colorSchemeAtom);

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{ ...theme, colorScheme }}
    >
      {children}
    </MantineProvider>
  );
}
