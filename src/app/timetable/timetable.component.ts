import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SavedDialogComponent } from '../saved-dialog/saved-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-timetable',
  // template: '<ejs-schedule [currentView]="setView" [showHeaderBar]="showHeaderBar" [eventSettings]="eventObject" [selectedDate]="setDate"></ejs-schedule>',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})


export class TimetableComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {

    const mondayCookie = this.cookieService.get('monday');
    if (mondayCookie) {
      this.monday = JSON.parse(mondayCookie);
    }

    const tuesdayCookie = this.cookieService.get('tuesday');
    if (tuesdayCookie) {
      this.tuesday = JSON.parse(tuesdayCookie);
    }

    const wednesdayCookie = this.cookieService.get('wednesday');
    if (wednesdayCookie) {
      this.wednesday = JSON.parse(wednesdayCookie);
    }

    const thursdayCookie = this.cookieService.get('thursday');
    if (thursdayCookie) {
      this.thursday = JSON.parse(thursdayCookie);
    }

    const fridayCookie = this.cookieService.get('friday');
    if (fridayCookie) {
      this.friday = JSON.parse(fridayCookie);
    }

  }


  public showHeaderBar: Boolean = false; // hide header bar

  isSingleClick: boolean = true; // single click to edit event

  inputVisible = false; // show input field

  monday: string[] = ['','', '', '', '', '', '', ''];
  tuesday: string[] = ['','', '', '', '', '', '', ''];
  wednesday: string[] = ['','', '', '', '', '', '', ''];
  thursday: string[] = ['','', '', '', '', '', '', ''];
  friday: string[] = ['','', '', '', '', '', '', ''];

 
  saveArraysToCookies(): void {
    this.cookieService.set('monday', JSON.stringify(this.monday));
    this.cookieService.set('tuesday', JSON.stringify(this.tuesday));
    this.cookieService.set('wednesday', JSON.stringify(this.wednesday));
    this.cookieService.set('thursday', JSON.stringify(this.thursday));
    this.cookieService.set('friday', JSON.stringify(this.friday));
    this.openDialog();
  }

  // sendDataToBackend() {
  //   this.http.post('http://localhost:8000/timetable', {
  //     monday: this.monday,
  //     tuesday: this.tuesday,
  //     wednesday: this.wednesday,
  //     thursday: this.thursday,
  //     friday: this.friday,
  //   }).subscribe((res) => {
  //     console.log(res);
  //   });
    
    

  // }
    
  
  openDialog() {
    this.dialog.open(SavedDialogComponent);

    setTimeout  (() => {
      this.dialog.closeAll();
    }, 2000);
  }

}
