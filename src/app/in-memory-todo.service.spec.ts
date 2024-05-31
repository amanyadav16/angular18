import { TestBed } from '@angular/core/testing';

import { InMemoryTodoService } from './in-memory-todo.service';

describe('InMemoryTodoService', () => {
  let service: InMemoryTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
