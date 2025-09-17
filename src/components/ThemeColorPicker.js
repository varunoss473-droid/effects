'use client';

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeColorPicker({ position = 'top-right' }) {
  const { theme, updateColor, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('presets');

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  // Color options for each theme color
  const colorOptions = {
    primary: [
      { name: 'Green', value: '#22c55e' },  // green-500
      { name: 'Blue', value: '#3b82f6' },   // blue-500
      { name: 'Purple', value: '#8b5cf6' }, // purple-500
      { name: 'Red', value: '#ef4444' },    // red-500
      { name: 'Yellow', value: '#eab308' }, // yellow-500
      { name: 'Orange', value: '#f97316' }, // orange-500
      { name: 'Teal', value: '#14b8a6' },   // teal-500
      { name: 'Pink', value: '#ec4899' },   // pink-500
    ],
    secondary: [
      { name: 'Gray', value: '#1f2937' },   // gray-800
      { name: 'Slate', value: '#1e293b' },  // slate-800
      { name: 'Zinc', value: '#27272a' },   // zinc-800
      { name: 'Blue', value: '#1e40af' },   // blue-800
      { name: 'Green', value: '#166534' },  // green-800
      { name: 'Purple', value: '#6b21a8' }, // purple-800
      { name: 'Red', value: '#991b1b' },    // red-800
    ],
    accent: [
      { name: 'Red', value: '#ef4444' },    // red-500
      { name: 'Amber', value: '#f59e0b' },  // amber-500
      { name: 'Yellow', value: '#eab308' }, // yellow-500
      { name: 'Lime', value: '#84cc16' },   // lime-500
      { name: 'Cyan', value: '#06b6d4' },   // cyan-500
      { name: 'Pink', value: '#ec4899' },   // pink-500
    ],
  };

  // Toggle the color picker
  const togglePicker = () => {
    setIsOpen(!isOpen);
  };

  // Handle color change
  const handleColorChange = (colorKey, colorValue) => {
    updateColor(colorKey, colorValue);
  };

  // Handle theme change
  const handleThemeChange = (themeName) => {
    changeTheme(themes[themeName]);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Color palette button */}
      <button 
        onClick={togglePicker}
        className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        title="Change Theme Colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden grid grid-cols-2 grid-rows-2">
          <div style={{ backgroundColor: theme.primary }}></div>
          <div style={{ backgroundColor: theme.secondary }}></div>
          <div style={{ backgroundColor: theme.accent }}></div>
          <div style={{ backgroundColor: theme.background }}></div>
        </div>
      </button>

      {/* Color picker panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-4 w-72">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button 
              className={`px-4 py-2 ${selectedTab === 'presets' ? 'border-b-2 border-primary font-bold' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('presets')}
            >
              Presets
            </button>
            <button 
              className={`px-4 py-2 ${selectedTab === 'custom' ? 'border-b-2 border-primary font-bold' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('custom')}
            >
              Custom
            </button>
          </div>

          {/* Preset Themes */}
          {selectedTab === 'presets' && (
            <div>
              <h3 className="font-bold mb-2 text-gray-700">Select Theme</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => handleThemeChange(themeName)}
                    className="p-2 rounded border hover:bg-gray-100 capitalize flex items-center"
                  >
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: themes[themeName].primary }}
                    ></div>
                    {themeName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Colors */}
          {selectedTab === 'custom' && (
            <div>
              <h3 className="font-bold mb-2 text-gray-700">Primary Color</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {colorOptions.primary.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange('primary', color.value)}
                    className="w-10 h-10 rounded-full border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  ></button>
                ))}
              </div>

              <h3 className="font-bold mb-2 text-gray-700">Secondary Color</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {colorOptions.secondary.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange('secondary', color.value)}
                    className="w-10 h-10 rounded-full border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  ></button>
                ))}
              </div>

              <h3 className="font-bold mb-2 text-gray-700">Accent Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.accent.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange('accent', color.value)}
                    className="w-10 h-10 rounded-full border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={togglePicker}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
