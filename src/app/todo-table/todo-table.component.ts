import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Todo } from '../todo-form-modal/todo.model';
import { TodoService } from '../todo-form-modal/todo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormModalComponent } from '../todo-form-modal/todo-form-modal.component';

@Component({
  selector: 'app-todo-table',
  imports: [MatTableModule, MatIconModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent implements OnInit {
  todos: Todo[] = [];
  displayedColumns: string[] = ['todo-id', 'todo-title', 'todo-description', 'todo-status', 'todo-due-date', 'todo-created-date', 'todo-actions'];

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog
  ) {}

  openEditModal(todo: Todo): void {
    this.dialog.open(TodoFormModalComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true,
      data: todo,
    });
  }

  ngOnInit() {
    this.todoService.todos$.subscribe(data => {
      this.todos = data;
    });
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }

  onCompleted(todo: Todo) {
    this.todoService.completeTodo(todo.id);
  }
}