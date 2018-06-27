import { TaskType, TaskClassApp } from '../../entities/task-class-app';
import { subjectHours } from './subjects';
import { taskTypeSetting, TaskEventMeta } from '../models/events';
import { CalendarEvent } from 'angular-calendar';

export const events = <CalendarEvent<TaskEventMeta>[]>[
    {
        start: new Date('2018-04-26T12:05:00'),
        end: new Date('2018-04-26T13:05:00'),
        title: 'Lehrbuch: Seite 22 Nummer 3,a,b,c',
        color: taskTypeSetting.get(TaskType.HAUSAUFGABE),
        meta: {
            task: <TaskClassApp>{
                type: TaskType.HAUSAUFGABE,
                titel: 'Lehrbuch: Seite 22 Nummer 3,a,b,c',
                content: '-'
            },
            isActive: false,
            subjectHour: subjectHours[1]
        }
    },
    {
        start: new Date('2018-04-24T10:05:00'),
        end: new Date('2018-04-24T11:05:00'),
        title: 'Integralrechnung',
        color: taskTypeSetting.get(TaskType.TEST),
        meta: {
            task: <TaskClassApp>{
                type: TaskType.TEST,
                titel: 'Integralrechnung',
                content: '- Flächeninhalt, Volumeninhalt'

            },
            isActive: false,
            subjectHour: subjectHours[3]
        }
    }
];
