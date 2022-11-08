import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(
    private readonly http: HttpClient,
    private readonly httpClient: HttpClient,
    private router: Router,
    
  ) { }

  token: string;

  proceedLogin(email: string, password: string): Observable<any> {
    const info = btoa(`${email}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiServerUrl}/noAuth/register`, options).pipe(
      tap(() => this.token = token)
    );
  }

    // proceedLogin(email: string, password: string){
    //   return this.httpClient.post(`${this.apiServerUrl}/showBSI`,email + password);
    // }

    proceedRegister(email: string, password: string){
      return this.httpClient.post(`${this.apiServerUrl}/noAuth/register`,email + password);
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

    haveAccess(){
      var logInToken=localStorage.getItem('token') || '';
      var _extractedToken = logInToken.split('.')[1];
      var _atobdata = atob(_extractedToken);
      var _finalData = JSON.parse(_atobdata);
      console.log(_finalData);
      if(_finalData.role == 'admin'){
        return true;
      }
      alert('You are not authorized to access this page');
      return false;
    }

    //https://www.youtube.com/watch?v=Kfzcs-d9R7k&t=29s&ab_channel=NihiraTechiees for any more questions
    //https://www.youtube.com/watch?v=Q8s0CYhnHgM&ab_channel=NihiraTechiees passing authorization header

}
