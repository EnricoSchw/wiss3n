import { EventColor } from 'calendar-utils';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import {
    fifthHour, firstHour, fourthHour, secondHour, sixthHour, SubjectHour, thirdHour
} from '../models/subject-hour';
import { RecurringEvent } from '../models/events';

interface SubjectHourData {
    id: number;
    title: string;
    prefix: string;
    color: EventColor;
    hour: SubjectHour;
    day: RRule.Weekday;
    start: Date;
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
                subject: subjcet.id
            },
            rrule: {
                dtstart: startOfWeek(subjcet.start),
                until: endOfWeek(subjcet.start),
                freq: RRule.WEEKLY,
                byweekday: [subjcet.day]
            }
        });
    });
    return eventList;
};

const subjectHours = <SubjectHourData[]>[
    {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.MO, hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 1, title: 'MusiK', prefix: 'MU', day: RRule.TH, hour: fifthHour, color: subjectColor,  start: new Date('2018-04-01')},

    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.MO, hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.TU, hour: fourthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.WE, hour: thirdHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.WE, hour: fourthHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 3, title: 'Englisch', prefix: 'E', day: RRule.MO,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 3, title: 'Englisch', prefix: 'E', day: RRule.TU,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 3, title: 'Englisch', prefix: 'E', day: RRule.TH,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 3, title: 'Englisch', prefix: 'E', day: RRule.FR,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 4, title: 'Mathe', prefix: 'M', day: RRule.MO,  hour: fourthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 4, title: 'Mathe', prefix: 'M', day: RRule.TU,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 4, title: 'Mathe', prefix: 'M', day: RRule.TH,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 4, title: 'Mathe', prefix: 'M', day: RRule.WE,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 4, title: 'Mathe', prefix: 'M', day: RRule.FR,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 5, title: 'Deutsch', prefix: 'D', day: RRule.TU,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 5, title: 'Deutsch', prefix: 'D', day: RRule.TU,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 5, title: 'Deutsch', prefix: 'D', day: RRule.WE,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 5, title: 'Deutsch', prefix: 'D', day: RRule.TH,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 5, title: 'Deutsch', prefix: 'D', day: RRule.FR,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 6, title: 'SPB', prefix: 'SPB', day: RRule.MO,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 6, title: 'SPB', prefix: 'SPB', day: RRule.MO,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 7, title: 'Sport', prefix: 'SP', day: RRule.TU,  hour: secondHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 7, title: 'Sport', prefix: 'SP', day: RRule.TH,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 7, title: 'Sport', prefix: 'SP', day: RRule.FR,  hour: thirdHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 8, title: 'Kunst', prefix: 'BK', day: RRule.WE,  hour: firstHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 8, title: 'Kunst', prefix: 'BK', day: RRule.FR,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01')},

    {id: 9, title: 'Geschichte', prefix: 'Gewe', day: RRule.WE,  hour: fifthHour, color: subjectColor, start: new Date('2018-04-01')},
    {id: 9, title: 'Geschichte', prefix: 'Gewe', day: RRule.FR,  hour: sixthHour, color: subjectColor, start: new Date('2018-04-01')},
];

export const subjectFixtures = (): RecurringEvent[] => {
    return createSubjectEventList(subjectHours);
};
