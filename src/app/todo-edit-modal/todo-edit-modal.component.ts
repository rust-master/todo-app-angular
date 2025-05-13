import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoService } from '../todo-form-modal/todo.service';
import { Todo } from '../todo-form-modal/todo.model';

@Component({
  selector: 'app-todo-form-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  templateUrl: './todo-edit-modal.component.html',
  styleUrl: './todo-edit-modal.component.css'
})
export class TodoEditModalComponent implements OnInit {

  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoEditModalComponent>,
    private todoService: TodoService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ) {
    console.log("MAT_DIALOG_DATA", MAT_DIALOG_DATA)
    console.log("TodoEditModalComponent todo", todo)

  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.todo.title, [Validators.required, Validators.minLength(3)]],
      description: [this.todo.description, [Validators.required, Validators.minLength(10)]],
      dueDate: [this.todo.dueDate, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTodo = {
        ...this.todo,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.datePipe.transform(this.taskForm.value.dueDate, 'yyyy-MM-dd')!,
      };

      this.todoService.updateTodo(updatedTodo);
      this.dialogRef.close();
    } else {
      console.log('Form is invalid');
      this.taskForm.markAllAsTouched();
    }
  }
}
