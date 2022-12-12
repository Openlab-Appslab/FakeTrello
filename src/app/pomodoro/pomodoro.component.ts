import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


    initialMins = 25;
    mins = 25;
    secs = 0;
    isRunning = false;
    isZero = true;
    isBreak = false;
    initialBreak = 5;
    breakMins = 5;
    breakSecs = 0
    // dashoffset = 0;
    // radius = 50;
    // dashoffestUpdate = 2 * Math.PI * 100;
    // heightVal = 100;
    // heightPX = heightVal +'px';
  
  run(){
    this.isRunning = true;
    this.counter();
    this.isBreak = false;
    
  }
  
  reset(){
    this.mins = 25;
    this.secs = 0; 
    this.isRunning = false;
  }
  
  pause(){
    this.isRunning = false;
  }
  increase(){
    if(!this.isRunning)
      this.mins+=1;
  }
  decrease(){
    if(!this.isRunning && this.mins > 0)
      this.mins-=1;
  }
  increaseBreak(){
    if(!this.isRunning)
      this.breakMins+=1;
  }
  decreaseBreak(){
    if(!this.isRunning && this.breakMins > 0)
      this.breakMins-=1;
  }
  breakTime(){
    this.counterBreak();
   console.log("time for break");
  }
  
  counter() {
    setTimeout(() => {
      if ((this.mins || this.secs) && this.isRunning) {
        if (this.secs === 0) {
          this.secs = 59;
          this.mins -= 1;
          
        } else {
          this.secs -= 1;
          // this.dashoffestUpdate--;
          
        }
        this.counter();
      };
      if(this.mins == 0 && this.secs == 0) {
        this.breakTime();
        this.isRunning = false;
        this.isBreak = true;
        this.reset();
      };
     
    }, 1000);
  }
  counterBreak() {
    setTimeout(() => {
      if ((this.breakMins || this.breakSecs) && this.isBreak) {
        if (this.breakSecs === 0) {
          this.breakSecs = 59;
          this.breakMins -= 1;
          
        } else {
          this.breakSecs -= 1;
          // this.dashoffestUpdate--;
          
        }
        this.counterBreak();
      };
      if(this.breakMins == 0 && this.breakSecs == 0) {
        this.counter();
        this.isRunning = true;
        this.isBreak = false;
        this.reset();
      };
     
    }, 1000);
  }
  
  
}

