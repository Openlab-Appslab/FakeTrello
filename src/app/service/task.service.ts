import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../model/task';

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

  getAllUserTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>('http://localhost:8080/getAllUsersTasks');
  }

  public editTask(task: ITask): Observable<ITask> {
    console.log(task, "send to backend task edit");
    return this.http.put<ITask>('http://localhost:8080/editTask', task);
  }
}
