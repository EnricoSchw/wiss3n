import { TestBed, inject } from '@angular/core/testing';

import { SchoolClassInitService } from './school-class-init.service';

describe('SchoolClassInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolClassInitService]
    });
  });

  it('should be created', inject([SchoolClassInitService], (service: SchoolClassInitService) => {
    expect(service).toBeTruthy();
  }));
});
