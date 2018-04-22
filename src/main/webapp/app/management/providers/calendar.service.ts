import { Injectable } from '@angular/core';
import { colors, TaskEventMeta, RecurringEvent } from '../models/events';
import { CalendarEvent } from 'angular-calendar';
import { TaskType } from 'src/main/webapp/app/entities/task-class-app';
import { RRule } from 'rrule';

@Injectable()
export class CalendarService {

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
                    title: 'Lehrbuch',
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
                    title: 'Test',
                    subject: 1
                }
            }
        ];

    }

    public loadSubjects(): RecurringEvent[] {
        return [
            {
                title: 'Mathematik',
                color: colors.get(TaskType.HAUSAUFGABE),
                startPeriod: new Date('2018-04-01'),
                endPeriod: new Date('2018-05-01'),
                start: new Date('2018-04-24T10:05:00'),
                end: new Date('2018-04-24T11:05:00'),
                rrule: {
                    freq: RRule.WEEKLY,
                    byweekday: [RRule.MO]
                }
            }
        ];
    }
}
