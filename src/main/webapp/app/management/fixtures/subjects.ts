import { EventColor } from 'calendar-utils';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import {
    fifthHour, firstHour, fourthHour, secondHour, sixthHour, SubjectHour, thirdHour
} from '../models/subject-hour';
import { RecurringEvent } from '../models/events';


interface SubjectHourData {
    id: number;
    title: string,
    prefix: string,
    color: EventColor,
    hour: SubjectHour,
    day: RRule.Weekday,
    start: Date,
}

const subjectColor = <EventColor>{
    primary: '#284451',
    secondary: '#59a9cb'
};

const setSubjectHourTime = (timeString: string): Date => {
    return new Date('2018-04-01T' + timeString);
};

const createSubjectEventList = (subjectHourList: SubjectHourData[]): RecurringEvent[]  => {
    const eventList: RecurringEvent[] = [];
    subjectHourList.forEach((subjcet) => {
        eventList.push( <RecurringEvent>{
            title: subjcet.title,
            prefix: subjcet.prefix,
            color: subjectColor,
            start: setSubjectHourTime(subjcet.hour.start),
            end: setSubjectHourTime(subjcet.hour.end),
            meta: {
                type: 'subject',
                subject: 1
            },
            rrule: {
                dtstart: startOfWeek(new Date('2018-04-01')),
                until: endOfWeek(new Date('2018-05-01')),
                freq: RRule.WEEKLY,
                byweekday: [RRule.MO]
            }
        });
    });
    return eventList;
};

const subjectHourList = <SubjectHourData[]>[
    {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.MO, hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.MO, hour: fifthHour, color: subjectColor,  start: new Date('2018-04-01')},
    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.MO, hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.MO,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01')}
];


export const subjectFixtures = (): RecurringEvent[] => {
    return createSubjectEventList(subjectHourList);
};
