import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, ViewPeriod } from 'calendar-utils';
import {
    addDays, isSameDay, subDays
} from 'date-fns';
import { CalendarService } from '../providers/calendar.service';
import { RRule } from 'rrule';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatterService } from '../providers/custom-date-formatter.service';
import { Task, TaskType } from 'app/shared/model/task.model';
import { SubjectEvent, TaskEventMeta } from 'app/shared/model/event.model';
import { Observable } from 'rxjs/Observable';
import { CalendarEventService } from 'app/calendar/providers/calendar-event.service';

@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss', './media-queries.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatterService
        }
    ]
})
export class CalendarComponent implements OnInit {
    view = 'month';
    viewDate: Date = new Date('2018-07-16');
    // exclude weekends
    excludeDays: number[] = [0, 6];
    monthEvents: CalendarEvent<TaskEventMeta>[];
    weekEvents$: Observable<SubjectEvent[]>;

    private activeEvent: SubjectEvent;

    constructor(
        private service: CalendarService,
        private calendarEventService: CalendarEventService

    ) {
    }

    public ngOnInit(): void {

        const events = []; // this.service.loadTasks();
        this.weekEvents$ = this.service
            .loadSubjectEvents()
            .map(subjects => {
                this.activeEvent = null;
                return this.calendarEventService.createCalendarEvents(subjects, events);
            });

        this.monthEvents = events;
    }

    public beforeDayViewRender({period}: { period: ViewPeriod }): void {
        const events: SubjectEvent[] = <SubjectEvent[]> period.events;
        if (events.length > 0) {
            if ((this.activeEvent === null || this.activeEvent === undefined)) {
                this.setActiveEvent(events[0]);
            }
            if (!isSameDay(this.activeEvent.start, this.viewDate)) {
                this.setActiveEvent(events[0]);
            }
        }
    }

    public navigateCalendar(direction: 'back' | 'forward'): void {
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


    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public convertTypeToString(type: TaskType): string {
        return Task.convertTypeToString(type);
    }

    public clickSubjectEventInWeek({event}: { event: SubjectEvent }): void {
        this.setActiveEvent(event);
        this.viewDate = event.start;
        this.view = 'day';
    }

    public clickSubjectEventInDay({event}: { event: SubjectEvent }): void {
        this.setActiveEvent(event);
    }

    private setActiveEvent(event: SubjectEvent) {
        if (this.activeEvent) {
            this.activeEvent.meta.isActive = false;
        }
        event.meta.isActive = true;
        this.activeEvent = event;
    }

}
