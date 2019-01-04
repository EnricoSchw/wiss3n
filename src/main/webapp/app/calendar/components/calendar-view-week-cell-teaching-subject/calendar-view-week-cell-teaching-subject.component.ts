import { Component, Input, OnInit } from '@angular/core';
import { freeTeachingSubject, ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { Observable } from 'rxjs/Observable';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { StoreTeachingHourService } from 'app/store/teaching-hour/store-teaching-hour.service';
import { TeachingHourService } from 'app/entities/teaching-hour';
import { ITeachingHour } from 'app/shared/model/teaching-hour.model';

@Component({
    selector: 'jhi-calendar-view-week-cell-teaching-subject',
    templateUrl: './calendar-view-week-cell-teaching-subject.component.html',
    styleUrls: ['./calendar-view-week-cell-teaching-subject.component.scss']
})
export class CalendarViewWeekCellTeachingSubjectComponent implements OnInit {

    @Input('teachinhgHourId') teachingHourId: number;
    _teachingSubject: ITeachingSubject = {name: null, id: null};
    teachingSubjects$: Observable<ITeachingSubject[]> = Observable.of([]);
    submitted = false;

    constructor(
        private teachingSubjectService: StoreTeachingSubjectService,
        private storeTeachingHourService: StoreTeachingHourService,
        private teachingHourService: TeachingHourService
    ) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.teachingSubjectService.getAll();
        this.storeTeachingHourService
            .get(this.teachingHourId)
            .take(1)
            .map(th => th.teachingSubjectId)
            .filter(id => id !== freeTeachingSubject.id)
            .flatMap(id => this.teachingSubjectService.get(id))
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
            .map(teachingHour => <ITeachingHour>{...teachingHour, teachingSubject: this._teachingSubject} )
            .flatMap(teachingHour => this.teachingHourService.update(teachingHour))
            .take(1)
            .subscribe(() => {
                this.submitted = true;
            });
    }

    get teachingSubject() {
        return this._teachingSubject;
    }

    set teachingSubject(teachingSubject: ITeachingSubject) {
        this._teachingSubject = teachingSubject;
    }
}
