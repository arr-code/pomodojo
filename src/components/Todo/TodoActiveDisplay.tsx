import { Todo } from '@/types/todo';

interface TodoActiveDisplayProps {
  activeTodo: Todo;
}

export function TodoActiveDisplay({ activeTodo }: TodoActiveDisplayProps) {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30';
      case 'medium':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800/30';
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/60 dark:border-purple-700/50 rounded-xl shadow-md">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-lg" />
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md transform rotate-3 flex-shrink-0">
            <span className="text-lg">🎯</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Currently Working On
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent dark:from-purple-600" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight break-words">
              {activeTodo.text}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              {/* Progress Section */}
              <div className="flex items-center gap-2">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Progress:
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5 text-sm font-bold text-purple-700 dark:text-purple-300">
                    <span>{activeTodo.completedPomodoros}</span>
                    <span className="text-gray-400">/</span>
                    <span>{activeTodo.estimatedPomodoros}</span>
                    <span className="ml-0.5">🍅</span>
                  </div>
                  
                  {/* Circular Progress */}
                  <div className="relative w-6 h-6 ml-1">
                    <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-200 dark:text-purple-800" />
                      <circle
                        cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="text-purple-500 dark:text-purple-400 transition-all duration-500"
                        strokeDasharray={`${2 * Math.PI * 9}`}
                        strokeDashoffset={`${2 * Math.PI * 9 * (1 - (activeTodo.completedPomodoros / activeTodo.estimatedPomodoros))}`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Priority Badge */}
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium shadow-sm border ${getPriorityColor(activeTodo.priority)}`}>
                <span>{getPriorityIcon(activeTodo.priority)}</span>
                <span className="capitalize font-semibold">{activeTodo.priority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}