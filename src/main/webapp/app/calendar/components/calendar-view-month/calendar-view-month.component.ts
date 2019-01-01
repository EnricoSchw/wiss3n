import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CalendarViewMonthCellComponent } from 'app/calendar/components/calendar-view-month-cell/calendar-view-month-cell.component';

@Component({
    selector: 'jhi-calendar-view-month',
    templateUrl: './calendar-view-month.component.html',
    styleUrls: ['./calendar-view-month.component.scss']
})
export class CalendarViewMonthComponent implements OnInit {

    // @ViewChild('customMonthCellTemplate') customMonthCellTemplate: CalendarViewMonthCellComponent;

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
