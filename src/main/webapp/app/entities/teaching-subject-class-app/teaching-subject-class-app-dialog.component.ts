import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { TeachingSubjectClassAppPopupService } from './teaching-subject-class-app-popup.service';
import { TeachingSubjectClassAppService } from './teaching-subject-class-app.service';
import { User, UserService } from '../../shared';
import { TagClassApp, TagClassAppService } from '../tag-class-app';
import { SchoolClassClassApp, SchoolClassClassAppService } from '../school-class-class-app';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-teaching-subject-class-app-dialog',
    templateUrl: './teaching-subject-class-app-dialog.component.html'
})
export class TeachingSubjectClassAppDialogComponent implements OnInit {

    teachingSubject: TeachingSubjectClassApp;
    isSaving: boolean;

    users: User[];

    tags: TagClassApp[];

    schoolclasses: SchoolClassClassApp[];
    yearDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teachingSubjectService: TeachingSubjectClassAppService,
        private userService: UserService,
        private tagService: TagClassAppService,
        private schoolClassService: SchoolClassClassAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tagService.query()
            .subscribe((res: ResponseWrapper) => { this.tags = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.schoolClassService.query()
            .subscribe((res: ResponseWrapper) => { this.schoolclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teachingSubject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teachingSubjectService.update(this.teachingSubject));
        } else {
            this.subscribeToSaveResponse(
                this.teachingSubjectService.create(this.teachingSubject));
        }
    }

    private subscribeToSaveResponse(result: Observable<TeachingSubjectClassApp>) {
        result.subscribe((res: TeachingSubjectClassApp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TeachingSubjectClassApp) {
        this.eventManager.broadcast({ name: 'teachingSubjectListModification', content: 'OK'});
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

    trackTagById(index: number, item: TagClassApp) {
        return item.id;
    }

    trackSchoolClassById(index: number, item: SchoolClassClassApp) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-teaching-subject-class-app-popup',
    template: ''
})
export class TeachingSubjectClassAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teachingSubjectPopupService: TeachingSubjectClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teachingSubjectPopupService
                    .open(TeachingSubjectClassAppDialogComponent as Component, params['id']);
            } else {
                this.teachingSubjectPopupService
                    .open(TeachingSubjectClassAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
