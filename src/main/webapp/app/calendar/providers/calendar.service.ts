import { Injectable } from '@angular/core';
import { TaskEventMeta, SubjectEvent } from 'app/shared/model/event.model';
import { CalendarEvent } from 'angular-calendar';
import { subjectFixtures } from '../fixtures/subjects';
import { events } from '../fixtures/event';
import { Observable } from 'rxjs/Observable';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { TeachingHour } from 'app/shared/model/teaching-hour.model';
import { SubjectHourData } from 'app/shared/model/subject-hour.model';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';

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

    setTeachingSubjectInTeachingHour(subjectHourData: SubjectHourData, teachingSubject: ITeachingSubject) {
        let newSubjectHourData: SubjectHourData;
        return this.calendarSubjectEventStoreService.getActiveSchoolClassId()
            .flatMap(id => this.storeSchoolClassService.get(id))
            .map(schoolClass => newSubjectHourData.teachingHour.schoolClass = schoolClass)
            .map(() => newSubjectHourData.teachingHour.teachingSubject = teachingSubject)
            .flatMap(() => this.teachingHourService.update(newSubjectHourData.teachingHour))
            .map(() => newSubjectHourData);
    }

}
