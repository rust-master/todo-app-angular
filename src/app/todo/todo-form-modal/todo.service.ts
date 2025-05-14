// todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private counterId = 1;

  addTodo(todo: Omit<Todo, 'id'>): void {
    const newTodo: Todo = {
      ...todo,
      id: this.counterId++
    };
    this.todosSubject.next([...this.todosSubject.value, newTodo]);
  }

  getTodos(): Todo[] {
    return this.todosSubject.value;
  }

  deleteTodo(id: number): void {
    this.todosSubject.next(this.todosSubject.value.filter(todo => todo.id !== id));
  }
  completeTodo(id: number): void {
    const updatedTodos = this.todosSubject.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(updatedTodos);
  }

  updateTodo(updatedTodo: Todo) {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      this.todosSubject.next([...todos]);
    }
  }
}
