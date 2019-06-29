import { Injectable } from '@angular/core';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { Observable } from 'rxjs/Observable';
import { freeTeachingSubject, TeachingSubject } from 'app/shared/model/teaching-subject.model';
import { defaultIfEmpty, flatMap, map } from 'rxjs/operators';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';

@Injectable()
export class CalendarViewDataService {
    constructor(
        private teachingHourService: StoreTeachingHourService,
        private teachingSubjectService: StoreTeachingSubjectService
    ) {
    }

    public getTeachingSubjectByTeachingHour(teachingHourId: number): Observable<TeachingSubject> {
        return this.teachingHourService
            .get(teachingHourId)
            .pipe(
                map(teachinhHour => teachinhHour.teachingSubjectId),
                flatMap(id => this.teachingSubjectService.get(id)),
                map(t => t === null ? freeTeachingSubject : t)
            );
    }
}
