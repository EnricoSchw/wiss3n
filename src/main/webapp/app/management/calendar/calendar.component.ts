import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { addDays, setHours, setMinutes, subDays } from 'date-fns';
import { CalendarService } from '../providers/calendar.service';
import { TaskEventMeta } from '../models/events';

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
        this.events = this.service.loadTasks();
    }

    skipWeekends(direction: 'back' | 'forward'): void {
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
}
