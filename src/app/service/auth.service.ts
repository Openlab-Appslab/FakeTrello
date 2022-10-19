import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    public cookies: CookieService,
    private router: Router,
    
  ) { }

  token: string ='';

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(email: string, password: string): Observable<any> {
    const info = btoa(`${email}:${password}`);

    this.cookies.set('email', email);
    this.cookies.set('password', password);

    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
    return this.http.get<any>('http://localhost:8080/showBSI', options).pipe(
      tap(() => this.token = token),
    );    
  }

  register(email: string, password: string): Observable<any> {
      return this.http.post('http://localhost:8080/noAuth/register', {
      email,
      password,
    }, httpOptions);
  }

  logout(): void {
    this.token = '';
  }

  // private _registerUrl = "http://localhost:8080/noAuth/register";
  // private _loginUrl = "http://localhost:8080/noAuth/login";

  // loginUser(email: string, password: string) {
  //   this.cookies.set('email', email);
  //   this.cookies.set('password', password);

  //   return this.http.post<any>(this._loginUrl, email+password);
  // }

  // registerUser(email: string, password: string) {
  //   return this.http.post<any>(this._registerUrl, email+password);
  // }

  // logOut(){
  //   this.cookies.deleteAll();
  //   this.router.navigate(['/login']);
  // }
}
