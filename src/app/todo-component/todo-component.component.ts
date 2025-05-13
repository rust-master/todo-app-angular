import { Component, effect, signal } from '@angular/core';
import { Todo } from './todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-component',
  imports: [FormsModule],
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css']
})
export class TodoComponentComponent {

  todos = signal<Todo[]>([]);

  counterId = 1;
  newTitle: string = '';
  newDescription: string = '';
  newDueDate: string = '';
  isEditing: boolean = false; 
  editingTodoId: number | null = null; 

  constructor() {
    effect(() => {
      console.log(this.todos())
    })
  }

  addTodo() {
    if (!this.newTitle.trim()){
      alert("Please enter the title");
      return;
    } else if(!this.newDescription.trim()) {
      alert("Please enter the description");
      return;
    } else if(!this.newDueDate.trim()) {
      alert("Please enter the due date");
      return;
    }

    const newTodo: Todo = {
      id: this.counterId++,
      title: this.newTitle,
      description: this.newDescription,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: this.newDueDate || undefined,
    }

    this.todos.update(current => [...current, newTodo]);
    this.resetForm();
  }

  resetForm() {
    this.isEditing = false;
    this.editingTodoId = null;
    this.newTitle = '';
    this.newDescription = '';
    this.newDueDate = '';
  }

  toggleComplete(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.resetForm()
  }
  

  setEditingTodo(todo: Todo) {
    this.isEditing = true;
    this.editingTodoId = todo.id;
    this.newTitle = todo.title;
    this.newDescription = todo.description;
    this.newDueDate = todo.dueDate || '';
  }

  updateTodo() {
    if (!this.newTitle.trim()){
      alert("Please enter the title");
      return;
    } else if(!this.newDescription.trim()) {
      alert("Please enter the description");
      return;
    } else if(!this.newDueDate.trim()) {
      alert("Please enter the due date");
      return;
    }

    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === this.editingTodoId
          ? { ...todo, title: this.newTitle, description: this.newDescription, dueDate: this.newDueDate }
          : todo
      )
    );
    this.resetForm();
  }
}
