import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosListComponent } from './components/todos-list.component';
import { StudentFormsComponent } from './components/student-forms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosListComponent, StudentFormsComponent],
  template: `<app-student-forms></app-student-forms>`,
  styles: ``,
})
export class AppComponent {}
