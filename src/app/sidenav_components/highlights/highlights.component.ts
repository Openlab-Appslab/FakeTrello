import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {

  constructor(private readonly router: Router,) { 
    
  }

  ngOnInit(): void {
  }

}
