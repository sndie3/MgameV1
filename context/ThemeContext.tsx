import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'].includes(saved)) {
      return saved as Theme;
    }
    localStorage.removeItem('theme');
    return '1';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const body = document.body;
  
  // Set background image
  const themeImages: Record<Theme, string> = {
    '1': '/assets/themes/1.jpg',
    '2': '/assets/themes/2.jpg',
    '3': '/assets/themes/3.jpg',
    '4': '/assets/themes/4.jpg',
    '5': '/assets/themes/5.jpg',
    '6': '/assets/themes/6.jpg',
    '7': '/assets/themes/7.jpg',
    '8': '/assets/themes/8.jpg',
    '9': '/assets/themes/9.jpg',
    '10': '/assets/themes/10.jpg',
    '11': '/assets/themes/11.jpg',
    '12': '/assets/themes/12.jpg',
    '13': '/assets/themes/13.jpg',
    '14': '/assets/themes/14.jpg',
    '15': '/assets/themes/15.jpg',
    '16': '/assets/themes/16.jpg',
    '17': '/assets/themes/17.jpg',
  };

  const imageUrl = themeImages[theme];
  body.style.backgroundImage = `url(${imageUrl})`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundAttachment = 'fixed';
  
  // Set CSS variables for component colors (keep semi-transparent overlays)
  root.style.setProperty('--primary-color', '#0054A6');
  root.style.setProperty('--secondary-color', '#FFD700');
  root.style.setProperty('--background-color', 'rgba(0, 0, 0, 0.7)');
  root.style.setProperty('--card-color', 'rgba(18, 18, 18, 0.8)');
  root.style.setProperty('--button-color', 'rgba(26, 26, 26, 0.8)');
  root.style.setProperty('--hover-color', 'rgba(24, 24, 24, 0.8)');
  root.style.setProperty('--input-color', 'rgba(42, 42, 42, 0.8)');
}
