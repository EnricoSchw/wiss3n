import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeachingSubject } from 'app/shared/model/teaching-subject.model';
import { TeachingSubjectService } from './teaching-subject.service';
import { IUser, Principal, UserService } from 'app/core';
import { ISchoolClass } from 'app/shared/model/school-class.model';
import { SchoolClassService } from 'app/entities/school-class';
import { StoreCalendarLessonDataService } from 'app/store/calendar-lesson-data/calendar-subject-event-store.service';

@Component({
    selector: 'jhi-teaching-subject-update',
    templateUrl: './teaching-subject-update.component.html'
})
export class TeachingSubjectUpdateComponent implements OnInit {
    private _teachingSubject: ITeachingSubject;
    isSaving: boolean;

    activeSchoolClassId$: Observable<number> = Observable.of(-1);

    user: IUser;

    schoolclasses: ISchoolClass[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teachingSubjectService: TeachingSubjectService,
        private userService: UserService,
        private schoolClassService: SchoolClassService,
        private calendarSubjectEventStoreService: StoreCalendarLessonDataService,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teachingSubject }) => {
            this.teachingSubject = teachingSubject;
        });
        this.principal.identity().then(account => {
            this.user = account;
        });
        // this.activeSchoolClassId$ = this.calendarSubjectEventStoreService.getActiveSchoolClassId().filter(id => id !== null);
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
        if (this.teachingSubject.id !== undefined) {
            this.subscribeToSaveResponse(this.teachingSubjectService.update(this.teachingSubject));
        } else {
            this.subscribeToSaveResponse(this.teachingSubjectService.create(this.teachingSubject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeachingSubject>>) {
        result.subscribe((res: HttpResponse<ITeachingSubject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackSchoolClassById(index: number, item: ISchoolClass) {
        return item.id;
    }
    get teachingSubject() {
        return this._teachingSubject;
    }

    set teachingSubject(teachingSubject: ITeachingSubject) {
        this._teachingSubject = teachingSubject;
    }
}
