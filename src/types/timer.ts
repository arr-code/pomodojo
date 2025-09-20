export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';
export type SessionType = 'focus' | 'break' | 'longBreak';

export interface TimerConfig {
  focusTime: number; // in minutes
  shortBreak: number; // in minutes
  longBreak: number; // in minutes
  sessionsUntilLongBreak: number;
}

export interface TimerState {
  status: TimerStatus;
  sessionType: SessionType;
  timeRemaining: number; // in seconds
  currentSession: number;
  totalSessions: number;
  config: TimerConfig;
}

export interface SessionStats {
  date: string;
  completedSessions: number;
  focusTime: number; // total focus time in minutes
  totalTime: number; // total time including breaks
}