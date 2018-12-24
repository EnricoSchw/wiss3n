import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, ViewPeriod } from 'calendar-utils';
import {
    addDays, isSameDay, subDays
} from 'date-fns';
import { RRule } from 'rrule';
import { CalendarDateFormatter } from 'angular-calendar';
import { Task, TaskType } from 'app/shared/model/task.model';

import { Observable } from 'rxjs/Observable';
import { CalendarLesson } from 'app/shared/model/calendar-lesson-data.model';
import { CalendarService } from 'app/calendar/providers/calendar.service';
import { CustomDateFormatter } from 'app/calendar/util/custom-date-formatter';

@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss', './scss/media-queries.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})
export class CalendarComponent implements OnInit {
    view = 'month';
    viewDate: Date = new Date('2018-07-16');
    // exclude weekends
    monthEvents: CalendarEvent<any>[];
    weekEvents$: Observable<CalendarEvent<CalendarLesson>[]>;

    private activeEvent: CalendarEvent<CalendarLesson>;

    constructor(
        private service: CalendarService

    ) {
    }

    public ngOnInit(): void {

        const events = []; // this.service.loadTasks();
        this.weekEvents$ = this.service
            .loadLessonEvents()
            .map(subjects => {
                this.activeEvent = null;
                return []
                //return this.calendarEventService.createCalendarEvents(subjects, events);
            });

        this.monthEvents = events;
    }

    public beforeDayViewRender({period}: { period: ViewPeriod }): void {
        // const events: SubjectEvent[] = <SubjectEvent[]> period.events;
        // if (events.length > 0) {
        //     if ((this.activeEvent === null || this.activeEvent === undefined)) {
        //         this.setActiveEvent(events[0]);
        //     }
        //     if (!isSameDay(this.activeEvent.start, this.viewDate)) {
        //         this.setActiveEvent(events[0]);
        //     }
        // }
    }




    /**
     * Convert Task Type to string
     * @param {TaskType} type
     * @returns {string}
     */
    public convertTypeToString(type: TaskType): string {
        return Task.convertTypeToString(type);
    }

    public clickSubjectEventInWeek({event}: { event: CalendarEvent }): void {
        this.setActiveEvent(event);
        this.viewDate = event.start;
        this.view = 'day';
    }

    public clickSubjectEventInDay({event}: { event: CalendarEvent }): void {
        this.setActiveEvent(event);
    }

    private setActiveEvent(event: CalendarEvent) {
        if (this.activeEvent) {
            //this.activeEvent.meta.isActive = false;
        }
        //event.meta.isActive = true;
        this.activeEvent = event;
    }

}
