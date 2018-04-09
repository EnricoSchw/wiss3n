import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { setHours, setMinutes } from 'date-fns';

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
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent  {

    view = 'week';

    viewDate: Date = new Date();

    events: CalendarEvent[] = [
        {
            title: 'No event end date',
            start: setHours(setMinutes(new Date(), 0), 3),
            color: colors.blue
        },
        {
            title: 'No event end date',
            start: setHours(setMinutes(new Date(), 0), 5),
            color: colors.yellow
        }
    ];

}
