import * as RRule from 'rrule';

/**
 * This Object is a Map for the lessons of a week for each school class
 *
 * Means each school class has a list of lessons
 *  + lessonHour
 *  + teaching hour
 *  + teaching subject
 */
export interface CalendarLessonData {
    /** schoolClassId */
    id: number;
    lessons: CalendarLesson[];

    // This should part of Calendar Events
    // title: string;
    // prefix: string;
    // hour: LessonHour;
    // color: EventColor;
    // day: RRule.Weekday;
    // start: Date;
    // end: Date;
}

export interface CalendarLesson {
    lessonHour: LessonHour;
    teachingHourId: number;
    teachingSubjectId: number | null;
}

export interface LessonHour {
    index: number;
    start: string;
    end: string;
}

export const firstHour = <LessonHour>{
    index: 1,
    start: '01:00:00',
    end: '02:00:00'
};

export const secondHour = <LessonHour> {
    index: 2,
    start: '02:00:00',
    end: '03:00:00'
};

export const thirdHour = <LessonHour> {
    index: 3,
    start: '03:00:00',
    end: '04:00:00'
};

export const fourthHour = <LessonHour> {
    index: 4,
    start: '04:00:00',
    end: '05:00:00'
};

export const fifthHour = <LessonHour> {
    index: 5,
    start: '05:00:00',
    end: '06:00:00'
};

export const sixthHour = <LessonHour> {
    index: 6,
    start: '06:00:00',
    end: '07:00:00'
};

export const seventhHour = <LessonHour> {
    index: 7,
    start: '07:00:00',
    end: '08:00:00'
};

export const eighthHour = <LessonHour> {
    index: 8,
    start: '08:00:00',
    end: '09:00:00'
};

export const ninthHour = <LessonHour> {
    index: 9,
    start: '09:00:00',
    end: '10:00:00'
};

export const tenthHour = <LessonHour> {
    index: 10,
    start: '10:00:00',
    end: '11:00:00'
};

export const getLessonHourByNumber = (day: number): LessonHour => {
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
