import { useSyncExternalStore } from 'react';
const KEY = 'theme-dark';

const read = (): boolean => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

let dark = read();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export const toggleTheme = () => {
  dark = !dark;
  try {
    localStorage.setItem(KEY, dark ? '1' : '0');
  } catch {
    /* ігнор */
  }
  emit();
};

/* синхронізація між вкладками */
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      dark = read();
      emit();
    }
  });
}

export function useTheme(): [boolean, () => void] {
  const d = useSyncExternalStore(subscribe, () => dark, () => false);
  return [d, toggleTheme];
}
