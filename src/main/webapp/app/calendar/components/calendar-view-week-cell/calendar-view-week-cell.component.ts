import { Component, Input, OnInit } from '@angular/core';
import { CalendarLesson, LessonHour } from 'app/shared/model/calendar-lesson-data.model';
import { CalendarEvent } from 'angular-calendar';

@Component({
    selector: 'jhi-calendar-view-week-cell',
    templateUrl: './calendar-view-week-cell.component.html',
    styleUrls: ['./calendar-view-week-cell.component.scss']
})
export class CalendarViewWeekCellComponent implements OnInit {

    @Input() event: CalendarEvent<CalendarLesson>;

    lessonHour: LessonHour;

    constructor() {
    }

    ngOnInit() {
        this.lessonHour = this.event.meta.lessonHour;
    }

}
