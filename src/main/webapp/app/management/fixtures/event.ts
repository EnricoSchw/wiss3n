import { TaskType, TaskClassApp } from '../../entities/task-class-app';
import { subjectHours } from './subjects';
import { taskTypeSetting, TaskEventMeta } from '../models/events';
import { CalendarEvent } from 'angular-calendar';

export const events = <CalendarEvent<TaskEventMeta>[]>[
    {
        start: new Date('2018-04-26T12:05:00'),
        end: new Date('2018-04-26T13:05:00'),
        title: 'One day excluded event',
        color: taskTypeSetting.get(TaskType.HAUSAUFGABE),
        meta: {
            task: <TaskClassApp>{
                type: TaskType.HAUSAUFGABE
            },
            subjectHour: subjectHours[1]
        }
    },
    {
        start: new Date('2018-04-24T10:05:00'),
        end: new Date('2018-04-24T11:05:00'),
        title: 'Multiple weeks event',
        color: taskTypeSetting.get(TaskType.TEST),
        meta: {
            task: <TaskClassApp>{
                type: TaskType.TEST
            },
            subjectHour: subjectHours[3]
        }
    }
];
