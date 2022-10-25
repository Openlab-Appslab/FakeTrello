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

  loginUrl = 'http://localhost:8080/XXXX';
  registerUrl = 'http://localhost:8080/XXXX';

  constructor(
    private readonly http: HttpClient,
    // public cookies: CookieService,
    private router: Router,
    
  ) { }

    proceedLogin(usercred: any){
      return this.http.post(this.loginUrl,usercred);
    }

    ProceedRegister(usercred: any){
      return this.http.post(this.registerUrl,usercred);
    }

    isLoggedIn(){
      return localStorage.getItem('token') != null;
    }

    GetToken(){
      return localStorage.getItem('token') || '';
    }

    HaveAccess(){
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
