import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosListComponent } from './components/todos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosListComponent],
  template: ` <app-todos-list></app-todos-list> `,
  styles: ``,
})
export class AppComponent {}
