import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private injector: Injector,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: this.authService.getToken()
        })
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (this.authService.isLoggedIn() && err.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl('/workspace');
        }
        throw err;
      })
    );
  }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let authService = this.injector.get(AuthService);
  //   let jwtToken=req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authService.getToken()}`
  //     }
  //   });
  //   return next.handle(jwtToken);
  // }
}
