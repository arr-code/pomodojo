import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { TimerConfig } from '@/types/timer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';

interface TimerSettingsProps {
  config: TimerConfig;
  onConfigChange: (config: Partial<TimerConfig>) => void;
}

export interface TimerSettingsRef {
  openSettings: () => void;
}

export const TimerSettings = forwardRef<TimerSettingsRef, TimerSettingsProps>(
  ({ config, onConfigChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempConfig, setTempConfig] = useState(config);
    const [soundEnabled, setSoundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);

    useImperativeHandle(ref, () => ({
      openSettings: () => setIsOpen(true)
    }));

    const handleSave = () => {
      onConfigChange(tempConfig);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setTempConfig(config);
      setIsOpen(false);
    };

    const updateTempConfig = (field: keyof TimerConfig, value: number) => {
      setTempConfig(prev => ({ ...prev, [field]: value }));
    };

    return (
      <>
        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="group relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {soundEnabled ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor"/>
                  <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          </button>
          
          {/* Settings Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
            title="Settings"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={handleCancel}
          title="Timer Settings"
          className="max-w-lg"
        >
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white/90 text-lg">Session Durations</h3>
              </CardHeader>
              <CardContent className="space-y-6 px-4">
                <Input
                  label="Focus Time (minutes)"
                  type="number"
                  min="1"
                  max="120"
                  value={tempConfig.focusTime}
                  onChange={(e) => updateTempConfig('focusTime', parseInt(e.target.value) || 25)}
                />
                
                <Input
                  label="Short Break (minutes)"
                  type="number"
                  min="1"
                  max="60"
                  value={tempConfig.shortBreak}
                  onChange={(e) => updateTempConfig('shortBreak', parseInt(e.target.value) || 5)}
                />
                
                <Input
                  label="Long Break (minutes)"
                  type="number"
                  min="1"
                  max="120"
                  value={tempConfig.longBreak}
                  onChange={(e) => updateTempConfig('longBreak', parseInt(e.target.value) || 15)}
                />
                
                <Input
                  label="Sessions until Long Break"
                  type="number"
                  min="2"
                  max="10"
                  value={tempConfig.sessionsUntilLongBreak}
                  onChange={(e) => updateTempConfig('sessionsUntilLongBreak', parseInt(e.target.value) || 4)}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Settings
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

TimerSettings.displayName = 'TimerSettings';