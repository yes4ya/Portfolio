import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Storage can be blocked, the session still works with the default theme.
  }
  return 'light';
};

/**
 * Holds the colour theme and mirrors it onto <html data-theme> so the CSS
 * variables in index.css can swap the whole palette in one place.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Storage can be blocked, the toggle still works for this session.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};

export default ThemeProvider;
