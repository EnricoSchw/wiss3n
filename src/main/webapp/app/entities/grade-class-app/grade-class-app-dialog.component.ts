import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { GradeClassAppPopupService } from './grade-class-app-popup.service';
import { GradeClassAppService } from './grade-class-app.service';
import { TaskClassApp, TaskClassAppService } from '../task-class-app';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-grade-class-app-dialog',
    templateUrl: './grade-class-app-dialog.component.html'
})
export class GradeClassAppDialogComponent implements OnInit {

    grade: GradeClassApp;
    isSaving: boolean;

    tasks: TaskClassApp[];

    users: User[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private gradeService: GradeClassAppService,
        private taskService: TaskClassAppService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.taskService
            .query({filter: 'grade-is-null'})
            .subscribe((res: HttpResponse<TaskClassApp[]>) => {
                if (!this.grade.taskId) {
                    this.tasks = res.body;
                } else {
                    this.taskService
                        .find(this.grade.taskId)
                        .subscribe((subRes: HttpResponse<TaskClassApp>) => {
                            this.tasks = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.grade.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gradeService.update(this.grade));
        } else {
            this.subscribeToSaveResponse(
                this.gradeService.create(this.grade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GradeClassApp>>) {
        result.subscribe((res: HttpResponse<GradeClassApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GradeClassApp) {
        this.eventManager.broadcast({ name: 'gradeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTaskById(index: number, item: TaskClassApp) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-grade-class-app-popup',
    template: ''
})
export class GradeClassAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gradePopupService: GradeClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gradePopupService
                    .open(GradeClassAppDialogComponent as Component, params['id']);
            } else {
                this.gradePopupService
                    .open(GradeClassAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
