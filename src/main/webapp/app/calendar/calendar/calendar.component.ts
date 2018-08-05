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

    constructor(private service: CalendarService) {
    }

    public ngOnInit(): void {

        const events = this.service.loadTasks();
        this.weekEvents$ = this.service
            .loadSubjectEvents()
            .map(subjects => {
                this.activeEvent = null;
                return this.mapSubjectsToWeekEvents(subjects, events);
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
     * Map each task event to his subject hour.
     * @param {SubjectEvent[]} subjectHours
     * @param {CalendarEvent<TaskEventMeta>[]} orgEvents
     * @returns {SubjectEvent[]}
     */
    private mapSubjectsToWeekEvents(subjectHours: SubjectEvent[], orgEvents: CalendarEvent<TaskEventMeta>[]): SubjectEvent[] {
        const calendarEvents: SubjectEvent[] = [];
        let nextEvents = orgEvents;

        subjectHours.forEach(subjectHour => {
            const rule: RRule = new RRule(subjectHour.rrule);
            let eventListOfSubject: CalendarEvent<TaskEventMeta>[] = [];
            nextEvents = nextEvents.reduce((eventList: CalendarEvent<TaskEventMeta>[], current) => {
                if (current.meta.subjectHour.id === subjectHour.meta.subjectHour.id) {
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
