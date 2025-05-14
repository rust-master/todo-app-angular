import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponentComponent } from "./todo/todo-component/todo-component.component";

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app-angular';
}
