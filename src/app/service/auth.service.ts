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
    // public cookies: CookieService,
    private router: Router,
    
  ) { }

    proceedLogin(email: string, password: string){
      return this.http.post(`${this.apiServerUrl}/showBSI`,email + password);
    }

    proceedRegister(email: string, password: string){
      return this.http.post(`${this.apiServerUrl}/noAuth/register`,email + password);
    }

    isLoggedIn(){
      return localStorage.getItem('token') != null;
    }

    getToken(){
      return localStorage.getItem('token') || '';
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
