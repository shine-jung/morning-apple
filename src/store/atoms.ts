import { atom } from 'recoil';

export const themeModeState = atom<'light' | 'dark'>({
  key: 'themeMode',
  default: (localStorage.getItem('themeMode') ?? 'dark') as 'light' | 'dark',
});
