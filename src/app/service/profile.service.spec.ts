import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
    TestBed.configureTestingModule({
      imports: [ProfileService, HttpClient],
      declarations: [ProfileService],
      providers: [HttpClient, ProfileService]
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
