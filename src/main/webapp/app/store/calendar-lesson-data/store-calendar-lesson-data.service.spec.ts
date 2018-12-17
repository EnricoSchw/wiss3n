import { TestBed, inject } from '@angular/core/testing';

import { StoreCalendarLessonDataService } from './calendar-subject-event-store.service';

describe('CalendarSubjectEventStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreCalendarLessonDataService]
    });
  });

  it('should be created', inject([StoreCalendarLessonDataService], (service: StoreCalendarLessonDataService) => {
    expect(service).toBeTruthy();
  }));
});
