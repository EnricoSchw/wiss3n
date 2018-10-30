import { Injectable } from '@angular/core';
import { SubjectEvent, TaskEventMeta } from 'app/shared/model/event.model';
import { Task, TaskType } from 'app/shared/model/task.model';

import { CalendarEvent } from 'calendar-utils';
import {
    addDays, isSameDay, subDays
} from 'date-fns';
import { RRule } from 'rrule';

@Injectable()
export class CalendarEventService {

    /**
     * Map each task event to his subject hour.
     * @param {SubjectEvent[]} subjectEvents
     * @param {CalendarEvent<TaskEventMeta>[]} orgEvents
     * @returns {SubjectEvent[]}
     */
    public createCalendarEvents(subjectEvents: SubjectEvent[], orgEvents: CalendarEvent<TaskEventMeta>[]): SubjectEvent[] {
        const calendarEvents: SubjectEvent[] = [];
        let nextEvents = orgEvents;

        subjectEvents.forEach(subjectHour => {

            const rule: RRule = new RRule(subjectHour.rrule);
            let eventListOfSubject: CalendarEvent<TaskEventMeta>[] = [];
            nextEvents = nextEvents.reduce((eventList: CalendarEvent<TaskEventMeta>[], current) => {
                if (current.meta.subjectHourData.teachingSubject.id === subjectHour.meta.subjectHourData.teachingSubject.id) {
                    eventListOfSubject.push(current);
                } else {
                    eventList.push(current);
                }
                return eventList;
            }, []);

            rule.all().forEach(date => {
                const start = new Date(date);
                start.setHours(subjectHour.start.getHours());
                start.setMinutes(subjectHour.start.getMinutes());
                const end = new Date(date);
                end.setHours(subjectHour.end.getHours());
                end.setMinutes(subjectHour.end.getMinutes());

                const thisEvents = [];

                eventListOfSubject = eventListOfSubject.reduce((eventList: CalendarEvent<TaskEventMeta>[], current) => {
                    if (isSameDay(start, current.start)) {
                        thisEvents.push(current);
                    } else {
                        eventList.push(current);
                    }
                    return eventList;
                }, []);
                const subjectEvent = <SubjectEvent>{
                    ...subjectHour,
                    start,
                    end,
                    meta: {...subjectHour.meta, events: thisEvents},
                    vxallDay: true
                };
                calendarEvents.push(subjectEvent);
            });
        });

        return calendarEvents;
    }

    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public convertTypeToString(type: TaskType): string {
        return Task.convertTypeToString(type);
    }
}
