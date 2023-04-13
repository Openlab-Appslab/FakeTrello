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

  createTask(title: string, text: string, deadline: string): Observable<any>{
    console.log(text, deadline);
    console.log("service works");

    return this.http.post('http://localhost:8080/createTask', {
      title,
      text,
      deadline,
      // state: "toDo",
    }, httpOptions);
  }

  updateTask(task: ITask): Observable<void> {
    const url = `http://localhost:8080/updateTaskState/${task.id}`;
    return this.http.put<void>(url, task);
  }

  getAllUserTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>('http://localhost:8080/getAllUsersTasks');
  }

  public editTask(task: ITask): Observable<ITask> {
    console.log(task, "send to backend task edit");
    return this.http.put<ITask>('http://localhost:8080/editTask', task);
  }

  deleteTask(taskId: number): Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/deleteTask/${taskId}`);
  }
}
