import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { ContentService } from './content.service';
import { IUser, UserService } from 'app/core';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
    selector: 'jhi-content-update',
    templateUrl: './content-update.component.html'
})
export class ContentUpdateComponent implements OnInit {
    private _content: IContent;
    isSaving: boolean;

    users: IUser[];

    tasks: ITask[];
    dateDp: any;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private contentService: ContentService,
        private userService: UserService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ content }) => {
            this.content = content;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITask[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.content.id !== undefined) {
            this.subscribeToSaveResponse(this.contentService.update(this.content));
        } else {
            this.subscribeToSaveResponse(this.contentService.create(this.content));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContent>>) {
        result.subscribe((res: HttpResponse<IContent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTaskById(index: number, item: ITask) {
        return item.id;
    }
    get content() {
        return this._content;
    }

    set content(content: IContent) {
        this._content = content;
    }
}
