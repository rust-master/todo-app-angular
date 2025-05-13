import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponentComponent } from "./todo-component/todo-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app-angular';
}
