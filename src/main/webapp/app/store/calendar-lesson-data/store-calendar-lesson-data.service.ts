import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    selectActiveCalendarLessonData,
    selectActiveCalendarLessonDataId, State
} from 'app/store/calendar-lesson-data/store-calendar-lesson-data.reducer';

import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/observable/from';
import { CalendarLessonData } from 'app/shared/model/calendar-lesson-data.model';
import {
    ActivateCalendarLessonData, LoadCalendarLessonDataSet
} from 'app/store/calendar-lesson-data/store-calendar-lesson-data.actions';

@Injectable({
    providedIn: 'root'
})
export class StoreCalendarLessonDataService {

    constructor(
        private store: Store<State>) {
    }

    public loadBySchoolClassList() {

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

    public getActiveCalendarLessonData(): Observable<CalendarLessonData> {
        return this.store.pipe(select(selectActiveCalendarLessonData))
            .filter(s => s !== null && s !== undefined);
    }

    public activateBySchoolClassId(id: number) {
        this.store.dispatch(new ActivateCalendarLessonData({id}));
    }

    public getActiveSchoolClassId(): Observable<number> {
        return this.store.pipe(select(selectActiveCalendarLessonDataId));
    }

}
