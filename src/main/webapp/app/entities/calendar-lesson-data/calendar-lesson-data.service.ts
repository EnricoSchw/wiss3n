import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarLessonData, getLessonHourByNumber } from 'app/shared/model/calendar-lesson-data.model';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { StoreCalendarLessonDataService } from 'app/store/calendar-lesson-data/store-calendar-lesson-data.service';
import { freeTeachingSubject } from 'app/shared/model/teaching-subject.model';

@Injectable({providedIn: 'root'})
export class CalendarLessonDataService {

    constructor(private store: StoreCalendarLessonDataService) {
    }

    public loadAll(schoolClassList: ISchoolClass[]) {
        const calendarLessonDataSet: CalendarLessonData[] = [];
        schoolClassList.forEach(schoolClass => {
            const calendarLessonData: CalendarLessonData = this.createLessonData(schoolClass);
            calendarLessonDataSet.push(calendarLessonData);
        });
        this.store.loadAll(calendarLessonDataSet);
    }

    public activateBySchoolClassId(id: number) {
        this.store.activateBySchoolClassId(id);
    }

    private createLessonData(schoolClass: ISchoolClass): CalendarLessonData {
        const data: CalendarLessonData = {
            id: schoolClass.id,
            lessons: []
        };
        const defaultTeachingSubjectId = freeTeachingSubject.id;
        const teachingHours: ITeachingHour[] = schoolClass.teachingHours;
        teachingHours.forEach(teachingHour => {

            const teachingSubjectId = (teachingHour.teachingSubject !== null && teachingHour.teachingSubject !== undefined)
                ? teachingHour.teachingSubject.id
                : defaultTeachingSubjectId;

            data.lessons.push({
                lessonHour: getLessonHourByNumber(teachingHour.hour),
                teachingHourId: teachingHour.id,
                teachingSubjectId
            });
            //
            //         subjectHourData.push(
            //             {
            //                 teachingHour,
            //                 title: teachingSubject.name,
            //                 prefix: teachingSubject.prefix,
            //                 hour: getSubjectHourByNumber(teachingHour.hour),
            //                 day: getWeekdayByNumber(teachingHour.weekday),
            //                 color: subjectColor,
            //                 teachingSubject,
            //                 start,
            //                 end
            //             }
            //         );
        });
        return data;

    }

    public getCalendarEvent(schholClass): CalendarEvent<CalendarLessonData> {
        return null;
    }

    // public createLessonData(schoolClass: ISchoolClass): CalendarLessonData[] {
    //     const hours: SubjectHourData[] = this.mapTeachingHoursToSubjectHourData(
    //         schoolClass.teachingHours, schoolClass.start.toDate(), schoolClass.end.toDate()
    //     );
    //     return this.createSubjectEventListFromSubjectHours(hours);
    // }
    //
    // private mapTeachingHoursToSubjectHourData(teachingHours: ITeachingHour[], start: Date, end: Date): SubjectHourData[] {
    //     const subjectHourData: SubjectHourData[] = [];
    //     const defaulTeachingSubject = freeTeachingSubject;
    //
    //     teachingHours.forEach(teachingHour => {
    //
    //         const teachingSubject = (teachingHour.teachingSubject !== null && teachingHour.teachingSubject !== undefined)
    //             ? teachingHour.teachingSubject
    //             : defaulTeachingSubject;
    //
    //         subjectHourData.push(
    //             {
    //                 teachingHour,
    //                 title: teachingSubject.name,
    //                 prefix: teachingSubject.prefix,
    //                 hour: getSubjectHourByNumber(teachingHour.hour),
    //                 day: getWeekdayByNumber(teachingHour.weekday),
    //                 color: subjectColor,
    //                 teachingSubject,
    //                 start,
    //                 end
    //             }
    //         );
    //     });
    //
    //     return subjectHourData;
    // }
    //
    // private setSubjectHourTime(timeString: string): Date {
    //     return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
    // }
    //
    // private createSubjectEventListFromSubjectHours(subjectHourDataList: SubjectHourData[]): SubjectEvent[] {
    //     const eventList: SubjectEvent[] = [];
    //     subjectHourDataList.forEach(subjectHourData => {
    //         eventList.push(<SubjectEvent>{
    //             title: subjectHourData.title,
    //             prefix: subjectHourData.prefix,
    //             color: subjectHourData.color,
    //             start: this.setSubjectHourTime(subjectHourData.hour.start),
    //             end: this.setSubjectHourTime(subjectHourData.hour.end),
    //             meta: {
    //                 type: 'subject',
    //                 isActive: false,
    //                 subjectHourData,
    //                 events: []
    //             },
    //             rrule: {
    //                 dtstart: startOfWeek(subjectHourData.start),
    //                 until: endOfWeek(subjectHourData.end),
    //                 freq: RRule.WEEKLY,
    //                 byweekday: [subjectHourData.day]
    //             }
    //         });
    //     });
    //
    //     return eventList;
    // }

}
