import { Component, Input, OnInit } from '@angular/core';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { Observable } from 'rxjs/Observable';
import { freeTeachingSubject, ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { ITeachingHour, TeachingHour } from 'app/shared/model/teaching-hour.model';
import { SubjectHourData } from 'app/shared/model/subject-hour.model';
import { CalendarSubjectEventStoreService } from 'app/store/calendar-subject-event/calendar-subject-event-store.service';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';
import { schoolClassPopupRoute } from 'app/entities/school-class';
import { ISchoolClass } from 'app/shared/model/school-class.model';

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
        private teachingHourService: TeachingHourService,
        private storeCalendarService: CalendarSubjectEventStoreService,
        private storeSchoolClass: StoreSchoolClassService
    ) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.store.getAll();
        if (this.subjectHourData.teachingSubject.id !== freeTeachingSubject.id) {
            this.submitted = true;
            this.teachingSubject = this.subjectHourData.teachingSubject;
        }
    }

    onSubmit() {
        this.storeCalendarService.getActiveSchoolClassId()
            .flatMap(id => this.storeSchoolClass.get(id))
            .map(schoolClass => this.mapTeachingSubjectToTeachingHour(schoolClass))
            .flatMap(teachingHour => this.teachingHourService.update(teachingHour))
            .subscribe(() => {
                this.submitted = true;
            });
    }

    private mapTeachingSubjectToTeachingHour(schoolClass: ISchoolClass): TeachingHour {
        schoolClass.teachingHours = null;
        schoolClass.teachingSubjects = null;
        this.subjectHourData.teachingHour.schoolClass = schoolClass;
        this.subjectHourData.teachingHour.teachingSubject = this.teachingSubject;
        return this.subjectHourData.teachingHour;
    }

    get teachingSubject() {
        return this._teachingSubject;
    }

    set teachingSubject(teachingSubject: ITeachingSubject) {
        this._teachingSubject = teachingSubject;
    }
}
