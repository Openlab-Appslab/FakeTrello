import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDialogComponent } from './saved-dialog.component';

describe('SavedDialogComponent', () => {
  let component: SavedDialogComponent;
  let fixture: ComponentFixture<SavedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
