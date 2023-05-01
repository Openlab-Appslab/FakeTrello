import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableComponent } from './timetable.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import 'web-animations-js'; // Uncomment this line
import { RouterTestingModule } from '@angular/router/testing';



describe('TimetableComponent', () => {
  let component: TimetableComponent;
  let fixture: ComponentFixture<TimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        
        HttpClient,
        HttpHandler,
        MatDialog,
        Overlay,
      ],
      imports: [MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
