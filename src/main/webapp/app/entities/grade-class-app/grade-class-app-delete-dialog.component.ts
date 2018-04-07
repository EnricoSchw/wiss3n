import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GradeClassApp } from './grade-class-app.model';
import { GradeClassAppPopupService } from './grade-class-app-popup.service';
import { GradeClassAppService } from './grade-class-app.service';

@Component({
    selector: 'jhi-grade-class-app-delete-dialog',
    templateUrl: './grade-class-app-delete-dialog.component.html'
})
export class GradeClassAppDeleteDialogComponent {

    grade: GradeClassApp;

    constructor(
        private gradeService: GradeClassAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gradeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gradeListModification',
                content: 'Deleted an grade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grade-class-app-delete-popup',
    template: ''
})
export class GradeClassAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gradePopupService: GradeClassAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gradePopupService
                .open(GradeClassAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
