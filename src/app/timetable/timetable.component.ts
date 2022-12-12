import { Component, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-timetable',
  template: '<ejs-schedule [currentView]="setView"></ejs-schedule>',
  //templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  public setView: View = 'WorkWeek';

  constructor() { }

  ngOnInit(): void {
  }

  

}
