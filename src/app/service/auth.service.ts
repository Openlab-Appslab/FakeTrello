import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
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
    private readonly httpClient: HttpClient,
    private router: Router,
    
  ) { }

  token: string;

  login(email: string, password: string): Observable<any> {
    const info = btoa(`${email}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
    return this.httpClient.get('http://localhost:8080/showBSI', options).pipe(
      tap(() => this.token = token)
    );
  }

    register(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:8080/noAuth/register', {
        email,
        password,
      }, httpOptions);
    }
  

    isLoggedIn(): boolean {
      return !!this.token;
    }

    getToken(): string {
      return this.token;
    }

    logout(): void {
      this.token = '';

    }

    //https://www.youtube.com/watch?v=Kfzcs-d9R7k&t=29s&ab_channel=NihiraTechiees for any more questions
    //https://www.youtube.com/watch?v=Q8s0CYhnHgM&ab_channel=NihiraTechiees passing authorization header
}
