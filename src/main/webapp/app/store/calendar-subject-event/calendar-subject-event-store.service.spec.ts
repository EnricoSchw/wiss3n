import { TestBed, inject } from '@angular/core/testing';

import { CalendarSubjectEventStoreService } from './calendar-subject-event-store.service';

describe('CalendarSubjectEventStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarSubjectEventStoreService]
    });
  });

  it('should be created', inject([CalendarSubjectEventStoreService], (service: CalendarSubjectEventStoreService) => {
    expect(service).toBeTruthy();
  }));
});
