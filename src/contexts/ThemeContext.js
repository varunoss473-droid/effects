'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define default theme colors
const defaultTheme = {
  primary: '#22c55e', // green-500
  secondary: '#1f2937', // gray-800
  accent: '#ef4444', // red-500
  background: '#ffffff',
  text: '#374151', // gray-700
};

// Create context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Get theme from localStorage if available
  const [theme, setTheme] = useState(defaultTheme);

  
  // Load theme from localStorage on initial render
  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        try {
          setTheme(JSON.parse(savedTheme));
        } catch (e) {
          console.error('Failed to parse theme from localStorage');
        }
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(theme));
      
      // Update CSS variables
      const root = document.documentElement;
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [theme]);

  // Update a specific color in the theme
  const updateColor = (colorKey, colorValue) => {
    setTheme(prev => ({
      ...prev,
      [colorKey]: colorValue
    }));
  };

  // Change the entire theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Predefined themes
  const themes = {
    green: {
      primary: '#22c55e', // green-500
      secondary: '#1f2937', // gray-800
      accent: '#ef4444', // red-500
      background: '#ffffff',
      text: '#374151', // gray-700
    },
    blue: {
      primary: '#3b82f6', // blue-500
      secondary: '#1f2937', // gray-800
      accent: '#f59e0b', // amber-500
      background: '#ffffff',
      text: '#374151', // gray-700
    },
    purple: {
      primary: '#8b5cf6', // purple-500
      secondary: '#1f2937', // gray-800
      accent: '#ec4899', // pink-500
      background: '#ffffff',
      text: '#374151', // gray-700
    },
    red: {
      primary: '#ef4444', // red-500
      secondary: '#1f2937', // gray-800
      accent: '#22c55e', // green-500
      background: '#ffffff',
      text: '#374151', // gray-700
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateColor, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
