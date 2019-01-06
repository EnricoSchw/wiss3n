import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarLesson, LessonHour } from 'app/shared/model/calendar-lesson-data.model';
import { CalendarEvent } from 'angular-calendar';

@Component({
    selector: 'jhi-calendar-view-week-cell',
    templateUrl: './calendar-view-week-cell.component.html',
    styleUrls: ['./calendar-view-week-cell.component.scss']
})
export class CalendarViewWeekCellComponent implements OnInit {

    @Input() event: CalendarEvent<CalendarLesson>;
    @Output() cellClicked = new EventEmitter<Date>();

    lessonHour: LessonHour;
    teachingHourId: number;

    constructor() {
    }

    ngOnInit() {
        this.lessonHour = this.event.meta.lessonHour;
        this.teachingHourId = this.event.meta.teachingHourId;
    }

    onCellClicked(event) {
        this.cellClicked.emit(null);
    }
}
