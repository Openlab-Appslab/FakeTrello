import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  private _registerUrl = "aaa";
  private _loginUrl = "bbb";

  loginUser(email: string, password: string) {
    return this.http.post<any>(this._loginUrl, email+password);
  }

  registerUser(email: string, password: string) {
    return this.http.post<any>(this._registerUrl, email+password);
  }
}
