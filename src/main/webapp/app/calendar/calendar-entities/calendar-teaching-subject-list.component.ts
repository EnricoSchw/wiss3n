import { Component, OnInit } from '@angular/core';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { Observable } from 'rxjs/Observable';
import { TeachingSubjectService } from 'app/entities/teaching-subject/teaching-subject.service';

@Component({
    selector: 'calendar-teaching-subject-list',
    templateUrl: './calendar-teaching-subject-list.component.html',
    styleUrls: ['./calendar-teaching-subject-list.component.scss']
})
export class CalendarTeachingSubjectListComponent implements OnInit {
    private schoolClassId$: Observable<number>;

    constructor(private storeService: CalendarSubjectEventStoreService,
                private TeachingSubjectService: TeachingSubjectService) {

    }

    ngOnInit() {
        this.schoolClassId$ = this.storeService.getActiveSchoolClassId();

    }

}
