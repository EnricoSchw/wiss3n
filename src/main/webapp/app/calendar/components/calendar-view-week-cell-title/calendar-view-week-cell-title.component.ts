import { Component, Input, OnInit } from '@angular/core';
import { CalendarLesson } from 'app/shared/model/calendar-lesson-data.model';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'jhi-calendar-view-week-cell-title',
    templateUrl: './calendar-view-week-cell-title.component.html',
    styleUrls: ['./calendar-view-week-cell-title.component.scss']
})
export class CalendarViewWeekCellTitleComponent implements OnInit {

    @Input() lesson: CalendarLesson;

    title: Observable<String>;
    number: number;

    constructor(
        private teachingHourService: StoreTeachingHourService,
        private teachingSubjectService: StoreTeachingSubjectService
    ) {
    }

    ngOnInit() {
        this.number = this.lesson.lessonHour.index;
        this.title = this.teachingHourService
            .get(this.lesson.teachingHourId)
            .map(teachinhHour => teachinhHour.teachingSubjectId)
            .flatMap(id => this.teachingSubjectService.get(id))
            .map(teachingSubject => teachingSubject.name );
    }

}
