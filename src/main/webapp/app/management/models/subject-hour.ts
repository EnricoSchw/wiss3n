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
    start: string;
    end: string;
}

export const firstHour = <SubjectHour>{
    start: '01:00:00',
    end: '02:00:00'
};

export const secondHour = <SubjectHour> {
    start: '02:00:00',
    end: '03:00:00'
};

export const thirdHour = <SubjectHour> {
    start: '03:00:00',
    end: '04:00:00'
};

export const fourthHour = <SubjectHour> {
    start: '04:00:00',
    end: '05:00:00'
};

export const fifthHour = <SubjectHour> {
    start: '05:00:00',
    end: '06:00:00'
};

export const sixthHour = <SubjectHour> {
    start: '06:00:00',
    end: '07:00:00'
};

export const seventhHour = <SubjectHour> {
    start: '07:00:00',
    end: '08:00:00'
};
