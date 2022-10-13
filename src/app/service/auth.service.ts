import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
