import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { BoardsComponent } from './sidenav_components/boards/boards.component';
import { HighlightsComponent } from './sidenav_components/highlights/highlights.component';
import { SettingsComponent } from './sidenav_components/settings/settings.component';
import { MembersComponent } from './sidenav_components/members/members.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ToDoComponent } from './to-do/to-do.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthService } from './service/auth.service';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './sidenav_components/profile/profile.component';
import { ResourcesComponent } from './resources/resources.component';
import { VerifyEmailComponent } from './security/verify-email/verify-email.component';
import { VerifyDialogComponent } from './security/verify-dialog/verify-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamComponent } from './team/team.component';
import { SecretComponent } from './secret/secret.component';
import { SavedDialogComponent } from './saved-dialog/saved-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    MainComponent,
    BoardsComponent,
    HighlightsComponent,
    SettingsComponent,
    MembersComponent,
    ToDoComponent,
    PomodoroComponent,
    TimetableComponent,
    ProfileComponent,

    ResourcesComponent,
    VerifyEmailComponent,
    VerifyDialogComponent,
    TeamComponent,
    SecretComponent,
    SavedDialogComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatSelectModule,
    MatSliderModule,
    HttpClientModule,
    DragDropModule,
    ScheduleModule, RecurrenceEditorModule, NgbModule,
    MatDialogModule,
    
  ],
  providers: [
    // CookieService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ,//multi = can be used across multiple classes
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
