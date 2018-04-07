import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TaskClassApp } from './task-class-app.model';
import { TaskClassAppService } from './task-class-app.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-task-class-app',
    templateUrl: './task-class-app.component.html'
})
export class TaskClassAppComponent implements OnInit, OnDestroy {
tasks: TaskClassApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taskService: TaskClassAppService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.taskService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tasks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TaskClassApp) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
