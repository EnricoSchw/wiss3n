import { Injectable } from '@angular/core';
import { TaskEventMeta, SubjectEvent } from 'app/shared/model/event.model';
import { CalendarEvent } from 'angular-calendar';
import { subjectFixtures,  } from '../fixtures/subjects';
import { events } from '../fixtures/event';

@Injectable()
export class CalendarService {
    constructor() {
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return events;
    }

    public loadSubjects(): SubjectEvent[] {
        return subjectFixtures();
    }
}
