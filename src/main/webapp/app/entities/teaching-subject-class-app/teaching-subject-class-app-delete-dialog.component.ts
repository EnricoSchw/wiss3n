import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeachingSubjectClassApp } from './teaching-subject-class-app.model';
import { TeachingSubjectClassAppPopupService } from './teaching-subject-class-app-popup.service';
import { TeachingSubjectClassAppService } from './teaching-subject-class-app.service';

@Component({
    selector: 'jhi-teaching-subject-class-app-delete-dialog',
    templateUrl: './teaching-subject-class-app-delete-dialog.component.html'
})
export class TeachingSubjectClassAppDeleteDialogComponent {

    teachingSubject: TeachingSubjectClassApp;

    constructor(
        private teachingSubjectService: TeachingSubjectClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teachingSubjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teachingSubjectListModification',
                content: 'Deleted an teachingSubject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teaching-subject-class-app-delete-popup',
    template: ''
})
export class TeachingSubjectClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teachingSubjectPopupService: TeachingSubjectClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.teachingSubjectPopupService
                .open(TeachingSubjectClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
