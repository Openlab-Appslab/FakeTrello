import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, RenderCellEventArgs, View } from '@syncfusion/ej2-angular-schedule';
import { removeClass } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-timetable',
  // template: '<ejs-schedule [currentView]="setView" [showHeaderBar]="showHeaderBar" [eventSettings]="eventObject" [selectedDate]="setDate"></ejs-schedule>',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  // public setView: View = 'WorkWeek';
  // public setDate: Date = new Date(2022, 11, 12);
  // private eventData: DataManager = new DataManager({
  //   url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true
  // });


  // public eventObject: EventSettingsModel = {
  //   dataSource: this.eventData, 
  // }

  constructor() { }

  ngOnInit(): void {
  }

  public showHeaderBar: Boolean = false;

  

}

let monday: string[] = ['', '', '', '', '', '', ''];
let tuesday: string[] = ['', '', '', '', '', '', ''];
let wednesday: string[] = ['', '', '', '', '', '', ''];
let thursday: string[] = ['', '', '', '', '', '', ''];
let friday: string[] = ['', '', '', '', '', '', ''];

