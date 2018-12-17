// import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
// import {
//     getSubjectHourByNumber, getWeekdayByNumber, SubjectHourData
// } from 'app/shared/model/subject-hour.model';
// import { endOfWeek, startOfWeek } from 'date-fns';
// import { RRule } from 'rrule';
// import { EventColor } from 'calendar-utils';
// import { Injectable } from '@angular/core';
// import { SubjectEvent } from 'app/shared/model/event.model';
// import * as moment from 'moment';
// import { ISchoolClass } from 'app/shared/model/school-class.model';
// import { freeTeachingSubject, TeachingSubject } from 'app/shared/model/teaching-subject.model';
//
// const subjectColor = <EventColor>{
//     primary: '#b7b7b7',
//     secondary: '#e7e8ee'
// };
//
// @Injectable()
// export class XxCalendarSubjectEventEntityService {
//
//     public createSubjectEventsForSchoolClass(schoolClass: ISchoolClass): SubjectEvent[] {
//         const hours: SubjectHourData[] = this.mapTeachingHoursToSubjectHourData(
//             schoolClass.teachingHours, schoolClass.start.toDate(), schoolClass.end.toDate()
//         );
//         return this.createSubjectEventListFromSubjectHours(hours);
//     }
//
//     private mapTeachingHoursToSubjectHourData(teachingHours: ITeachingHour[], start: Date, end: Date): SubjectHourData[] {
//         const subjectHourData: SubjectHourData[] = [];
//         const defaulTeachingSubject = freeTeachingSubject;
//
//         teachingHours.forEach(teachingHour => {
//
//             const teachingSubject = (teachingHour.teachingSubject !== null && teachingHour.teachingSubject !== undefined)
//                 ? teachingHour.teachingSubject
//                 : defaulTeachingSubject;
//
//             subjectHourData.push(
//                 {
//                     teachingHour,
//                     title: teachingSubject.name,
//                     prefix: teachingSubject.prefix,
//                     hour: getSubjectHourByNumber(teachingHour.hour),
//                     day: getWeekdayByNumber(teachingHour.weekday),
//                     color: subjectColor,
//                     teachingSubject,
//                     start,
//                     end
//                 }
//             );
//         });
//
//         return subjectHourData;
//     }
//
//     private setSubjectHourTime(timeString: string): Date {
//         return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
//     }
//
//     private createSubjectEventListFromSubjectHours(subjectHourDataList: SubjectHourData[]): SubjectEvent[] {
//         const eventList: SubjectEvent[] = [];
//         subjectHourDataList.forEach(subjectHourData => {
//             eventList.push(<SubjectEvent>{
//                 title: subjectHourData.title,
//                 prefix: subjectHourData.prefix,
//                 color: subjectHourData.color,
//                 start: this.setSubjectHourTime(subjectHourData.hour.start),
//                 end: this.setSubjectHourTime(subjectHourData.hour.end),
//                 meta: {
//                     type: 'subject',
//                     isActive: false,
//                     subjectHourData,
//                     events: []
//                 },
//                 rrule: {
//                     dtstart: startOfWeek(subjectHourData.start),
//                     until: endOfWeek(subjectHourData.end),
//                     freq: RRule.WEEKLY,
//                     byweekday: [subjectHourData.day]
//                 }
//             });
//         });
//
//         return eventList;
//     }
// }
