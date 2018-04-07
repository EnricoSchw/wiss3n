import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ContentClassApp } from './content-class-app.model';
import { ContentClassAppPopupService } from './content-class-app-popup.service';
import { ContentClassAppService } from './content-class-app.service';
import { User, UserService } from '../../shared';
import { TaskClassApp, TaskClassAppService } from '../task-class-app';
import { TagClassApp, TagClassAppService } from '../tag-class-app';

@Component({
    selector: 'jhi-content-class-app-dialog',
    templateUrl: './content-class-app-dialog.component.html'
})
export class ContentClassAppDialogComponent implements OnInit {

    content: ContentClassApp;
    isSaving: boolean;

    users: User[];

    tasks: TaskClassApp[];

    tags: TagClassApp[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private contentService: ContentClassAppService,
        private userService: UserService,
        private taskService: TaskClassAppService,
        private tagService: TagClassAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.taskService.query()
            .subscribe((res: HttpResponse<TaskClassApp[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tagService.query()
            .subscribe((res: HttpResponse<TagClassApp[]>) => { this.tags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.content.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contentService.update(this.content));
        } else {
            this.subscribeToSaveResponse(
                this.contentService.create(this.content));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ContentClassApp>>) {
        result.subscribe((res: HttpResponse<ContentClassApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContentClassApp) {
        this.eventManager.broadcast({ name: 'contentListModification', content: 'OK'});
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

    trackTaskById(index: number, item: TaskClassApp) {
        return item.id;
    }

    trackTagById(index: number, item: TagClassApp) {
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
    selector: 'jhi-content-class-app-popup',
    template: ''
})
export class ContentClassAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentPopupService: ContentClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contentPopupService
                    .open(ContentClassAppDialogComponent as Component, params['id']);
            } else {
                this.contentPopupService
                    .open(ContentClassAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
