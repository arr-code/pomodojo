'use client';

import { Header } from '@/components/Layout/Header';
import { TimerDisplay } from '@/components/Timer/TimerDisplay';
import { TimerControls } from '@/components/Timer/TimerControls';
import { TimerSettings } from '@/components/Timer/TimerSettings';
import { Card, CardContent } from '@/components/ui/Card';
import { useTimer } from '@/hooks/useTimer';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useEffect, useState, useRef } from 'react';

export default function HomePage() {
  const [theme, setTheme] = useState<string>('light');
  const timerSettingsRef = useRef<{ openSettings: () => void } | null>(null);
  
  const {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    startNextSession,
    updateConfig,
    config,
  } = useTimer();

  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleStartPause = () => {
    if (timerState.status === 'running') {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleOpenSettings = () => {
    if (timerSettingsRef.current) {
      timerSettingsRef.current.openSettings();
    }
  };

  useKeyboard({
    onStartPause: handleStartPause,
    onReset: resetTimer,
    onSkip: skipSession,
    onSettings: handleOpenSettings,
    enabled: true,
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-light'} transition-all duration-300`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Timer Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-xl opacity-20 animate-pulse-slow"></div>
            <Card className={`relative ${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-3xl shadow-2xl timer-circle transition-all duration-300`}>
              <CardContent className="p-12">
                <TimerDisplay timerState={timerState} />
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center">
            <TimerControls
              timerState={timerState}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onSkip={skipSession}
              onNext={startNextSession}
            />
          </div>

          {/* Settings */}
          <div className="flex items-center justify-center gap-4">
            <TimerSettings 
              ref={timerSettingsRef}
              config={config}
              onConfigChange={updateConfig}
            />
          </div>

          {/* Keyboard Shortcuts */}
          <Card className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-2xl transition-all duration-300`}>
            <CardContent className="p-6">
              <h3 className={`font-semibold mb-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                ⌨️ Keyboard Shortcuts
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50/70'} transition-colors duration-300`}>
                  <kbd className={`inline-block px-3 py-1.5 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-800 to-pink-800 border-purple-600 text-purple-200' : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 text-purple-800'} border rounded-lg text-xs font-mono font-semibold shadow-sm transition-colors duration-300`}>
                    Space
                  </kbd>
                  <div className={`${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mt-2 font-medium transition-colors duration-300`}>Start/Pause</div>
                </div>
                <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50/70'} transition-colors duration-300`}>
                  <kbd className={`inline-block px-3 py-1.5 ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-800 to-teal-800 border-emerald-600 text-emerald-200' : 'bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200 text-emerald-800'} border rounded-lg text-xs font-mono font-semibold shadow-sm transition-colors duration-300`}>
                    R
                  </kbd>
                  <div className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} mt-2 font-medium transition-colors duration-300`}>Reset</div>
                </div>
                <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50/70'} transition-colors duration-300`}>
                  <kbd className={`inline-block px-3 py-1.5 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-800 to-cyan-800 border-blue-600 text-blue-200' : 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-800'} border rounded-lg text-xs font-mono font-semibold shadow-sm transition-colors duration-300`}>
                    S
                  </kbd>
                  <div className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-2 font-medium transition-colors duration-300`}>Skip</div>
                </div>
                <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-pink-900/30' : 'bg-pink-50/70'} transition-colors duration-300`}>
                  <kbd className={`inline-block px-3 py-1.5 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-800 to-rose-800 border-pink-600 text-pink-200' : 'bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200 text-pink-800'} border rounded-lg text-xs font-mono font-semibold shadow-sm transition-colors duration-300`}>
                    T
                  </kbd>
                  <div className={`${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'} mt-2 font-medium transition-colors duration-300`}>Settings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t backdrop-blur-sm ${theme === 'dark' ? 'footer-dark' : 'footer-light'} transition-all duration-300`}>
        <div className={`container mx-auto px-4 py-6 text-center text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} transition-colors duration-300`}>
          <p className="font-medium">Built with ❤️ using Next.js • Master your focus with Pomodojo</p>
        </div>
      </footer>
    </div>
  );
}