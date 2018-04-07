import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { TeachingSubjectClassAppService } from './teaching-subject-class-app.service';

@Component({
    selector: 'jhi-teaching-subject-class-app-detail',
    templateUrl: './teaching-subject-class-app-detail.component.html'
})
export class TeachingSubjectClassAppDetailComponent implements OnInit, OnDestroy {

    teachingSubject: TeachingSubjectClassApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teachingSubjectService: TeachingSubjectClassAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeachingSubjects();
    }

    load(id) {
        this.teachingSubjectService.find(id)
            .subscribe((teachingSubjectResponse: HttpResponse<TeachingSubjectClassApp>) => {
                this.teachingSubject = teachingSubjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeachingSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teachingSubjectListModification',
            (response) => this.load(this.teachingSubject.id)
        );
    }
}
