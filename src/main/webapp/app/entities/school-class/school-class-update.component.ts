import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISchoolClass } from 'app/shared/model/school-class.model';
import { SchoolClassService } from './school-class.service';
import { IUser, Principal, UserService } from 'app/core';

@Component({
    selector: 'jhi-school-class-update',
    templateUrl: './school-class-update.component.html'
})
export class SchoolClassUpdateComponent implements OnInit {
    private _schoolClass: ISchoolClass;
    isSaving: boolean;

    user: IUser;
    startDp: any;
    endDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private schoolClassService: SchoolClassService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schoolClass }) => {
            this.schoolClass = schoolClass;
        });
        this.principal.identity().then(account => {
            this.user = account;
        });

    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.schoolClass.user = this.user;
        if (this.schoolClass.id !== undefined) {
            this.subscribeToSaveResponse(this.schoolClassService.update(this.schoolClass));
        } else {
            this.subscribeToSaveResponse(this.schoolClassService.create(this.schoolClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISchoolClass>>) {
        result.subscribe((res: HttpResponse<ISchoolClass>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get schoolClass() {
        return this._schoolClass;
    }

    set schoolClass(schoolClass: ISchoolClass) {
        this._schoolClass = schoolClass;
    }
}
