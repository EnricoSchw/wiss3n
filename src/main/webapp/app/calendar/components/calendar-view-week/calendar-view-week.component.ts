import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-calendar-view-week',
  templateUrl: './calendar-view-week.component.html',
  styleUrls: ['./calendar-view-week.component.scss']
})
export class CalendarViewWeekComponent implements OnInit {

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

    onEventClicked(event) {
        alert(event);
    }

}
