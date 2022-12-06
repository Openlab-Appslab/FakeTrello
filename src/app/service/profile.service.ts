import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileData } from '../model/profileData';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,

  ) { }

  addProfileData(firstName: string, lastName: string, nickName: string, phoneNumber: string){
    console.log(firstName, lastName, nickName, phoneNumber);

    return this.http.put('http://localhost:8080/edit/user', {
      firstName,
      lastName,
      nickName,
      phoneNumber,
    }, httpOptions);
  }

  getProfileData(): Observable<ProfileData>{
    return this.http.get<ProfileData>('http://localhost:8080/getUserDetails');
  }
}
