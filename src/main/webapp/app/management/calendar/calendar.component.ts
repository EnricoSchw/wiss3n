import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import {
    addDays, endOfDay, endOfMonth, endOfWeek, setHours, setMinutes, startOfDay, startOfMonth, startOfWeek, subDays
} from 'date-fns';
import { CalendarService } from '../providers/calendar.service';
import { RecurringEvent, TaskEventMeta } from '../models/events';
import { RRule } from 'rrule';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatterService } from '../providers/custom-date-formatter.service';

@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatterService
        }
    ]
})
export class CalendarComponent implements OnInit {

    view = 'month';

    viewDate: Date = new Date('2018-04-22');

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

        subjectEvents.forEach((event) => {
            const rule: RRule = new RRule(event.rrule);

            rule.all().forEach((date) => {
                const start = new Date(date);
                start.setHours(event.start.getHours());
                start.setMinutes(event.start.getMinutes());
                const end = new Date(date);
                end.setHours(event.end.getHours());
                end.setMinutes(event.end.getMinutes());

                calendarEvents.push(<CalendarEvent<TaskEventMeta>>{...event, start, end});
            });
        });

        return calendarEvents;
    }
}
