import { Component, OnInit, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/models-interfaces';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [JsonPipe],
  template: `
    @for (todo of todos(); track $index) {
    <pre>{{ todo | json }}</pre>
    <br />
    }@empty {
    <p>Loading Todos...</p>
    }
  `,
  styles: ``,
})
export class TodosListComponent implements OnInit {
  todos = signal<Todo[]>([]);
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }
}
