import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { addDays, setHours, setMinutes, subDays } from 'date-fns';

export const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'jhi-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent  {

    view = 'month';

    viewDate: Date = new Date('2016-01-05');

    events: CalendarEvent[] = [
        {
            start: new Date('2016-01-08'),
            end: new Date('2016-01-10'),
            title: 'One day excluded event',
            color: colors.red
        },
        {
            start: new Date('2016-01-01'),
            end: new Date('2016-01-09'),
            title: 'Multiple weeks event',
            color: colors.blue
        }
    ];

    // exclude weekends
    excludeDays: number[] = [0, 6];

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
