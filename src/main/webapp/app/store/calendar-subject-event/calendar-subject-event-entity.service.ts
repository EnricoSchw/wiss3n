import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import {
    firstHour, getSubjectHourByNumber, getWeekdayByNumber, SubjectHour, SubjectHourData
} from 'app/shared/model/subject-hour.model';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Weekday } from 'rrule';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import { EventColor } from 'calendar-utils';
import { Injectable } from '@angular/core';
import { SubjectEvent } from 'app/shared/model/event.model';
import * as moment from 'moment';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { Moment } from 'moment';


const subjectColor = <EventColor>{
    primary: '#b7b7b7',
    secondary: '#e7e8ee'
};

@Injectable()
export class CalendarSubjectEventEntityService {

    public createSubjectEventsForSchoolClass(schoolClass: ISchoolClass): SubjectEvent[] {
        const hours: SubjectHourData[] = this.mapTeachingHoursToSubjectHourData(
            schoolClass.teachingHours, schoolClass.start.toDate(), schoolClass.end.toDate()
        );
        return this.createSubjectEventListFromSubjectHours(hours);
    }

    private mapTeachingHoursToSubjectHourData( teachingHours: ITeachingHour[], start: Date, end: Date ): SubjectHourData[] {
        const subjectHourData: SubjectHourData[] = [];
        teachingHours.forEach(teachingHour => {
            subjectHourData.push(
                {
                    id: teachingHour.id,
                    title: (teachingHour.teachingSubject !== null )? teachingHour.teachingSubject.name : 'Free',
                    prefix: (teachingHour.teachingSubject !== null)? teachingHour.teachingSubject.prefix : 'Free',
                    hour: getSubjectHourByNumber(teachingHour.weekday),
                    day: getWeekdayByNumber(teachingHour.weekday),
                    color: subjectColor,
                    start: start,
                    end: end
                }
            );
        });

        return subjectHourData;
    }

    private setSubjectHourTime(timeString: string): Date  {
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
    };

    private createSubjectEventListFromSubjectHours(subjectHourList: SubjectHourData[]): SubjectEvent[] {
        const eventList: SubjectEvent[] = [];
        subjectHourList.forEach(subject => {
            eventList.push(<SubjectEvent>{
                title: subject.title,
                prefix: subject.prefix,
                color: subject.color,
                start: this.setSubjectHourTime(subject.hour.start),
                end: this.setSubjectHourTime(subject.hour.end),
                meta: {
                    type: 'subject',
                    isActive: false,
                    subjectHour: subject,
                    events: []
                },
                rrule: {
                    dtstart: startOfWeek(subject.start),
                    until: endOfWeek(subject.end),
                    freq: RRule.WEEKLY,
                    byweekday: [subject.day]
                }
            });
        });
        return eventList;
    };
}