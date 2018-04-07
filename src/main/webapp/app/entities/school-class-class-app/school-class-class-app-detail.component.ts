import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolClassClassApp } from './school-class-class-app.model';
import { SchoolClassClassAppService } from './school-class-class-app.service';

@Component({
    selector: 'jhi-school-class-class-app-detail',
    templateUrl: './school-class-class-app-detail.component.html'
})
export class SchoolClassClassAppDetailComponent implements OnInit, OnDestroy {

    schoolClass: SchoolClassClassApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolClassService: SchoolClassClassAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchoolClasses();
    }

    load(id) {
        this.schoolClassService.find(id).subscribe((schoolClass) => {
            this.schoolClass = schoolClass;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchoolClasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'schoolClassListModification',
            (response) => this.load(this.schoolClass.id)
        );
    }
}
