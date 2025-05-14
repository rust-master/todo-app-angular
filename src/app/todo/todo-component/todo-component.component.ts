import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormModalComponent } from '../todo-form-modal/todo-form-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoTableComponent } from '../todo-table/todo-table.component';


@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule,
    TodoTableComponent
  ],
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css']
})
export class TodoComponentComponent {
  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoFormModalComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }
}