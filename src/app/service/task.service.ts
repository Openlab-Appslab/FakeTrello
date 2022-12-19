import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    
  ) { }

  createTask(text: string, deadline: string): Observable<any>{
    console.log(text, deadline);
    console.log("service works");

    return this.http.post('http://localhost:8080/createTask', {
      text,
      deadline,
    }, httpOptions);
  }

  getAllUserTasks(): Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:8080/getAllUsersTasks');
  }
}
