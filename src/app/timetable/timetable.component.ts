import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timetable',
  // template: '<ejs-schedule [currentView]="setView" [showHeaderBar]="showHeaderBar" [eventSettings]="eventObject" [selectedDate]="setDate"></ejs-schedule>',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})


export class TimetableComponent implements OnInit {

  constructor(
    private http: HttpClient,
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
}



