import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, HttpClient, HttpHandler]

    });
    service = TestBed.inject(TaskService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
