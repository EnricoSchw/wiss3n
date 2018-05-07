import { Injectable } from '@angular/core';
import { colors, TaskEventMeta, RecurringEvent } from '../models/events';
import { CalendarEvent } from 'angular-calendar';
import { TaskType } from 'src/main/webapp/app/entities/task-class-app';
import { RRule } from 'rrule';
import {
    addDays, endOfDay, endOfMonth, endOfWeek, setHours, setMinutes, startOfDay, startOfMonth, startOfWeek, subDays
} from 'date-fns';
import { subjectFixtures } from '../fixtures/subjects';

@Injectable()
export class CalendarService {

    private startOfPeriod: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
    };

    private endOfPeriod: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
    };

    constructor() {
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return [
            {
                start: new Date('2018-04-24T12:05:00'),
                end: new Date('2018-04-24T13:05:00'),
                title: 'One day excluded event',
                color: colors.get(TaskType.HAUSAUFGABE),
                meta: {
                    type: TaskType.HAUSAUFGABE,
                    subject: 1
                }
            },
            {
                start: new Date('2018-04-24T10:05:00'),
                end: new Date('2018-04-24T11:05:00'),
                title: 'Multiple weeks event',
                color: colors.get(TaskType.TEST),
                meta: {
                    type: TaskType.TEST,
                    subject: 2
                }
            }
        ];

    }

    public loadSubjects(): RecurringEvent[] {
        return subjectFixtures();
    }
}
