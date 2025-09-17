'use client';

import { useTheme } from '../../../contexts/ThemeContext';
import ThemeColorPicker from '../../../components/ThemeColorPicker';

export default function AgricultureClient({ children }) {
  const { theme } = useTheme();
  
  return (
    <div className="w-full">
      {/* Theme Color Picker */}
      <ThemeColorPicker position="top-right" />
      
      {/* Render all the content passed from the server component */}
      {children}
    </div>
  );
}
