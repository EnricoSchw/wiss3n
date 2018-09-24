import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    selectActiveCalendarSubjectEvent, selectActiveCalendarSubjectEventId, State
} from 'app/store/calendar-subject-event/calendar-subject-event.reducer';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { CalendarSubjectEventEntityService } from 'app/store/calendar-subject-event/calendar-subject-event-entity.service';
import { forEach } from '@angular/router/src/utils/collection';
import { SubjectEvent } from 'app/shared/model/event.model';
import { CalendarSubjectEvent } from 'app/store/calendar-subject-event/calendar-subject-event.model';
import {
    ActivateCalendarSubjectEvent,
    LoadCalendarSubjectEvents
} from 'app/store/calendar-subject-event/calendar-subject-event.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/observable/from';

@Injectable({
    providedIn: 'root'
})
export class CalendarSubjectEventStoreService {

    constructor(
        private store: Store<State>,
        private entityService: CalendarSubjectEventEntityService) {
    }

    public loadAll(schoolClassList: ISchoolClass[]) {
        const calendarSubjectEvents: CalendarSubjectEvent[] = [];

        schoolClassList.forEach(schoolClass => {
            const subjectEvents: SubjectEvent[] = this.entityService.createSubjectEventsForSchoolClass(schoolClass);
            calendarSubjectEvents.push({
                id: schoolClass.id,
                start: schoolClass.start,
                end: schoolClass.end,
                subjectEvents
            });
        });
        this.store.dispatch(new LoadCalendarSubjectEvents({calendarSubjectEvents}));
    }

    public getActiveSubjectEvents(): Observable<SubjectEvent[]> {
        return this.store.pipe(select(selectActiveCalendarSubjectEvent))
            .filter(s => s !== null && s !== undefined)
            .map(events => events.subjectEvents);
    }

    public activateBySchoolClassId(id: number) {
        this.store.dispatch(new ActivateCalendarSubjectEvent({id}));
    }

    public getActiveSchoolClassId(): Observable<number> {
        return this.store.pipe(select(selectActiveCalendarSubjectEventId));
    }

}
