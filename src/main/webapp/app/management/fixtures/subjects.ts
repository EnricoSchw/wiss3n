import { EventColor } from 'calendar-utils';
import { endOfWeek, startOfWeek } from 'date-fns';
import { RRule } from 'rrule';


const subjectColor = <EventColor>{
    primary: '#284451',
    secondary: '#59a9cb'
};

const music = {
    title: 'MusiK',
    prefix: 'MU',
    color: subjectColor,
    start: new Date('2018-04-24T10:05:00'),
    end: new Date('2018-04-24T11:05:00'),
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
