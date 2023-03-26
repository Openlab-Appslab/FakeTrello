import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/model/profileData';
import { ITask } from 'src/app/model/task';
import { ProfileService } from 'src/app/service/profile.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileData: ProfileData;
  public tasks: ITask[] = [];

  constructor(
    private profileService: ProfileService,
    private taskService: TaskService,
    
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAllUserTasks();
  }

  public getAllUserTasks(): void { 
    this.taskService.getAllUserTasks().subscribe( 
      (response: ITask[]) => {
        this.tasks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUserData(): void{ //getting all user listings list, the binding it to the model in html file
    this.profileService.getProfileData().subscribe( //subscribe waits for the response from the server and then executes the code inside the subscribe
      (response: ProfileData) => {
        this.profileData = response;
        console.log('my profileData', this.profileData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
