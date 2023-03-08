import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SavedDialogComponent } from '../saved-dialog/saved-dialog.component';

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
  ) { }

  ngOnInit(): void {
  }


  public showHeaderBar: Boolean = false; // hide header bar

  isSingleClick: boolean = true; // single click to edit event

  inputVisible = false; // show input field

  monday: string[] = ['','', '', '', '', '', '', ''];
  tuesday: string[] = ['','', '', '', '', '', '', ''];
  wednesday: string[] = ['','', '', '', '', '', '', ''];
  thursday: string[] = ['','', '', '', '', '', '', ''];
  friday: string[] = ['','', '', '', '', '', '', ''];


  sendDataToBackend() {
    this.http.post('http://localhost:8000/timetable', {
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
    }).subscribe((res) => {
      console.log(res);
    });
    
    this.openDialog();
    
  }
  
  openDialog() {
    this.dialog.open(SavedDialogComponent);

    setTimeout  (() => {
      this.dialog.closeAll();
    }, 2000);
  }

}
