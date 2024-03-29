import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VerifyDialogComponent } from '../security/verify-dialog/verify-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private cookies: CookieService,
    private dialog: MatDialog,
    
  ) { }

  token: string;

  login(email: string, password: string): Observable<any> {

    this.cookies.set('email', email);
    this.cookies.set('password', password);

    const info = btoa(`${email}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
    return this.httpClient.get('http://localhost:8080/login', options).pipe(
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
      return !!(this.cookies.get('email') && this.cookies.get('password'));
    }

    getToken(): string {
      const authString = `${this.cookies.get('email')}:${this.cookies.get('password')}`;
      return 'Basic ' + btoa(authString);
    }

    logout(): void {
      localStorage.removeItem('token');
      this.cookies.deleteAll('/');
    }

    verifyUser(token: string) {

      fetch(`http://localhost:8080/noAuth/verify/${token}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': "application/json; charset=utf8",
        }),
      })
      .then(() => {
      console.log('verify Success!');
      })
      .catch((error) => {
      console.error('Error:' , error);
      alert("faileeedddd")
      });
    }
  
    showRegisterVerifyialog(): void {
      this.dialog.open(VerifyDialogComponent);

      setTimeout  (() => {
        this.dialog.closeAll();
      }, 2000);
    }

    forgotPassword(email: string){
      const url = `http://localhost:8080/noAuth/forgotPassword`;

      const formData = new FormData();
      formData.append('email', email);

      return this.http.post(url, formData);
    }

    resetPassword(password: string, verifToken: string){
      const url = `http://localhost:8080/noAuth/resetPasswordViaVerification/${verifToken}`;

      this.cookies.set('password', password);
      
      const info = btoa(`${this.cookies.get('email')}:${password}`);
      const token = `Basic ${info}`;

      const formData = new FormData();
      formData.append('password', password);

      return this.http.post(url, formData).subscribe((response:any) => {
        console.log(response);
      });

    }
}
