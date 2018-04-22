import { EventColor } from 'calendar-utils';
import {
    getMonth,
    startOfMonth,
    startOfWeek,
    startOfDay,
    endOfMonth,
    endOfWeek,
    endOfDay
} from 'date-fns';
import { RRule } from 'rrule';
import { TaskType } from 'src/main/webapp/app/entities/task-class-app';

export class EventColorList {

    private list: { [type: number]: EventColor } = [];

    get(type: TaskType): EventColor {
        return this.list[type.valueOf()];
    }

    set(type: TaskType, color: EventColor) {
        this.list[type.valueOf()] = color;
    }
}

export interface RecurringEvent {
    title: string;
    color: any;
    startPeriod: Date;
    endPeriod: Date;
    start:  Date;
    end: Date;
    rrule?: {
        freq: RRule.Frequency;
        bymonth?: number;
        bymonthday?: number;
        byweekday?: RRule.Weekday[];
    };
}

export const colors = new EventColorList();

colors.set(TaskType.HAUSAUFGABE, {
    primary: '#284451',
    secondary: '#59a9cb'
});

colors.set(TaskType.VORTRAG, {
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

colors.set(TaskType.KURZKONTROLLE, {
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

colors.set(TaskType.TEST, {
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

colors.set(TaskType.KLAUSUR, {
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

colors.set(TaskType.MUENDLICH, {
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

export interface TaskEventMeta {
    type: TaskType;
    title: string;
    subject: number;
}
