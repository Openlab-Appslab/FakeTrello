import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ProfileService],
      providers: [HttpClient]
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
