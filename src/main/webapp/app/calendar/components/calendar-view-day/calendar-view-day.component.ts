import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CalendarEvent, ViewPeriod } from 'calendar-utils';

@Component({
  selector: 'jhi-calendar-view-day',
  templateUrl: './calendar-view-day.component.html',
  styleUrls: ['./calendar-view-day.component.scss', './../../calendar.component.scss', './../../scss/media-queries.scss']
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

    public beforeDayViewRender({period}: { period: ViewPeriod }): void {
        // const events: SubjectEvent[] = <SubjectEvent[]> period.events;
        // if (events.length > 0) {
        //     if ((this.activeEvent === null || this.activeEvent === undefined)) {
        //         this.setActiveEvent(events[0]);
        //     }
        //     if (!isSameDay(this.activeEvent.start, this.viewDate)) {
        //         this.setActiveEvent(events[0]);
        //     }
        // }
    }
}
