import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <label className="swap swap-rotate cursor-pointer hover:scale-200 active:scale-95 transition-all duration-300">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
      <span className="swap-off text-4xl">🌞</span>
      <span className="swap-on text-4xl">🌚</span>
    </label>
  );
}

export default ThemeToggle;
