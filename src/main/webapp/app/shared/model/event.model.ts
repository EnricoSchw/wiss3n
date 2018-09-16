import { CalendarEvent } from 'calendar-utils';
import { Task } from './task.model';
import { SubjectHourData } from './subject-hour.model';
// import * as RRule from 'rrule';
import { RRule } from 'rrule';

export interface EventMeta {
    isActive: boolean;
    subjectHourData: SubjectHourData
}
export interface TaskEventMeta extends EventMeta{
    task: Task;
}

export interface SubjectEventMeta extends EventMeta {
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
