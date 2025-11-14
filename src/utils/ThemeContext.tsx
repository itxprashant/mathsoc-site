import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode === 'dark';
  });

  useEffect(() => {
    // Apply theme to body
    if (isDark) {
      document.body.classList.add('dark');
      // Update meta theme colors for dark mode
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      const navButtonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
      const safariMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      
      if (themeColorMeta) themeColorMeta.setAttribute('content', '#000');
      if (navButtonMeta) navButtonMeta.setAttribute('content', '#000');
      if (safariMeta) safariMeta.setAttribute('content', '#000');
    } else {
      document.body.classList.remove('dark');
      // Update meta theme colors for light mode
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      const navButtonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
      const safariMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      
      if (themeColorMeta) themeColorMeta.setAttribute('content', '#fff');
      if (navButtonMeta) navButtonMeta.setAttribute('content', '#fff');
      if (safariMeta) safariMeta.setAttribute('content', '#fff');
    }

    // Save to localStorage
    localStorage.setItem('mode', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};