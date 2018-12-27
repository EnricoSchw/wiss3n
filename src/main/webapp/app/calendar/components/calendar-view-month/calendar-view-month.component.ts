import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'jhi-calendar-view-month',
    templateUrl: './calendar-view-month.component.html',
    styleUrls: ['./calendar-view-month.component.scss']
})
export class CalendarViewMonthComponent implements OnInit {

    @Input() events;
    @Input() viewDate;
    @Input() excludeDays;
    @Output() dayClicked = new EventEmitter<Date>();

    constructor() {
    }

    ngOnInit() {
    }

    onDayClicked(event) {
        const viewDate = event.day.date;
        this.dayClicked.emit(viewDate);
    }
}
