import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useTodos } from '@/hooks/useTodos';

interface TodoWidgetProps {
  onActiveTodoChange?: (todo: Todo | null) => void;
}

export function TodoWidget({ onActiveTodoChange }: TodoWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState<string>('light');
  
  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const {
    updateTodo,
    setActiveTodo,
    getActiveTodo,
    getPendingTodos,
    activeTodo,
  } = useTodos();

  const pendingTodos = getPendingTodos();
  const currentActiveTodo = getActiveTodo();
  const topTodos = pendingTodos.slice(0, 3);

  const handleSetActive = (todo: Todo) => {
    const newActiveTodo = activeTodo === todo.id ? null : todo.id;
    setActiveTodo(newActiveTodo);
    onActiveTodoChange?.(newActiveTodo ? todo : null);
  };

  const handleToggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
    if (activeTodo === todo.id) {
      setActiveTodo(null);
      onActiveTodoChange?.(null);
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

  if (pendingTodos.length === 0) {
    return (
      <Card className={`backdrop-blur-sm border shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700/20' 
          : 'bg-white/80 border-white/20'
      }`}>
        <CardContent className="p-4">
          <div className={`text-center py-6 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300'
            }`}>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className={`text-xs mt-1 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>Add some goals to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`backdrop-blur-sm border shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-700/20' 
        : 'bg-white/80 border-white/20'
    }`}>
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg">📋</span>
            </div>
            <h3 className={`font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Quick Tasks
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-2 py-1 h-8 rounded-lg"
          >
            {isExpanded ? '↑' : '↓'}
          </Button>
        </div>

        {/* Active Todo */}
        {currentActiveTodo && (
          <div className={`relative overflow-hidden p-3 border rounded-xl transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-purple-900/30 border-purple-700/40'
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
          }`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span>🎯</span>
                <span className={`font-bold truncate flex-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  {currentActiveTodo.text}
                </span>
              </div>
              <div className={`text-xs flex items-center gap-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <span>{currentActiveTodo.completedPomodoros}/{currentActiveTodo.estimatedPomodoros} 🍅</span>
                <div className={`flex-1 h-1 rounded-full overflow-hidden transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-purple-800' : 'bg-purple-200'
                }`}>
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${Math.min((currentActiveTodo.completedPomodoros / currentActiveTodo.estimatedPomodoros) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {(isExpanded ? pendingTodos : topTodos).map((todo) => (
            <div
              key={todo.id}
              className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                activeTodo === todo.id
                  ? theme === 'dark'
                    ? 'bg-purple-900/20 border-purple-700'
                    : 'bg-purple-50 border-purple-200'
                  : theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/80'
                    : 'bg-white/50 border-gray-200 hover:bg-white/80'
              }`}
            >
              <button
                onClick={() => handleToggleComplete(todo)}
                className={`w-4 h-4 rounded-full border-2 hover:border-green-500 transition-colors duration-200 flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'border-gray-600 dark:hover:border-green-400' 
                    : 'border-gray-300'
                }`}
              />
              
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {todo.text}
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <span>{getPriorityIcon(todo.priority)}</span>
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{todo.completedPomodoros}/{todo.estimatedPomodoros} 🍅</span>
                  <div className={`flex-1 h-1 rounded-full overflow-hidden transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${Math.min((todo.completedPomodoros / todo.estimatedPomodoros) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSetActive(todo)}
                className={`text-xs px-2 py-1 h-7 rounded-lg transition-all duration-300 ${
                  activeTodo === todo.id
                    ? theme === 'dark'
                      ? 'bg-purple-800 text-purple-300'
                      : 'bg-purple-100 text-purple-700'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {activeTodo === todo.id ? '⏸️' : '▶️'}
              </Button>
            </div>
          ))}
        </div>

        {/* Show more indicator */}
        {!isExpanded && pendingTodos.length > 3 && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className={`text-xs transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              +{pendingTodos.length - 3} more tasks
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}