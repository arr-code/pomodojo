import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  isActive: boolean;
  onToggleComplete: (todo: Todo) => void;
  onSetActive: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, isActive, onToggleComplete, onSetActive, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/15';
      case 'medium':
        return 'text-amber-400 bg-amber-500/15';
      case 'low':
        return 'text-green-400 bg-green-500/15';
      default:
        return 'text-gray-400 bg-gray-500/15';
    }
  };

  const getPriorityIcon = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const progressPercentage = Math.min((todo.completedPomodoros / todo.estimatedPomodoros) * 100, 100);

  return (
    <div
      className={`group relative overflow-hidden transition-all duration-200 hover:scale-[1.005] ${
        isActive
          ? 'bg-blue-500/10 border border-blue-400/30 shadow-md shadow-blue-500/5'
          : 'bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15'
      } backdrop-blur-sm rounded-xl`}
    >
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
      )}
      
      <div className="relative flex items-center gap-3 p-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo)}
          className="relative w-5 h-5 rounded-full border-2 border-gray-500/30 hover:border-green-400/60 transition-all duration-200 flex-shrink-0 group/checkbox"
        >
          <div className="absolute inset-0 rounded-full bg-green-400/10 opacity-0 group-hover/checkbox:opacity-100 transition-opacity duration-200" />
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Task name */}
          <div className="font-medium text-white/90 text-sm leading-tight mb-1.5 break-words">
            {todo.text}
          </div>
          
          {/* Priority and progress row */}
          <div className="flex items-center justify-between">
            {/* Priority badge */}
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {getPriorityIcon(todo.priority)}
              <span className="capitalize">{todo.priority}</span>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium">
                {todo.completedPomodoros} / {todo.estimatedPomodoros}
              </span>
              <span>🍅</span>
              
              {/* Progress bar */}
              <div className="w-16 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          {/* Focus/Pause Button */}
          <button
            onClick={() => onSetActive(todo)}
            className={`relative h-7 px-3 rounded-lg font-medium text-xs transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isActive
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30 shadow-sm'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1">
              <span>{isActive ? '⏸️' : '▶️'}</span>
              <span className="hidden sm:inline">{isActive ? 'Pause' : 'Focus'}</span>
            </div>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(todo.id)}
            className="relative w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 border border-white/10 hover:border-red-400/30 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}