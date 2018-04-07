import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { GradeClassAppService } from './grade-class-app.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-grade-class-app',
    templateUrl: './grade-class-app.component.html'
})
export class GradeClassAppComponent implements OnInit, OnDestroy {
grades: GradeClassApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gradeService: GradeClassAppService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gradeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.grades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGrades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GradeClassApp) {
        return item.id;
    }
    registerChangeInGrades() {
        this.eventSubscriber = this.eventManager.subscribe('gradeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
