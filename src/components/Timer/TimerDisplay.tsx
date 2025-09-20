import { TimerState } from '@/types/timer';
import { clsx } from 'clsx';

interface TimerDisplayProps {
  timerState: TimerState;
}

export function TimerDisplay({ timerState }: TimerDisplayProps) {
  const minutes = Math.floor(timerState.timeRemaining / 60);
  const seconds = timerState.timeRemaining % 60;
  
  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  const getSessionTitle = () => {
    switch (timerState.sessionType) {
      case 'focus':
        return 'Focus Time';
      case 'break':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Timer';
    }
  };

  const getSessionColor = () => {
    switch (timerState.sessionType) {
      case 'focus':
        return 'text-purple-600 dark:text-purple-400';
      case 'break':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'longBreak':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-indigo-600 dark:text-indigo-400';
    }
  };

  const getProgressPercentage = () => {
    const totalTime = (() => {
      switch (timerState.sessionType) {
        case 'focus':
          return timerState.config.focusTime * 60;
        case 'break':
          return timerState.config.shortBreak * 60;
        case 'longBreak':
          return timerState.config.longBreak * 60;
        default:
          return timerState.config.focusTime * 60;
      }
    })();
    
    return ((totalTime - timerState.timeRemaining) / totalTime) * 100;
  };

  return (
    <div className="text-center space-y-8">
      {/* Session Type */}
      <div className="space-y-1 mb-0">
        <h1 className={clsx('text-3xl font-bold mb-3 pt-3 timer-title', getSessionColor())}>
          {getSessionTitle()}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
          Session {timerState.currentSession} • {timerState.totalSessions} completed
        </p>
      </div>

      {/* Timer Circle */}
      <div className="relative w-64 h-64 mx-auto mb-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300 dark:text-gray-600"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={clsx(
              'transition-all duration-1000 ease-in-out',
              getSessionColor()
            )}
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
          />
        </svg>
        
        {/* Timer Text - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={clsx(
              'text-6xl font-bold timer-text tracking-tight leading-none',
              timerState.status === 'running' ? 'animate-pulse' : '',
              getSessionColor()
            )}>
              {formatTime(minutes)}:{formatTime(seconds)}
            </div>
          </div>
        </div>
      </div>

      {/* Status - Moved below timer */}
      <div className="space-y-4">
        <div className="text-lg text-gray-500 dark:text-gray-400 font-semibold tracking-wide capitalize">
          {timerState.status}
        </div>

        {/* Status Message */}
        {timerState.status === 'completed' && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700/40 rounded-2xl p-6">
            <p className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-1">
              🎉 {getSessionTitle()} completed!
            </p>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              Ready for the next session?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}