import { useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [soundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number = 800, duration: number = 200) => {
    if (!soundEnabled) return;
    
    const audioContext = initAudioContext();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }, [soundEnabled, initAudioContext]);

  const playNotification = useCallback(() => {
    playBeep(800, 200);
    setTimeout(() => playBeep(1000, 200), 300);
  }, [playBeep]);

  return { playNotification };
}