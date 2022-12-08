import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from '../guard/auth.guard';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // service = TestBed.inject(AuthService);
    TestBed.configureTestingModule({
      imports: [HttpClient],
      declarations: [AuthService],
      providers: [HttpClient]
    }).compileComponents();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
