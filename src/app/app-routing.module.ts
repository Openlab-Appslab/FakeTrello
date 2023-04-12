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
import { VerifyEmailComponent } from './security/verify-email/verify-email.component';
import { ResourcesComponent } from './resources/resources.component';
import { TeamComponent } from './team/team.component';
import { SecretComponent } from './secret/secret.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: "", redirectTo: "basicRoute", pathMatch: "full" },
  { path: "basicRoute", component: MainComponent },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "verifyEmail/:code", component: VerifyEmailComponent },

  { path: "boards", component: BoardsComponent, canActivate: [AuthGuard] },
  { path: "highlights", component: HighlightsComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard]},
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "members", component: MembersComponent, canActivate: [AuthGuard]},
  { path: "todo", component: ToDoComponent, canActivate: [AuthGuard]},
  { path: "pomodoro", component: PomodoroComponent},
  { path: "timeTable", component: TimetableComponent },
  { path: "resources", component: ResourcesComponent },
  { path: "team", component: TeamComponent },
  { path: "secret", component: SecretComponent },
  { path: "forgotPassword" , component: ForgotPasswordComponent},
  { path: "resetPassword", component: ResetPasswordComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
