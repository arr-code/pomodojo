import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

interface TodoAddFormProps {
  onAddTodo: (text: string, priority: Todo['priority'], estimatedPomodoros: number) => void;
}

export function TodoAddForm({ onAddTodo }: TodoAddFormProps) {
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<Todo['priority']>('medium');
  const [newTodoPomodoros, setNewTodoPomodoros] = useState(1);
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

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      onAddTodo(newTodoText, newTodoPriority, newTodoPomodoros);
      setNewTodoText('');
      setNewTodoPomodoros(1);
    }
  };

  return (
    <div className={`p-3 backdrop-blur-sm border rounded-xl shadow-md transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800/40 border-gray-700/20' 
        : 'bg-white/40 border-gray-200/30'
    }`}>
      <div className="space-y-3">
        {/* Main Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            className={`w-full h-10 px-3 pr-10 backdrop-blur-sm border rounded-lg text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-900/70 border-gray-600/50 text-gray-100 dark:placeholder:text-gray-400'
                : 'bg-white/70 border-gray-200/50 text-gray-900'
            }`}
          />
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
          }`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col gap-2">
          {/* Priority Selector */}
          <div className="flex items-center justify-between">
            <label className={`text-xs font-medium transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Priority:
            </label>
            <div className="relative">
              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as Todo['priority'])}
                className={`appearance-none h-7 pl-2 pr-6 backdrop-blur-sm border rounded-md text-xs font-medium focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gray-900/70 border-gray-600/50 text-gray-100'
                    : 'bg-white/70 border-gray-200/50 text-gray-900'
                }`}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <div className={`absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Pomodoros Input */}
          <div className="flex items-center justify-between">
            <label className={`text-xs font-medium transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Pomodoros:
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={newTodoPomodoros}
              onChange={(e) => setNewTodoPomodoros(parseInt(e.target.value) || 1)}
              className={`w-16 h-7 px-2 backdrop-blur-sm border rounded-md text-xs font-medium text-center focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-900/70 border-gray-600/50 text-gray-100'
                  : 'bg-white/70 border-gray-200/50 text-gray-900'
              }`}
            />
          </div>
        </div>
        
        {/* Add Button */}
        <button
          onClick={handleAddTodo}
          disabled={!newTodoText.trim()}
          className="group relative h-8 w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg shadow-md hover:shadow-purple-500/25 disabled:hover:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-20 group-disabled:opacity-0 rounded-lg blur transition-opacity duration-200" />
          <div className="relative flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm">Add Task</span>
          </div>
        </button>
      </div>
    </div>
  );
}