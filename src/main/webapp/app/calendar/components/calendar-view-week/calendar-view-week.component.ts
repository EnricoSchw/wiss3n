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
    @Output() cellClicked = new EventEmitter<Date>();

    constructor() {
    }

    ngOnInit() {
    }

    onCellClicked(event) {
        this.cellClicked.emit(this.viewDate);
    }

    onEventClicked(event) {
        alert(event);
    }

}
