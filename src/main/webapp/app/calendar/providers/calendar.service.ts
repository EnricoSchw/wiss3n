import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { StoreCalendarLessonDataService } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.service';
import { CalendarLesson, CalendarLessonData } from 'app/shared/model/calendar-lesson-data.model';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import { map, take } from 'rxjs/operators';
import moment = require('moment');

interface SchoolClassData {
    start: Date;
    end: Date;
    lessons: CalendarLesson[];
}

@Injectable()
export class CalendarService {
    constructor(
        private calendarStore: StoreCalendarLessonDataService,
        private teachingHourService: TeachingHourService,
        private schoolClassService: StoreSchoolClassService
    ) {
    }

    loadLessonEvents(): Observable<CalendarEvent<CalendarLesson>[]> {
        return this.calendarStore
            .getActiveCalendarLessonData()
            .flatMap(data => this.getSchoolClassData(data))
            .map(data => this.createCalendarLessonEvents(data));
    }

    private getSchoolClassData(lessonData: CalendarLessonData): Observable<SchoolClassData> {
        return this.schoolClassService
            .get(lessonData.id)
            .pipe(
                take(1),
                map(schoolClass => (
                    {
                        // start: moment(schoolClass.start.format('YYYY-MM-DD[T]HH:mm:ss')).toDate(),
                        start: moment(schoolClass.start).toDate(),
                        end: moment(schoolClass.end).toDate(),
                        lessons: lessonData.lessons
                    }
                ))
            );
    }

    private createCalendarLessonEvents(data: SchoolClassData): CalendarEvent<CalendarLesson>[] {
        const events: CalendarEvent<CalendarLesson>[] = [];

        // data.lessons.forEach(lesson => {
        //     const rule: RRule = this.createRule(data.start, data.end);
        //
        //
        //     // let eventListOfSubject: CalendarEvent<TaskEventMeta>[] = [];
        //     // nextEvents = nextEvents.reduce((eventList: CalendarEvent<TaskEventMeta>[], current) => {
        //     //     if (current.meta.subjectHourData.teachingSubject.id === subjectHour.meta.subjectHourData.teachingSubject.id) {
        //     //         eventListOfSubject.push(current);
        //     //     } else {
        //     //         eventList.push(current);
        //     //     }
        //     //     return eventList;
        //     // }, []);
        //
        //     rule.all().forEach(date => {
        //         const start = new Date(date);
        //         start.setHours(subjectHour.start.getHours());
        //         start.setMinutes(subjectHour.start.getMinutes());
        //         const end = new Date(date);
        //         end.setHours(subjectHour.end.getHours());
        //         end.setMinutes(subjectHour.end.getMinutes());
        //
        //         const thisEvents = [];
        //
        //         eventListOfSubject = eventListOfSubject.reduce((eventList: CalendarEvent<TaskEventMeta>[], current) => {
        //             if (isSameDay(start, current.start)) {
        //                 thisEvents.push(current);
        //             } else {
        //                 eventList.push(current);
        //             }
        //             return eventList;
        //         }, []);
        //         const subjectEvent = <SubjectEvent>{
        //             ...subjectHour,
        //             start,
        //             end,
        //             meta: {...subjectHour.meta, events: thisEvents},
        //             vxallDay: true
        //         };
        //         calendarEvents.push(subjectEvent);
        //     });
        // });

        return events;

    }

    private createRule(startDate: Date, endDate: Date): RRule {
        return new RRule({
            dtstart: startOfWeek(startDate),
            until: endOfWeek(endDate),
            freq: RRule.WEEKLY,
            byweekday: []
        });
    }

    // public loadTasks(): CalendarEvent<TaskEventMeta>[] {
    //     return events;
    // }
    //
    // public loadSubjects(): Observable<SubjectEvent[]> {
    //     return Observable.of(subjectFixtures());
    // }
    //
    // setTeachingSubjectInTeachingHour(subjectHourData: SubjectHourData, teachingSubject: ITeachingSubject) : Observable<SubjectHourData> {
    //     const newSubjectHourData: SubjectHourData = {...subjectHourData};
    //     newSubjectHourData.teachingHour.teachingSubject = teachingSubject;
    //
    //     return this.calendarSubjectEventStoreService.getActiveSchoolClassId()
    //         .flatMap(id => this.storeSchoolClassService.get(id))
    //         // get school class
    //         // 1. --> update school class in store with new teaching hour and subject hour
    //         // 2. --> update calendar event store by school class
    //         // -----> select school class from store
    //         // -----> update newSubjectHourData to this schoolClass
    //         // 3. --> update teaching hour in backend with new teaching subject (finish)
    //         // 4. --> update calendar with new teaching hour and subject
    //         // -----> 1. way iterate events and update
    //         // -----> 2. way recreate events from calendar event store
    //         .map(schoolClass => newSubjectHourData.teachingHour.schoolClass =({...schoolClass, teachingHours: null, teachingSubjects: null}))
    //         .flatMap(() => this.teachingHourService.update(newSubjectHourData.teachingHour))
    //         .map(() => newSubjectHourData)
    //         .take(1)
    // }

}
