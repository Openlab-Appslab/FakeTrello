import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';



describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    TestBed.configureTestingModule({
      declarations: [ AuthGuard ],
      providers: [HttpClient]
  });
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  
});
