import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import {
    addDays, endOfDay, endOfMonth, endOfWeek, setHours, setMinutes, startOfDay, startOfMonth, startOfWeek, subDays
} from 'date-fns';
import { CalendarService } from '../providers/calendar.service';
import { RecurringEvent, TaskEventMeta } from '../models/events';
import { RRule } from 'rrule';

@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    view = 'month';

    viewDate: Date = new Date('2016-01-05');

    // exclude weekends
    excludeDays: number[] = [0, 6];

    events: CalendarEvent<TaskEventMeta>[];

    constructor(private service: CalendarService) {
    }

    public ngOnInit(): void {
        const events = this.service.loadTasks();
        const setSubjectsEvents = this.service.loadSubjects();
        this.events = this.setUpCalendarEvents(events, setSubjectsEvents);
    }

    public skipWeekends(direction: 'back' | 'forward'): void {
        if (this.view === 'day') {
            if (direction === 'back') {
                while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
                    this.viewDate = subDays(this.viewDate, 1);
                }
            } else if (direction === 'forward') {
                while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
                    this.viewDate = addDays(this.viewDate, 1);
                }
            }
        }
    }

    public setUpCalendarEvents(events: CalendarEvent<TaskEventMeta>[], subjectEvents: RecurringEvent[]): CalendarEvent<TaskEventMeta>[] {
        const calendarEvents: CalendarEvent<TaskEventMeta>[] = events;

        const startOfPeriod: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        };

        const endOfPeriod: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        };

        subjectEvents.forEach(event => {
            const rule: RRule = new RRule(
                Object.assign({}, event.rrule, {
                    dtstart: startOfPeriod[this.view](this.viewDate),
                    until: endOfPeriod[this.view](this.viewDate)
                })
            );

            rule.all().forEach(date => {
                calendarEvents.push(
                    Object.assign({}, event, {
                        start: new Date(date)
                    })
                );
            });
        });

        return calendarEvents;
    }
}
