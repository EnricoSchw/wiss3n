import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { Observable } from 'rxjs/Observable';
import { freeTeachingSubject, ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { ITeachingHour, TeachingHour } from 'app/shared/model/teaching-hour.model';
import { SubjectHourData } from 'app/shared/model/subject-hour.model';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { CalendarService } from 'app/calendar/providers/calendar.service';

@Component({
    selector: 'jhi-select-teaching-subject',
    templateUrl: './select-teaching-subject.component.html',
    styleUrls: ['./select-teaching-subject.component.scss']
})
export class SelectTeachingSubjectComponent implements OnInit {

    @Input('subjectHourData') subjectHourData: SubjectHourData;

    private _teachingSubject: ITeachingSubject = {name: null, id: null};

    teachingSubjects$: Observable<ITeachingSubject[]> = Observable.of([]);
    submitted = false;

    constructor(
        private store: StoreTeachingSubjectService,
        private calendarService: CalendarService
    ) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.store.getAll();
        if (this.subjectHourData.teachingSubject.id !== freeTeachingSubject.id) {
            this.submitted = true;
            this.teachingSubject = this.subjectHourData.teachingSubject;
        }
    }

    byId(item1: ITeachingSubject, item2: ITeachingSubject) {
        if (item2 == null || item1 == null) {
            return false;
        }
        return item1.id === item2.id;
    }

    onSubmit() {
        this.calendarService.setTeachingSubjectInTeachingHour(this.subjectHourData, this.teachingSubject)
            .subscribe((subjectHourData) => {
                this.submitted = true;
                this.subjectHourData = subjectHourData;
            });
    }

    get teachingSubject() {
        return this._teachingSubject;
    }

    set teachingSubject(teachingSubject: ITeachingSubject) {
        this._teachingSubject = teachingSubject;
    }
}
