import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Header() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'system');
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme = theme;
    
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Add the effective theme class
    root.classList.add(effectiveTheme);
    setCurrentTheme(effectiveTheme);
    
    // Also set data attribute for better compatibility
    root.setAttribute('data-theme', effectiveTheme);
    
  }, [theme, mounted]);

  // Listen to system theme changes
  useEffect(() => {
    if (theme !== 'system' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setCurrentTheme(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    if (!mounted) return '💻'; // Default during SSR
    
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      default:
        return '💻';
    }
  };

  const getThemeLabel = () => {
    if (!mounted) return 'System';
    
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <header className={`border-b backdrop-blur-sm ${currentTheme === 'dark' ? 'header-dark' : 'header-light'} transition-all duration-300`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg p-1">
            <Image 
              src="/pomodojo.png" 
              alt="Pomodojo Logo" 
              width={24} 
              height={24}
              className="rounded-md"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Pomodojo
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className={`w-10 h-10 rounded-full ${currentTheme === 'dark' ? 'hover:bg-purple-900/30 text-gray-300' : 'hover:bg-purple-50 text-gray-700'} transition-colors duration-300`}
            title={`Current theme: ${getThemeLabel()}`}
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>
    </header>
  );
}