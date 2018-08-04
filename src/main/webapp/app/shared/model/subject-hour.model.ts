import { EventColor } from 'calendar-utils';
import * as RRule from 'rrule';

export interface SubjectHourData {
    id: number;
    title: string;
    prefix: string;
    color: EventColor;
    hour: SubjectHour;
    day: RRule.Weekday;
    start: Date;
    end: Date;
}

export interface SubjectHour {
    index: number;
    start: string;
    end: string;
}

export const firstHour = <SubjectHour>{
    index: 1,
    start: '01:00:00',
    end: '02:00:00'
};

export const secondHour = <SubjectHour> {
    index: 2,
    start: '02:00:00',
    end: '03:00:00'
};

export const thirdHour = <SubjectHour> {
    index: 3,
    start: '03:00:00',
    end: '04:00:00'
};

export const fourthHour = <SubjectHour> {
    index: 4,
    start: '04:00:00',
    end: '05:00:00'
};

export const fifthHour = <SubjectHour> {
    index: 5,
    start: '05:00:00',
    end: '06:00:00'
};

export const sixthHour = <SubjectHour> {
    index: 6,
    start: '06:00:00',
    end: '07:00:00'
};

export const seventhHour = <SubjectHour> {
    index: 7,
    start: '07:00:00',
    end: '08:00:00'
};

export const eighthHour = <SubjectHour> {
    index: 7,
    start: '07:00:00',
    end: '08:00:00'
};

export const ninthHour = <SubjectHour> {
    index: 7,
    start: '07:00:00',
    end: '08:00:00'
};

export const tenthHour = <SubjectHour> {
    index: 7,
    start: '07:00:00',
    end: '08:00:00'
};

export const getSubjectHourByNumber = (day: number): SubjectHour => {
    switch (day) {
        case 1:
            return firstHour;
        case 2:
            return secondHour;
        case 3:
            return thirdHour;
        case 4:
            return fourthHour;
        case 5:
            return fifthHour;
        case 6:
            return sixthHour;
        case 7:
            return seventhHour;
        case 8:
            return eighthHour;
        case 9:
            return ninthHour;
        case 10:
            return tenthHour;

    }
};

export const getWeekdayByNumber = (day: number): RRule.Weekday => {
    switch (day) {
        case 1:
            return RRule.MO;
        case 2:
            return RRule.TU;
        case 3:
            return RRule.WE;
        case 4:
            return RRule.TH;
        case 5:
            return RRule.FR;
    }
};
