import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../service/auth.service';

import { AuthGuard } from './auth.guard';



describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler,],
      imports: [RouterTestingModule, MatDialogModule]

    });
    guard = TestBed.inject(AuthGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  
});
