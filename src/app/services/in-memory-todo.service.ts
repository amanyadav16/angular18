import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryTodoService implements InMemoryDbService {
  constructor() {}

  createDb() {
    let todos = [
      { id: 1, task: 'Windstorm', completed: false },
      { id: 2, task: 'Bombasto', completed: true },
      { id: 3, task: 'Magneta', completed: false },
      { id: 4, task: 'Tornado', completed: false },
    ];
    return { todos };
  }
}
