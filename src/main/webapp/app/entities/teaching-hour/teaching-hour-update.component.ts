import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeachingHour } from 'app/shared/model/teaching-hour.model';
import { TeachingHourService } from './teaching-hour.service';
import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingSubjectService } from 'app/entities/teaching-subject';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { SchoolClassService } from 'app/entities/school-class';

@Component({
    selector: 'jhi-teaching-hour-update',
    templateUrl: './teaching-hour-update.component.html'
})
export class TeachingHourUpdateComponent implements OnInit {
    private _teachingHour: ITeachingHour;
    isSaving: boolean;

    teachingsubjects: ITeachingSubject[];

    schoolclasses: ISchoolClass[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teachingHourService: TeachingHourService,
        private teachingSubjectService: TeachingSubjectService,
        private schoolClassService: SchoolClassService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teachingHour }) => {
            this.teachingHour = teachingHour;
        });
        this.teachingSubjectService.query().subscribe(
            (res: HttpResponse<ITeachingSubject[]>) => {
                this.teachingsubjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.schoolClassService.query().subscribe(
            (res: HttpResponse<ISchoolClass[]>) => {
                this.schoolclasses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teachingHour.id !== undefined) {
            this.subscribeToSaveResponse(this.teachingHourService.update(this.teachingHour));
        } else {
            this.subscribeToSaveResponse(this.teachingHourService.create(this.teachingHour));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeachingHour>>) {
        result.subscribe((res: HttpResponse<ITeachingHour>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeachingSubjectById(index: number, item: ITeachingSubject) {
        return item.id;
    }

    trackSchoolClassById(index: number, item: ISchoolClass) {
        return item.id;
    }
    get teachingHour() {
        return this._teachingHour;
    }

    set teachingHour(teachingHour: ITeachingHour) {
        this._teachingHour = teachingHour;
    }
}
