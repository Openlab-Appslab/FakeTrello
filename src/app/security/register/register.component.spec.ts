import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { FormControl, FormGroup } from '@angular/forms';



describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [ RegisterComponent ],
      providers: [HttpClient, HttpHandler, MatDialog, Overlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.registerGroup = new FormGroup({
      password: new FormControl('1234'),
      repeatPassword: new FormControl('1234'),
    });
  });

  it('should return true when passwords match', () => {
    const result = component.passwordsMatch();
    expect(result).toBeTruthy();
  });

  it('should return false when passwords do not match', () => {
    component.registerGroup.controls['repeatPassword'].setValue('password456');
    const result = component.passwordsMatch();
    expect(result).toBeFalsy();
  });
});
