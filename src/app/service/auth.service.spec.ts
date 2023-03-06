import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseRouteReuseStrategy, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../guard/auth.guard';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:  [HttpClient, HttpHandler],
      imports: [RouterTestingModule, MatDialogModule]


    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
