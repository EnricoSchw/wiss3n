import { EventColor } from 'calendar-utils';

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
