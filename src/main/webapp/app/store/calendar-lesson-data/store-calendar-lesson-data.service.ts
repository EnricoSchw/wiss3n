import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CalendarEvent } from 'calendar-utils';
import { State } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.reducer';
import { ISchoolClass, SchoolClass } from 'app/shared/model/school-class.model';

import { forEach } from '@angular/router/src/utils/collection';


import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/observable/from';
import { CalendarLessonData } from 'app/shared/model/calendar-lesson-data.model';
import { LoadCalendarLessonDataSet } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.actions';
import { SubjectEvent } from 'app/shared/model/xxx-event.model';

@Injectable({
    providedIn: 'root'
})
export class StoreCalendarLessonDataService {

    constructor(
        private store: Store<State>) {
    }

    public loadAll(calendarLessonDataSet: CalendarLessonData[]) {
        // const calendarSubjectEvents: CalendarSubjectEvent[] = [];
        //
        // schoolClassList.forEach(schoolClass => {
        //     const subjectEvents: SubjectEvent[] = this.entityService.createSubjectEventsForSchoolClass(schoolClass);
        //     calendarSubjectEvents.push({
        //         id: schoolClass.id,
        //         start: schoolClass.start,
        //         end: schoolClass.end,
        //         subjectEvents
        //     });
        // });
        this.store.dispatch(new LoadCalendarLessonDataSet({calendarLessonDataSet}));
    }



    public getActiveEvents(): Observable<CalendarEvent<CalendarLesson>[]> {
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
