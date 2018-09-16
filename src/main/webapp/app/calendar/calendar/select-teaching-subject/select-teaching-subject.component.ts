import { Component, Input, OnInit } from '@angular/core';
import { StoreTeachingSubjectService } from 'app/store/teaching-subject/store-teaching-subject.service';
import { Observable } from 'rxjs/Observable';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingHourService } from 'app/entities/teaching-hour/teaching-hour.service';
import { ITeachingHour, TeachingHour } from 'app/shared/model/teaching-hour.model';
import { SubjectHourData } from 'app/shared/model/subject-hour.model';

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

    constructor(private store: StoreTeachingSubjectService, private teachingHourService: TeachingHourService) {
    }

    ngOnInit() {
        this.teachingSubjects$ = this.store.getAll();
        if (this.subjectHourData.teachingSubject) {
            this.submitted = true;
            this.teachingSubject = this.subjectHourData.teachingSubject;
        }
    }

    onSubmit() {
        this.subjectHourData.teachingHour.teachingSubject = this.teachingSubject;
        this.teachingHourService.update(this.subjectHourData.teachingHour).subscribe(() => {
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
