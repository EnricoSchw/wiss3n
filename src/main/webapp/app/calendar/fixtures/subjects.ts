import { EventColor } from 'calendar-utils';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import {
    fifthHour, firstHour, fourthHour, secondHour, sixthHour, SubjectHourData, thirdHour
} from 'app/shared/model/subject-hour.model';
import { SubjectEvent } from 'app/shared/model/event.model';
import * as moment from 'moment';

const subjectColor = <EventColor>{
    primary: '#b7b7b7',
    secondary: '#e7e8ee'
};

const setSubjectHourTime = (timeString: string): Date => {
    return moment('2018-04-01T' + timeString, 'YYYY-MM-DD[T]HH:mm:ss').toDate();
};

const createSubjectEventList = (subjectHourList: SubjectHourData[]): SubjectEvent[] => {
    const eventList: SubjectEvent[] = [];
    subjectHourList.forEach(subjcet => {
        eventList.push(<SubjectEvent>{
            title: subjcet.title,
            prefix: subjcet.prefix,
            color: subjcet.color,
            start: setSubjectHourTime(subjcet.hour.start),
            end: setSubjectHourTime(subjcet.hour.end),
            meta: {
                type: 'subject',
                isActive: false,
                subjectHourData: subjcet,
                events: []
            },
            rrule: {
                dtstart: startOfWeek(subjcet.start),
                until: endOfWeek(subjcet.end),
                freq: RRule.WEEKLY,
                byweekday: [subjcet.day]
            }
        });
    });
    return eventList;
};

export const subjectFixtures = (): SubjectEvent[] => {
    return createSubjectEventList(subjectHours);
};

// ---- Data Set ----
// @TODO We need an algorithm to fill the hours without subjects with free ours.
// @formatter:off

export const subjectHours = <SubjectHourData[]>[
    // {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.MO, hour: firstHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 2, title: 'MusiK', prefix: 'MU', day: RRule.TH, hour: fifthHour, color: subjectColor,  start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 3, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.MO, hour: secondHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 4, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.TU, hour: fourthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 5, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.WE, hour: thirdHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 6, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.WE, hour: fourthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 7, title: 'Englisch', prefix: 'E', day: RRule.MO,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 8, title: 'Englisch', prefix: 'E', day: RRule.TU,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 9, title: 'Englisch', prefix: 'E', day: RRule.TH,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 10, title: 'Englisch', prefix: 'E', day: RRule.FR,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 11, title: 'Mathe', prefix: 'M', day: RRule.MO,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 12, title: 'Mathe', prefix: 'M', day: RRule.TU,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 13, title: 'Mathe', prefix: 'M', day: RRule.TH,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 14, title: 'Mathe', prefix: 'M', day: RRule.WE,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 15, title: 'Mathe', prefix: 'M', day: RRule.FR,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 16, title: 'Deutsch', prefix: 'D', day: RRule.TU,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 17, title: 'Deutsch', prefix: 'D', day: RRule.TU,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 18, title: 'Deutsch', prefix: 'D', day: RRule.WE,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 19, title: 'Deutsch', prefix: 'D', day: RRule.TH,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 20, title: 'Deutsch', prefix: 'D', day: RRule.FR,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 21, title: 'SPB', prefix: 'SPB', day: RRule.MO,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 22, title: 'SPB', prefix: 'SPB', day: RRule.MO,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 23, title: 'Sport', prefix: 'SP', day: RRule.TU,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 24, title: 'Sport', prefix: 'SP', day: RRule.TH,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 25, title: 'Sport', prefix: 'SP', day: RRule.FR,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 26, title: 'Kunst', prefix: 'BK', day: RRule.WE,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 27, title: 'Kunst', prefix: 'BK', day: RRule.FR,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 28, title: 'Geschichte', prefix: 'Gewe', day: RRule.WE,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    // {id: 29, title: 'Geschichte', prefix: 'Gewe', day: RRule.FR,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')},
    //
    // {id: 100, title: 'Free', prefix: 'Free', day: RRule.TH,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01'), end: new Date('2018-06-01')}
];
// @formatter:on
