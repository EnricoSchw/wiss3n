import { Injectable } from '@angular/core';
import { TaskEventMeta, SubjectEvent } from 'app/shared/model/event.model';
import { CalendarEvent } from 'angular-calendar';
import { subjectFixtures } from '../fixtures/subjects';
import { events } from '../fixtures/event';
import { Observable } from 'rxjs/Observable';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';

@Injectable()
export class CalendarService {
    constructor(
        private storeService: CalendarSubjectEventStoreService) {
    }

    loadSubjectEvents(): Observable<SubjectEvent[]> {
        return this.storeService.getActiveSubjectEvents();
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return events;
    }

    public loadSubjects(): Observable<SubjectEvent[]> {
        return Observable.of(subjectFixtures());
    }

}
