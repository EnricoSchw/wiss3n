import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ContentClassApp } from './content-class-app.model';
import { ContentClassAppService } from './content-class-app.service';

@Component({
    selector: 'jhi-content-class-app-detail',
    templateUrl: './content-class-app-detail.component.html'
})
export class ContentClassAppDetailComponent implements OnInit, OnDestroy {

    content: ContentClassApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private contentService: ContentClassAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContents();
    }

    load(id) {
        this.contentService.find(id).subscribe((content) => {
            this.content = content;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contentListModification',
            (response) => this.load(this.content.id)
        );
    }
}
