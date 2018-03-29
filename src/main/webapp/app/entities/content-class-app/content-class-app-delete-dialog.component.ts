import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContentClassApp } from './content-class-app.model';
import { ContentClassAppPopupService } from './content-class-app-popup.service';
import { ContentClassAppService } from './content-class-app.service';

@Component({
    selector: 'jhi-content-class-app-delete-dialog',
    templateUrl: './content-class-app-delete-dialog.component.html'
})
export class ContentClassAppDeleteDialogComponent {

    content: ContentClassApp;

    constructor(
        private contentService: ContentClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contentListModification',
                content: 'Deleted an content'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-content-class-app-delete-popup',
    template: ''
})
export class ContentClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentPopupService: ContentClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contentPopupService
                .open(ContentClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
