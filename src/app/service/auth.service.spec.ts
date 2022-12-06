import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from '../guard/auth.guard';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [HttpClient]
    })

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
