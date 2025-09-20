import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useTodos } from '@/hooks/useTodos';
import { TodoAddForm } from './TodoAddForm';
import { TodoItem } from './TodoItem';
import { TodoActiveDisplay } from './TodoActiveDisplay';

interface TodoListProps {
  onActiveTodoChange?: (todo: Todo | null) => void;
}

export function TodoList({ onActiveTodoChange }: TodoListProps) {
  const [showCompleted, setShowCompleted] = useState(false);

  const {
    addTodo,
    updateTodo,
    deleteTodo,
    setActiveTodo,
    getActiveTodo,
    getPendingTodos,
    getCompletedTodos,
    activeTodo,
  } = useTodos();

  const pendingTodos = getPendingTodos();
  const completedTodos = getCompletedTodos();
  const currentActiveTodo = getActiveTodo();

  const handleAddTodo = (text: string, priority: Todo['priority'], estimatedPomodoros: number) => {
    addTodo(text, priority, estimatedPomodoros);
  };

  const handleToggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
    if (activeTodo === todo.id) {
      setActiveTodo(null);
      onActiveTodoChange?.(null);
    }
  };

  const handleSetActive = (todo: Todo) => {
    const newActiveTodo = activeTodo === todo.id ? null : todo.id;
    setActiveTodo(newActiveTodo);
    onActiveTodoChange?.(newActiveTodo ? todo : null);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden">
      {/* Compact Header */}
      <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-lg">📋</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Tasks
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {pendingTodos.length} pending
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`relative h-7 px-2 rounded-lg font-medium text-xs transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              showCompleted 
                ? 'bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300 shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-1">
              <span>{showCompleted ? '👁️' : '👁️‍🗨️'}</span>
              <span className="hidden sm:inline">Show Completed</span>
              {completedTodos.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs font-semibold">
                  {completedTodos.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 space-y-3">
        {/* Add Form */}
        <TodoAddForm onAddTodo={handleAddTodo} />

        {/* Active Todo Display */}
        {currentActiveTodo && (
          <TodoActiveDisplay activeTodo={currentActiveTodo} />
        )}

        {/* Pending Todos */}
        <div className="space-y-2">
          {pendingTodos.length === 0 ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 text-center">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-lg" />
              
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  All caught up!
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No pending tasks. Add some goals above!
                </p>
              </div>
            </div>
          ) : (
            pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isActive={activeTodo === todo.id}
                onToggleComplete={handleToggleComplete}
                onSetActive={handleSetActive}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Completed Todos */}
        {showCompleted && completedTodos.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-xs">✅</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                Completed
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-green-300 to-transparent dark:from-green-600" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                {completedTodos.length}
              </span>
            </div>
            
            {completedTodos.map((todo) => (
              <div
                key={todo.id}
                className="group relative overflow-hidden bg-white/30 dark:bg-gray-800/30 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm rounded-xl transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50"
              >
                <div className="relative flex items-center gap-3 p-3 opacity-70 hover:opacity-85 transition-opacity duration-200">
                  {/* Completed Checkbox */}
                  <button
                    onClick={() => handleToggleComplete(todo)}
                    className="relative w-5 h-5 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 transform hover:scale-110"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-600 dark:text-gray-400 line-through truncate text-sm">
                      {todo.text}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded-full">
                        {todo.completedPomodoros}/{todo.estimatedPomodoros} 🍅
                      </span>
                      {todo.completedAt && (
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(todo.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg bg-white/60 dark:bg-gray-700/60 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}