import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormModalComponent } from '../todo-form-modal/todo-form-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { TodoTableComponent } from "../todo-table/todo-table.component";

@Component({
  selector: 'app-todo-component',
  imports: [MatButtonModule, TodoTableComponent],
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css']
})
export class TodoComponentComponent {


  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoFormModalComponent, {
      width: '900px',
      height: '460px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}
