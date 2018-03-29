import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagClassApp } from './tag-class-app.model';
import { TagClassAppPopupService } from './tag-class-app-popup.service';
import { TagClassAppService } from './tag-class-app.service';

@Component({
    selector: 'jhi-tag-class-app-delete-dialog',
    templateUrl: './tag-class-app-delete-dialog.component.html'
})
export class TagClassAppDeleteDialogComponent {

    tag: TagClassApp;

    constructor(
        private tagService: TagClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagListModification',
                content: 'Deleted an tag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-class-app-delete-popup',
    template: ''
})
export class TagClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tagPopupService
                .open(TagClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
