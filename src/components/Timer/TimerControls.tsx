import { TimerState } from '@/types/timer';
import { Button } from '@/components/ui/Button';

interface TimerControlsProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onNext?: () => void;
}

export function TimerControls({
  timerState,
  onStart,
  onPause,
  onReset,
  onSkip,
  onNext
}: TimerControlsProps) {
  const canStart = timerState.status === 'idle' || timerState.status === 'paused';
  const canPause = timerState.status === 'running';
  const canReset = timerState.status !== 'idle';
  const canSkip = timerState.status === 'running' || timerState.status === 'paused';
  const showNext = timerState.status === 'completed';

  return (
    <div className={`flex items-center justify-center ${canStart && !canReset ? '' : 'gap-6'}`}>
      {/* Start/Pause Button - Main CTA dengan modern design */}
      {canStart && (
        <button
          onClick={onStart}
          className="group relative w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          
          {/* Inner circle */}
          <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
          
          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
          </div>
        </button>
      )}
      
      {canPause && (
        <button
          onClick={onPause}
          className="group relative w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-full shadow-2xl hover:shadow-red-500/25 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          
          {/* Inner circle */}
          <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
          
          {/* Pause icon */}
          <div className="absolute inset-0 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-6 bg-white rounded-full" />
            <div className="w-1.5 h-6 bg-white rounded-full" />
          </div>
        </button>
      )}

      {/* Secondary Controls dengan modern card design */}
      <div className="flex items-center gap-3">
        {canReset && (
          <button
            onClick={onReset}
            className="group relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {/* Reset icon - Circular arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        )}

        {canSkip && (
          <button
            onClick={onSkip}
            className="group relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {/* Skip icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <polygon points="5,4 15,12 5,20" fill="currentColor"/>
                <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Next Session Button */}
      {showNext && onNext && (
        <button
          onClick={onNext}
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center gap-3">
            <span className="font-semibold text-white text-lg">Next Session</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}