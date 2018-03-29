import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { GradeClassAppService } from './grade-class-app.service';

@Component({
    selector: 'jhi-grade-class-app-detail',
    templateUrl: './grade-class-app-detail.component.html'
})
export class GradeClassAppDetailComponent implements OnInit, OnDestroy {

    grade: GradeClassApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gradeService: GradeClassAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGrades();
    }

    load(id) {
        this.gradeService.find(id).subscribe((grade) => {
            this.grade = grade;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGrades() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gradeListModification',
            (response) => this.load(this.grade.id)
        );
    }
}
