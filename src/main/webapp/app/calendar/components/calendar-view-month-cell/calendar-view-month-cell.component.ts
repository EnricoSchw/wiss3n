import { Component, Input, OnInit } from '@angular/core';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';

@Component({
    selector: 'jhi-calendar-view-month-cell',
    templateUrl: './calendar-view-month-cell.component.html',
    styleUrls: ['./calendar-view-month-cell.component.scss']
})
export class CalendarViewMonthCellComponent implements OnInit {


    @Input() day: MonthViewDay;

    @Input() openDay: MonthViewDay;

    @Input() locale: string;

    constructor() {
    }

    ngOnInit() {
    }

}
