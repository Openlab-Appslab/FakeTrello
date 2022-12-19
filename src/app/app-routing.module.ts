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
import { ProfileComponent } from './sidenav_components/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "basicRoute", pathMatch: "full" },
  { path: "basicRoute", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "boards", component: BoardsComponent, canActivate: [AuthGuard] },
  { path: "highlights", component: HighlightsComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard]},
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "members", component: MembersComponent, canActivate: [AuthGuard]},
  { path: "todo", component: ToDoComponent, canActivate: [AuthGuard]},
  { path: "pomodoro", component: PomodoroComponent},
  { path: "timeTable", component: TimetableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
