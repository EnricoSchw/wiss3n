import { Component, OnInit } from '@angular/core';
import {
    addDays, isSameDay, subDays
} from 'date-fns';

@Component({
    selector: 'jhi-calendar-menu',
    templateUrl: './calendar-menu.component.html',
    styleUrls: ['./calendar-menu.component.css']
})
export class CalendarMenuComponent implements OnInit {

    public view = 'month';
    public viewDate: Date = new Date('2018-07-16');
    excludeDays: number[] = [0, 6];

    constructor() {
    }

    ngOnInit() {
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
}
