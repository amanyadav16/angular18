import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<any[]>('api/todos');
  }

  addTodo(todo: any) {
    return this.http.post<any>('api/todos', todo);
  }
}
