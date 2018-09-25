import { TestBed, inject } from '@angular/core/testing';

import { StoreSchoolClassService } from './store-school-class.service';

describe('StoreSchoolClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreSchoolClassService]
    });
  });

  it('should be created', inject([StoreSchoolClassService], (service: StoreSchoolClassService) => {
    expect(service).toBeTruthy();
  }));
});
