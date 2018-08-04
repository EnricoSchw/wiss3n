import { Injectable } from '@angular/core';
import { TaskEventMeta, SubjectEvent } from 'app/shared/model/event.model';
import { CalendarEvent } from 'angular-calendar';
import { subjectFixtures } from '../fixtures/subjects';
import { events } from '../fixtures/event';
import { SchoolClassService } from 'app/entities/school-class/school-class.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { JhiAlertService } from 'ng-jhipster';
import { EntityMapperService } from 'app/calendar/providers/entity-mapper.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CalendarService {
    constructor(
        private schoolClassService: SchoolClassService,
        private entityMapperService: EntityMapperService,
        private jhiAlertService: JhiAlertService) {
    }

    public loadTeachingHours(schoolClassId: number): Observable<SubjectEvent[]> {
        return this.schoolClassService.searchForTeachingHours(schoolClassId, {
                page: 0,
                size: 50
            }
        ).map((res: HttpResponse<ITeachingHour[]>) => this.entityMapperService.mapTeachingHoursToSubjectHourData(res.body)
        ).map((data) => this.entityMapperService.createSubjectEventList(data));
    }

    loadSubjectEvents(teachingHours: ITeachingHour[]): SubjectEvent[] {
        const data = this.entityMapperService.mapTeachingHoursToSubjectHourData(teachingHours);
        return this.entityMapperService.createSubjectEventList(data);
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return events;
    }

    public loadSubjects(): SubjectEvent[] {
        return subjectFixtures();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
