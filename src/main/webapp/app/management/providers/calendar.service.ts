import { Injectable } from '@angular/core';
import { colors, TaskEventMeta } from '../models/events';
import { CalendarEvent } from 'angular-calendar';
import { TaskType } from 'src/main/webapp/app/entities/task-class-app';

@Injectable()
export class CalendarService {

    constructor() {
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return [
            {
                start: new Date('2016-01-08'),
                end: new Date('2016-01-10'),
                title: 'One day excluded event',
                color: colors.get(TaskType.HAUSAUFGABE),
                meta: {
                    type: TaskType.HAUSAUFGABE,
                    title: 'Lehrbuch',
                    subject: 1
                }
            },
            {
                start: new Date('2016-01-01'),
                end: new Date('2016-01-09'),
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

}
