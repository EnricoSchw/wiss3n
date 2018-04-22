import { EventColor, CalendarEvent } from 'calendar-utils';
import { RRule } from 'rrule';
import { TaskType } from '../../entities/task-class-app';

export interface TaskEventMeta {
    type: TaskType | 'subject';
    subject: number;
}

export interface RecurringEvent extends CalendarEvent<TaskEventMeta> {
    title: string;
    color: any;
    start:  Date;
    end: Date;
    rrule?: {
        dtstart: Date;
        until: Date;
        freq: RRule.Frequency;
        bymonth?: number;
        bymonthday?: number;
        byweekday?: RRule.Weekday[];
    };
    meta: TaskEventMeta;
}

export class EventColorList {

    private list: { [type: number]: EventColor } = [];

    get(type: TaskType): EventColor {
        return this.list[type.valueOf()];
    }

    set(type: TaskType, color: EventColor) {
        this.list[type.valueOf()] = color;
    }
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
