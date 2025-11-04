import { useState, useEffect } from 'react';
import { DEFAULT_THEME, PAGES_STRUCTURE } from '../config/themeConfig';

const STORAGE_KEY = 'inbalanz_theme_colors';

export const useThemeCustomizer = () => {
  // Initialize theme from localStorage or use defaults
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEME;
  });

  // Apply theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Loop through all pages and their sections to apply CSS variables
    PAGES_STRUCTURE.forEach(page => {
      page.sections.forEach(section => {
        const colorValue = theme[section.id];
        if (colorValue && section.cssVars && section.cssVars.length > 0) {
          section.cssVars.forEach(cssVar => {
            root.style.setProperty(cssVar, colorValue);
          });
        }
      });
    });
  }, [theme]);

  // Update a single color
  const updateColor = (colorId, value) => {
    setTheme(prevTheme => {
      const newTheme = { ...prevTheme, [colorId]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
      return newTheme;
    });
  };

  // Apply a preset palette
  const applyPreset = (presetColors) => {
    setTheme(presetColors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presetColors));
  };

  // Reset to default theme
  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_THEME));
  };

  // Export current theme configuration
  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'inbalanz-theme.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return {
    theme,
    updateColor,
    applyPreset,
    resetTheme,
    exportTheme
  };
};
