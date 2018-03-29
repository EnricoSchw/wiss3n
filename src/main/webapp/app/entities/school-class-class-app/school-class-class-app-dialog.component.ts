import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolClassClassApp } from './school-class-class-app.model';
import { SchoolClassClassAppPopupService } from './school-class-class-app-popup.service';
import { SchoolClassClassAppService } from './school-class-class-app.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-school-class-class-app-dialog',
    templateUrl: './school-class-class-app-dialog.component.html'
})
export class SchoolClassClassAppDialogComponent implements OnInit {

    schoolClass: SchoolClassClassApp;
    isSaving: boolean;

    users: User[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private schoolClassService: SchoolClassClassAppService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.schoolClass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.schoolClassService.update(this.schoolClass));
        } else {
            this.subscribeToSaveResponse(
                this.schoolClassService.create(this.schoolClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<SchoolClassClassApp>) {
        result.subscribe((res: SchoolClassClassApp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SchoolClassClassApp) {
        this.eventManager.broadcast({ name: 'schoolClassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-school-class-class-app-popup',
    template: ''
})
export class SchoolClassClassAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolClassPopupService: SchoolClassClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schoolClassPopupService
                    .open(SchoolClassClassAppDialogComponent as Component, params['id']);
            } else {
                this.schoolClassPopupService
                    .open(SchoolClassClassAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
