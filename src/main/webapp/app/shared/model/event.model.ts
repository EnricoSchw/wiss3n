import { EventColor, CalendarEvent } from 'calendar-utils';
import { Task, TaskType } from 'app/shared/model/task.model';
import { SubjectHourData } from './subject-hour.model';
// import * as RRule from 'rrule';
import { RRule } from 'rrule';

export interface TaskEventMeta {
    isActive: boolean;
    task: Task;
    subjectHour: SubjectHourData;
}

export interface SubjectEventMeta {
    isActive: boolean;
    subjectHour: SubjectHourData;
    events: CalendarEvent<TaskEventMeta>[];
}

export interface SubjectEvent extends CalendarEvent<SubjectEventMeta> {
    title: string;
    prefix: string;
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
    meta: SubjectEventMeta;
}

// setting for TaskType
// ------------------------------------------------------------

export interface TaskTypeSet extends EventColor {
    prefix: string;
}

export class TaskTypeSetting {

    private list: { [type: string]: TaskTypeSet } = {  };

    get(type: TaskType): TaskTypeSet {
        return this.list[type.valueOf()];
    }

    set(type: TaskType, setting: TaskTypeSet) {
        this.list[type.valueOf()] = setting;
    }
}

export const taskTypeSetting = new TaskTypeSetting();

taskTypeSetting.set(TaskType.HAUSAUFGABE, {
    prefix: 'HA',
    primary: '#284451',
    secondary: '#59a9cb'
});

taskTypeSetting.set(TaskType.VORTRAG, {
    prefix: 'Vortrag',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.KURZKONTROLLE, {
    prefix: 'KK',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.TEST, {
    prefix: 'Test',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.KLAUSUR, {
    prefix: 'Klausur',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});

taskTypeSetting.set(TaskType.MUENDLICH, {
    prefix: 'MÜ',
    primary: '#ad2121',
    secondary: '#FAE3E3'
});
