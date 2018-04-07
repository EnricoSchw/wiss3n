import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolClassClassApp } from './school-class-class-app.model';
import { SchoolClassClassAppPopupService } from './school-class-class-app-popup.service';
import { SchoolClassClassAppService } from './school-class-class-app.service';

@Component({
    selector: 'jhi-school-class-class-app-delete-dialog',
    templateUrl: './school-class-class-app-delete-dialog.component.html'
})
export class SchoolClassClassAppDeleteDialogComponent {

    schoolClass: SchoolClassClassApp;

    constructor(
        private schoolClassService: SchoolClassClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolClassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'schoolClassListModification',
                content: 'Deleted an schoolClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-school-class-class-app-delete-popup',
    template: ''
})
export class SchoolClassClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolClassPopupService: SchoolClassClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schoolClassPopupService
                .open(SchoolClassClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
