// todo/todo.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponentComponent } from './todo-component/todo-component.component';

const routes: Routes = [
  { path: '', component: TodoComponentComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TodoModule {}