import { Injectable } from '@angular/core';
import { TaskEventMeta, SubjectEvent } from 'app/shared/model/event.model';
import { CalendarEvent } from 'angular-calendar';
import { subjectFixtures } from '../fixtures/subjects';
import { events } from '../fixtures/event';
import { Observable, Subscribable } from 'rxjs/Observable';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { SubjectHourData } from 'app/shared/model/subject-hour.model';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { ISchoolClass } from 'app/shared/model/school-class.model';

@Injectable()
export class CalendarService {
    constructor(
        private calendarSubjectEventStoreService: CalendarSubjectEventStoreService,
        private teachingHourService: TeachingHourService,
        private storeSchoolClassService: StoreSchoolClassService
    ) {
    }

    loadSubjectEvents(): Observable<SubjectEvent[]> {
        return this.calendarSubjectEventStoreService.getActiveSubjectEvents();
    }


    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return events;
    }

    public loadSubjects(): Observable<SubjectEvent[]> {
        return Observable.of(subjectFixtures());
    }

    setTeachingSubjectInTeachingHour(subjectHourData: SubjectHourData, teachingSubject: ITeachingSubject) : Observable<SubjectHourData> {
        const newSubjectHourData: SubjectHourData = {...subjectHourData};
        newSubjectHourData.teachingHour.teachingSubject = teachingSubject;

        return this.calendarSubjectEventStoreService.getActiveSchoolClassId()
            .flatMap(id => this.storeSchoolClassService.get(id))
            // get school class
            // 1. --> update school class in store with new teaching hour and subject hour
            // 2. --> update calendar event store by school class
            // -----> select school class from store
            // -----> update newSubjectHourData to this schoolClass
            // 3. --> update teaching hour in backend with new teaching subject (finish)
            // 4. --> update calendar with new teaching hour and subject
            // -----> 1. way iterate events and update
            // -----> 2. way recreate events from calendar event store
            .map(schoolClass => newSubjectHourData.teachingHour.schoolClass =({...schoolClass, teachingHours: null, teachingSubjects: null}))
            .flatMap(() => this.teachingHourService.update(newSubjectHourData.teachingHour))
            .map(() => newSubjectHourData)
            .take(1)
    }

}
