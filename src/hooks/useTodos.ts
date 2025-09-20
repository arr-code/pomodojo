import { useState, useCallback } from 'react';
import { Todo, TodoState } from '@/types/todo';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'pomodoro_todos';

export function useTodos() {
  const [todoState, setTodoState] = useLocalStorage<TodoState>(
    STORAGE_KEY,
    { todos: [], activeTodo: null }
  );

  const addTodo = useCallback((
    text: string, 
    priority: Todo['priority'] = 'medium',
    estimatedPomodoros: number = 1
  ) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      estimatedPomodoros,
      completedPomodoros: 0,
    };

    setTodoState(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo],
    }));

    return newTodo.id;
  }, [setTodoState]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodoState(prev => ({
      ...prev,
      todos: prev.todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { 
            ...todo, 
            ...updates,
            completedAt: updates.completed && !todo.completed 
              ? new Date().toISOString() 
              : todo.completedAt
          };
          
          // If marking as completed and no pomodoros were completed, 
          // set completed pomodoros to match estimated
          if (updates.completed && !todo.completed && todo.completedPomodoros === 0) {
            updatedTodo.completedPomodoros = todo.estimatedPomodoros;
          }
          
          return updatedTodo;
        }
        return todo;
      }),
    }));
  }, [setTodoState]);

  const deleteTodo = useCallback((id: string) => {
    setTodoState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => todo.id !== id),
      activeTodo: prev.activeTodo === id ? null : prev.activeTodo,
    }));
  }, [setTodoState]);

  const setActiveTodo = useCallback((id: string | null) => {
    setTodoState(prev => ({
      ...prev,
      activeTodo: id,
    }));
  }, [setTodoState]);

  const incrementPomodoro = useCallback((id: string) => {
    setTodoState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id
          ? { ...todo, completedPomodoros: todo.completedPomodoros + 1 }
          : todo
      ),
    }));
  }, [setTodoState]);

  const getActiveTodo = useCallback(() => {
    return todoState.todos.find(todo => todo.id === todoState.activeTodo) || null;
  }, [todoState.todos, todoState.activeTodo]);

  const getPendingTodos = useCallback(() => {
    return todoState.todos.filter(todo => !todo.completed);
  }, [todoState.todos]);

  const getCompletedTodos = useCallback(() => {
    return todoState.todos.filter(todo => todo.completed);
  }, [todoState.todos]);

  const markAsCompleted = useCallback((id: string) => {
    setTodoState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              completed: true,
              completedPomodoros: todo.estimatedPomodoros, // Give full credit
              completedAt: new Date().toISOString()
            }
          : todo
      ),
      activeTodo: prev.activeTodo === id ? null : prev.activeTodo,
    }));
  }, [setTodoState]);

  return {
    todos: todoState.todos,
    activeTodo: todoState.activeTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    setActiveTodo,
    incrementPomodoro,
    markAsCompleted,
    getActiveTodo,
    getPendingTodos,
    getCompletedTodos,
  };
}