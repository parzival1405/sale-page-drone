import { atom } from 'jotai';
import { ColorScheme } from '@mantine/core';

export const hideNavbarAtom = atom(false);

export const colorSchemeAtom = atom<ColorScheme>('light');
