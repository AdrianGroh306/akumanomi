import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getInitial = (): Theme => {
    if (typeof window === 'undefined') return 'auto';
    return (localStorage.getItem('theme') as Theme) || 'auto';
  };

  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light';
      const onChange = (e: MediaQueryListEvent) =>
        (document.documentElement.dataset.theme = e.matches ? 'dark' : 'light');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};