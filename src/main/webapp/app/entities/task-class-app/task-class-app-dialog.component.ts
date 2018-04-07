import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TaskClassApp } from './task-class-app.model';
import { TaskClassAppPopupService } from './task-class-app-popup.service';
import { TaskClassAppService } from './task-class-app.service';
import { User, UserService } from '../../shared';
import { TeachingSubjectClassApp, TeachingSubjectClassAppService } from '../teaching-subject-class-app';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-task-class-app-dialog',
    templateUrl: './task-class-app-dialog.component.html'
})
export class TaskClassAppDialogComponent implements OnInit {

    task: TaskClassApp;
    isSaving: boolean;

    users: User[];

    teachingsubjects: TeachingSubjectClassApp[];
    startDp: any;
    endDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private taskService: TaskClassAppService,
        private userService: UserService,
        private teachingSubjectService: TeachingSubjectClassAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.teachingSubjectService.query()
            .subscribe((res: ResponseWrapper) => { this.teachingsubjects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<TaskClassApp>) {
        result.subscribe((res: TaskClassApp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TaskClassApp) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
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

    trackTeachingSubjectById(index: number, item: TeachingSubjectClassApp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-task-class-app-popup',
    template: ''
})
export class TaskClassAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskPopupService
                    .open(TaskClassAppDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService
                    .open(TaskClassAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
