import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-calendar-view-day',
  templateUrl: './calendar-view-day.component.html',
  styleUrls: ['./calendar-view-day.component.scss']
})
export class CalendarViewDayComponent implements OnInit {

    @Input() events;
    @Input() viewDate;

    constructor() {
    }

    ngOnInit() {
    }

    onLessondClicked(event) {
        alert('LessonClicked');
    }

}
