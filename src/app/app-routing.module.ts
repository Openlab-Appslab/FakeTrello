import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';  
import { MainComponent } from './main/main.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { BoardsComponent } from './sidenav_components/boards/boards.component';
import { HighlightsComponent } from './sidenav_components/highlights/highlights.component';
import { MembersComponent } from './sidenav_components/members/members.component';
import { SettingsComponent } from './sidenav_components/settings/settings.component';
import { WorkspaceComponent } from './sidenav_components/workspace/workspace.component';

const routes: Routes = [
  { path: "", redirectTo: "basicRoute", pathMatch: "full" },
  { path: "basicRoute", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "boards", component: BoardsComponent },
  { path: "highlights", component: HighlightsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "members", component: MembersComponent },
  { path: "workspace", component: WorkspaceComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
