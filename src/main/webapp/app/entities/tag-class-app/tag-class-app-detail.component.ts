import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TagClassApp } from './tag-class-app.model';
import { TagClassAppService } from './tag-class-app.service';

@Component({
    selector: 'jhi-tag-class-app-detail',
    templateUrl: './tag-class-app-detail.component.html'
})
export class TagClassAppDetailComponent implements OnInit, OnDestroy {

    tag: TagClassApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tagService: TagClassAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTags();
    }

    load(id) {
        this.tagService.find(id)
            .subscribe((tagResponse: HttpResponse<TagClassApp>) => {
                this.tag = tagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tagListModification',
            (response) => this.load(this.tag.id)
        );
    }
}
