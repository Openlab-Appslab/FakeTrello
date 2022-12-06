import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    service = TestBed.inject(ProfileService);
    TestBed.configureTestingModule({
      imports: [HttpClient],
      declarations: [],
      providers: [HttpClient]
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
