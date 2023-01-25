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

  isSingleClick: boolean = true;

  

  constructor() { }

  ngOnInit(): void {
  }

  public showHeaderBar: Boolean = false;
  inputVisible = false;
  inputValueMon1: string ='';
  inputValueMon2: string ='';
  inputValueMon3: string ='';
  inputValueMon4: string ='';
  inputValueMon5: string ='';
  inputValueMon6: string ='';
  inputValueMon7: string ='';
  inputValueMon8: string ='';


  inputValueTue1: string ='';
  inputValueTue2: string ='';
  inputValueTue3: string ='';
  inputValueTue4: string ='';
  inputValueTue5: string ='';
  inputValueTue6: string ='';
  inputValueTue7: string ='';
  inputValueTue8: string ='';


  inputValueWed1: string ='';
  inputValueWed2: string ='';
  inputValueWed3: string ='';
  inputValueWed4: string ='';
  inputValueWed5: string ='';
  inputValueWed6: string ='';
  inputValueWed7: string ='';
  inputValueWed8: string ='';


  inputValueThu1: string ='';
  inputValueThu2: string ='';
  inputValueThu3: string ='';
  inputValueThu4: string ='';
  inputValueThu5: string ='';
  inputValueThu6: string ='';
  inputValueThu7: string ='';
  inputValueThu8: string ='';


  inputValueFri1: string ='';
  inputValueFri2: string ='';
  inputValueFri3: string ='';
  inputValueFri4: string ='';
  inputValueFri5: string ='';
  inputValueFri6: string ='';
  inputValueFri7: string ='';
  inputValueFri8: string ='';

  monday: string[] = [this.inputValueMon1, this.inputValueMon2, this.inputValueMon3, this.inputValueMon4, this.inputValueMon5, this.inputValueMon6, this.inputValueMon7, this.inputValueMon8];
  tuesday: string[] = [this.inputValueTue1, this.inputValueTue2, this.inputValueTue3, this.inputValueTue4, this.inputValueTue5, this.inputValueTue6, this.inputValueTue7, this.inputValueTue8];
  wednesday: string[] = [this.inputValueWed1, this.inputValueWed2, this.inputValueWed3, this.inputValueWed4, this.inputValueWed5, this.inputValueWed6, this.inputValueWed7, this.inputValueWed8];
  thursday: string[] = [this.inputValueThu1, this.inputValueThu2, this.inputValueThu3, this.inputValueThu4, this.inputValueThu5, this.inputValueThu6, this.inputValueThu7, this.inputValueThu8];
  friday: string[] = [this.inputValueFri1, this.inputValueFri2, this.inputValueFri3, this.inputValueFri4, this.inputValueFri5, this.inputValueFri6, this.inputValueFri7, this.inputValueFri8];


 


}



