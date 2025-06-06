import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

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
  templateUrl: './todo-form-modal.component.html',
  styleUrl: './todo-form-modal.component.css'
})
export class TodoFormModalComponent implements OnInit {
  
  taskForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormModalComponent>,
    private todoService: TodoService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public todo?: Todo
  ) {
    this.isEditMode = !!todo;
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.todo?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.todo?.description || '', [Validators.required, Validators.minLength(10)]],
      dueDate: [this.todo?.dueDate || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formattedDueDate = this.datePipe.transform(this.taskForm.value.dueDate, 'yyyy-MM-dd');
      
      if (this.isEditMode && this.todo) {
        const updatedTodo = {
          ...this.todo,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          dueDate: formattedDueDate!,
        };
        this.todoService.updateTodo(updatedTodo);
      } else {
        const formattedCreatedAt = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        const todoData = {
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          completed: false,
          dueDate: formattedDueDate!,
          createdAt: formattedCreatedAt!
        };
        this.todoService.addTodo(todoData);
      }
      
      this.dialogRef.close();
    } else {
      console.log('Form is invalid');
      this.taskForm.markAllAsTouched();
    }
  }
}