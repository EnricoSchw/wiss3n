import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { firstHour, getSubjectHourByNumber, SubjectHour, SubjectHourData } from 'app/shared/model/subject-hour.model';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Weekday } from 'rrule';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import { EventColor } from 'calendar-utils';
import { Injectable } from '@angular/core';
import { SubjectEvent } from 'app/shared/model/event.model';
import * as moment from 'moment';


const subjectColor = <EventColor>{
    primary: '#b7b7b7',
    secondary: '#e7e8ee'
};

@Injectable()
export class EntityMapperService {

    public mapTeachingHoursToSubjectHourData( teachingHours: ITeachingHour[] ): SubjectHourData[] {
        const subjectHourData: SubjectHourData[] = [];
        teachingHours.forEach(teachingHour => {
            subjectHourData.push(
                {
                    id: teachingHour.id,
                    title: (teachingHour.teachingSubject.name)? teachingHour.teachingSubject.name : 'Free',
                    prefix: (teachingHour.teachingSubject.prefix)? teachingHour.teachingSubject.prefix : 'Free',
                    hour: getSubjectHourByNumber(teachingHour.weekday),
                    day: new Weekday(teachingHour.weekday, 0),
                    color: subjectColor,
                    start: new Date('2018-04-01'),
                    end: new Date('2018-06-01')
                }
            );
        });

        return subjectHourData;
    }



    private setSubjectHourTime(timeString: string): Date  {
        return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
    };

    public createSubjectEventList(subjectHourList: SubjectHourData[]): SubjectEvent[] {
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
