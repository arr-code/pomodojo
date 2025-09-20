export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  completedPomodoros: number;
}

export interface TodoState {
  todos: Todo[];
  activeTodo: string | null; // ID of the currently active todo
}