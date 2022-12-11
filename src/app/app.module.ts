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
// import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ToDoComponent } from './to-do/to-do.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthService } from './service/auth.service';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

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
    FileUploadComponent,
    PomodoroComponent,
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
    
  ],
  providers: [
    // CookieService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ,//multi = can be used across multiple classes
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
