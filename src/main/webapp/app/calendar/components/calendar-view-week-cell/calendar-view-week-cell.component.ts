import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarLesson, LessonHour } from 'app/shared/model/calendar-lesson-data.model';
import { CalendarEvent } from 'angular-calendar';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { CalendarViewDataService } from 'app/calendar/providers/calendar-view-data.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TeachingSubject } from 'app/shared/model/teaching-subject.model';

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
    free$: Observable<boolean>;

    constructor(private dataService: CalendarViewDataService) {
    }

    ngOnInit() {
        this.lessonHour = this.event.meta.lessonHour;
        this.teachingHourId = this.event.meta.teachingHourId;
        this.free$ = this.dataService.getTeachingSubjectByTeachingHour(this.teachingHourId).pipe(
            map((t: TeachingSubject) => t.id === -1)
        );
    }

    onCellClicked(event) {
        this.cellClicked.emit(null);
    }
}
