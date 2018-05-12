import { Injectable } from '@angular/core';
import { colors, TaskEventMeta, SubjectEvent } from '../models/events';
import { CalendarEvent } from 'angular-calendar';
import { TaskType } from 'src/main/webapp/app/entities/task-class-app';
import { subjectFixtures } from '../fixtures/subjects';

@Injectable()
export class CalendarService {
    constructor() {
    }

    public loadTasks(): CalendarEvent<TaskEventMeta>[] {
        return [
            {
                start: new Date('2018-04-26T12:05:00'),
                end: new Date('2018-04-26T13:05:00'),
                title: 'One day excluded event',
                color: colors.get(TaskType.HAUSAUFGABE),
                meta: {
                    type: TaskType.HAUSAUFGABE,
                    subjectHourId: 2
                }
            },
            {
                start: new Date('2018-04-24T10:05:00'),
                end: new Date('2018-04-24T11:05:00'),
                title: 'Multiple weeks event',
                color: colors.get(TaskType.TEST),
                meta: {
                    type: TaskType.TEST,
                    subjectHourId: 4
                }
            }
        ];
    }

    public loadSubjects(): SubjectEvent[] {
        return subjectFixtures();
    }
}
