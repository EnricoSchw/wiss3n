import { TestBed, inject } from '@angular/core/testing';

import { StoreTeachingSubjectService } from './store-teaching-subject.service';

describe('StoreTeachingSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreTeachingSubjectService]
    });
  });

  it('should be created', inject([StoreTeachingSubjectService], (service: StoreTeachingSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
