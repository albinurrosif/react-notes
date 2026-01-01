import { createContext, useContext, useLayoutEffect, useState } from 'react';

const ThemeContext = createContext();

const LIGHT_THEME = 'nord';
const DARK_THEME = 'night';

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [bg, setBg] = useState({});

  useLayoutEffect(() => {
    const themeName = dark ? DARK_THEME : LIGHT_THEME;

    document.documentElement.setAttribute('data-theme', themeName);

    const style = getComputedStyle(document.documentElement);

    const bg = style.getPropertyValue('--color-base-100').trim();
    const edge = style.getPropertyValue('#6f7070').trim();

    setBg({
      background: bg,
      boxShadow: `
    inset 0 0 140px ${edge}
  `,
    });
  }, [dark]);

  return <ThemeContext.Provider value={{ dark, setDark, bg }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
