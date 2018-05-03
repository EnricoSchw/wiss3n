import { EventColor } from 'calendar-utils';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';
import { fifthHour, firstHour, fourthHour, secondHour, sixthHour, thirdHour } from '../models/subject-hour';
import { RecurringEvent } from '../models/events';
import { WeekDay } from '@angular/common';


interface SubjectHourData {
    id: number;
    title: string,
    prefix: string,
    hour: WeekDay,
    color: EventColor
}

const subjectColor = <EventColor>{
    primary: '#284451',
    secondary: '#59a9cb'
};

const setTime = (): Date => {
    switch ()
    return new Date('2018-04-01T' + time);
};

const createSubjectEventList = (subjectHourList: SubjectHourData[]) => {


    subjectHourList.forEach((subjcet) => {
        naviMonday = <RecurringEvent>{
            title: subjcet.title,
            prefix: subjcet.prefix,
            color: subjectColor,
            start: setTime(subjcet.hour).start,
            end: setTime(subjcet.hour).end,
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
        };
    })
};

const subjectHourList = <SubjectHourData[]>[
    {id: 1, title: 'MusiK', prefix: 'MU', hour: 1, color: subjectColor},
    {id: 1, title: 'MusiK', prefix: 'MU', hour: 1, color: subjectColor},
    {id: 2, title: 'Naturwissenschaft', prefix: 'Nawi', day: RRule.MO, hour: 2, color: subjectColor},
    {id: 1, title: 'MusiK', prefix: 'MU', hour: 1, color: subjectColor}
];


const naviMonday = <RecurringEvent>{
    title: 'Naturwissenschaft',
    prefix: 'Nawi',
    color: subjectColor,
    start: setTime(secondHour.start),
    end: setTime(secondHour.end),
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
};

const englishMonday = <RecurringEvent>{
    title: 'Enlisch',
    prefix: 'E',
    color: subjectColor,
    start: thirdHour.start,
    end: thirdHour.end,
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
};

const matheMonday = <RecurringEvent>{
    title: 'Mathematik',
    prefix: 'Ma',
    color: subjectColor,
    start: fourthHour.start,
    end: fourthHour.end,
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
};

const spb1Monday = <RecurringEvent>{
    title: 'SPB',
    prefix: 'SPB',
    color: subjectColor,
    start: fifthHour.start,
    end: fifthHour.end,
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
};


const spb2Monday = <RecurringEvent>{
    title: 'SPB',
    prefix: 'SPB',
    color: subjectColor,
    start: sixthHour.start,
    end: sixthHour.end,
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
};


//##############Tuesday

const englishTuesday = <RecurringEvent>{
    title: 'Englisch',
    prefix: 'E',
    color: subjectColor,
    start: firstHour.start,
    end: firstHour.end,
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
};

const naviMonday = <RecurringEvent>{
    title: 'Naturwissenschaft',
    prefix: 'Nawi',
    color: subjectColor,
    start: secondHour.start,
    end: secondHour.end,
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
};

const englishMonday = <RecurringEvent>{
    title: 'Enlisch',
    prefix: 'E',
    color: subjectColor,
    start: thirdHour.start,
    end: thirdHour.end,
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
};

const matheMonday = <RecurringEvent>{
    title: 'Mathematik',
    prefix: 'Ma',
    color: subjectColor,
    start: fourthHour.start,
    end: fourthHour.end,
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
};

const spb1Monday = <RecurringEvent>{
    title: 'SPB',
    prefix: 'SPB',
    color: subjectColor,
    start: fifthHour.start,
    end: fifthHour.end,
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
};


const spb2Monday = <RecurringEvent>{
    title: 'SPB',
    prefix: 'SPB',
    color: subjectColor,
    start: sixthHour.start,
    end: sixthHour.end,
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
};
