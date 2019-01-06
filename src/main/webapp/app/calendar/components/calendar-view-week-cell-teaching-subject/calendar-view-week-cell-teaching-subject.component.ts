import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { freeTeachingSubject, ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Observable } from 'rxjs/Observable';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { TeachingHourService } from 'app/entities/teaching-hour';
import { ITeachingHour, StoreTeachingHour } from 'app/shared/model/teaching-hour.model';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { StoreSchoolClassService } from 'app/store/school-class/store-school-class.service';

@Component({
    selector: 'jhi-calendar-view-week-cell-teaching-subject',
    templateUrl: './calendar-view-week-cell-teaching-subject.component.html',
    styleUrls: ['./calendar-view-week-cell-teaching-subject.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewWeekCellTeachingSubjectComponent implements OnInit {

    @Input('teachingHourId') teachingHourId: number;
    _teachingSubject: ITeachingSubject = {name: null, id: null};
    teachingSubjects$: Observable<ITeachingSubject[]> = Observable.of([]);
    submitted = false;

    constructor(
        private storeTeachingSubjectService: StoreTeachingSubjectService,
        private storeTeachingHourService: StoreTeachingHourService,
        private storeSchoolClassService: StoreSchoolClassService,
        private teachingHourService: TeachingHourService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.storeTeachingSubjectService.getAll();
        this.storeTeachingHourService
            .get(this.teachingHourId)
            .map(th => th.teachingSubjectId)
            .filter(id => id !== freeTeachingSubject.id)
            .flatMap(id => this.storeTeachingSubjectService.get(id))
            .take(1)
            .subscribe(teachingSubject => {
                this.submitted = true;
                this.teachingSubject = teachingSubject;
            });
    }

    byId(item1: ITeachingSubject, item2: ITeachingSubject) {
        if (item2 == null || item1 == null) {
            return false;
        }
        return item1.id === item2.id;
    }

    onSubmit() {
        this.storeTeachingHourService
            .get(this.teachingHourId)
            .take(1)
            .map(teachingHour => <ITeachingHour>{...teachingHour, teachingSubject: this._teachingSubject} )
            .flatMap(teachingHour => this.createTeachingHour(teachingHour) )
            .flatMap(teachingHour => this.teachingHourService.update(teachingHour))
            .take(1)
            .subscribe(() => {
                this.submitted = true;
                this.cdr.markForCheck();
            });
    }

    private createTeachingHour(teachingHour: StoreTeachingHour): Observable<ITeachingHour> {
        return this.storeSchoolClassService
            .get(teachingHour.schoolClassId)
            .take(1)
            .map(schoolClass => <ISchoolClass>({...schoolClass, teachingHours: [], teachingSubjects: []}))
            .map(schoolClass => {
                const newTeachingHour = {
                    ...teachingHour,
                    teachingSubject: this._teachingSubject,
                    schoolClass,
                    tasks: []
                };
                delete newTeachingHour.schoolClassId;
                delete newTeachingHour.teachingSubjectId;
                return <ITeachingHour>newTeachingHour;
            });
    }

    get teachingSubject() {
        return this._teachingSubject;
    }

    set teachingSubject(teachingSubject: ITeachingSubject) {
        this._teachingSubject = teachingSubject;
    }
}
