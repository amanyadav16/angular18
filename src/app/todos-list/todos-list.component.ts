import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent implements OnInit {
  todos = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // this.todoService.getTodos().subscribe((todos) => {
    //   console.log(todos);
    // });
    let payload = { id: 5, name: 'Aman' };
    this.todoService.addTodo(payload).subscribe((todo) => {
      this.todoService.getTodos().subscribe((todos) => {
        console.log(todos);
      });
    });
  }
}
