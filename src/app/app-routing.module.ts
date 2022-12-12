import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';  
import { AuthGuard } from './guard/auth.guard';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { BoardsComponent } from './sidenav_components/boards/boards.component';
import { HighlightsComponent } from './sidenav_components/highlights/highlights.component';
import { MembersComponent } from './sidenav_components/members/members.component';
import { SettingsComponent } from './sidenav_components/settings/settings.component';
import { ToDoComponent } from './to-do/to-do.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TimetableComponent } from './timetable/timetable.component';

const routes: Routes = [
  { path: "", redirectTo: "basicRoute", pathMatch: "full" },
  { path: "basicRoute", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "boards", component: BoardsComponent, canActivate: [AuthGuard] },
  { path: "highlights", component: HighlightsComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard]},
  { path: "members", component: MembersComponent, canActivate: [AuthGuard]},
  { path: "todo", component: ToDoComponent, canActivate: [AuthGuard]},
  { path: "pomodoro", component: PomodoroComponent},
  { path: "timeTable", component: TimetableComponent },
  /*we can add RoleGuard to the path to check if the user has the right role to access the page, in this case the token must have the role "admin" 
    or it will not be able to access the page*/
  //could add guard to prevent unauthorized access to certaion routes but we are doing that differently by using *ngIf in our html code
  //update: added the auth guard to the routes just to try it out
  

  /*canActivate: [AuthGuard]
  canActivate: [AuthGuard]*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
